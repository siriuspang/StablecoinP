import { StablecoinMarketData } from '@/types';
import { initialStablecoinData, getMarketSummary } from '@/data/marketData';

interface DefiLlamaPeggedAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  pegType: string;
  circulating?: {
    peggedUSD?: number;
  };
}

let inMemoryMarketData: StablecoinMarketData[] = [...initialStablecoinData];
let lastMarketFetchTime = 0;
const MARKET_CACHE_TTL = 30 * 1000; // 30 seconds

export async function getLiveMarketData(forceRefresh = false): Promise<{
  data: StablecoinMarketData[];
  summary: ReturnType<typeof getMarketSummary>;
  isLive: boolean;
}> {
  const now = Date.now();

  if (!forceRefresh && inMemoryMarketData && now - lastMarketFetchTime < MARKET_CACHE_TTL) {
    return {
      data: inMemoryMarketData,
      summary: getMarketSummary(),
      isLive: true,
    };
  }

  try {
    const res = await fetch('https://stablecoins.llama.fi/stablecoins?includePrices=true', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();
      const peggedAssets: DefiLlamaPeggedAsset[] = json.peggedAssets || [];

      // Create a symbol map
      const priceMap = new Map<string, { price: number; mcap?: number }>();
      peggedAssets.forEach((asset) => {
        if (asset.symbol && typeof asset.price === 'number') {
          priceMap.set(asset.symbol.toUpperCase(), {
            price: asset.price,
            mcap: asset.circulating?.peggedUSD,
          });
        }
      });

      // Merge with initial rich metadata
      const updatedData: StablecoinMarketData[] = initialStablecoinData.map((coin) => {
        const liveInfo = priceMap.get(coin.symbol.toUpperCase());
        if (!liveInfo || liveInfo.price === undefined || liveInfo.price === null) {
          return coin;
        }

        const livePrice = Number(liveInfo.price.toFixed(4));
        const deviation = Number((((livePrice - coin.pegTarget) / coin.pegTarget) * 100).toFixed(2));
        const absDev = Math.abs(deviation);

        let status: 'normal' | 'caution' | 'alert' | 'critical' = 'normal';
        if (absDev >= 5.0) {
          status = 'critical';
        } else if (absDev >= 1.5) {
          status = 'alert';
        } else if (absDev >= 0.3) {
          status = 'caution';
        }

        const liveMcap = liveInfo.mcap ? Math.round(liveInfo.mcap) : coin.marketCapUsd;

        return {
          ...coin,
          priceUsd: livePrice,
          pegDeviationPercent: deviation,
          status,
          marketCapUsd: liveMcap,
        };
      });

      inMemoryMarketData = updatedData;
      lastMarketFetchTime = now;

      return {
        data: updatedData,
        summary: getMarketSummary(),
        isLive: true,
      };
    }
  } catch (error) {
    console.error('[MarketAggregator] Failed to fetch live DefiLlama market data:', error);
  }

  return {
    data: inMemoryMarketData || initialStablecoinData,
    summary: getMarketSummary(),
    isLive: false,
  };
}
