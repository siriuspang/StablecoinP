import { NextRequest, NextResponse } from 'next/server';
import { getLiveMarketData } from '@/lib/marketAggregator';
import { CollateralType } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const symbol = searchParams.get('symbol');
    const collateral = searchParams.get('collateral') as CollateralType | null;
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';
    const forceRefresh = searchParams.get('refresh') === 'true' || searchParams.get('force') === 'true';

    // Fetch real-time live market data from DefiLlama
    const { data: liveData, summary, isLive } = await getLiveMarketData(forceRefresh);

    // Single coin lookup
    if (id || symbol) {
      const target = (id || symbol)!.toUpperCase();
      const coin = liveData.find(
        (c) => c.id.toUpperCase() === target || c.symbol.toUpperCase() === target
      );
      if (!coin) {
        return NextResponse.json(
          {
            success: false,
            error: `Stablecoin with identifier '${target}' was not found.`,
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: coin,
        isLive,
        timestamp: new Date().toISOString(),
      });
    }

    // Filter collection
    let results = [...liveData];

    if (collateral) {
      results = results.filter((coin) => coin.collateralType === collateral);
    }

    if (status) {
      results = results.filter((coin) => coin.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (coin) =>
          coin.name.toLowerCase().includes(q) ||
          coin.symbol.toLowerCase().includes(q) ||
          coin.issuer.toLowerCase().includes(q) ||
          coin.chainEcosystem.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Sort collection
    if (sortBy) {
      results.sort((a, b) => {
        let valA = 0;
        let valB = 0;

        switch (sortBy) {
          case 'marketCap':
            valA = a.marketCapUsd;
            valB = b.marketCapUsd;
            break;
          case 'volume':
            valA = a.volume24hUsd;
            valB = b.volume24hUsd;
            break;
          case 'price':
            valA = a.priceUsd;
            valB = b.priceUsd;
            break;
          case 'pegDeviation':
            valA = Math.abs(a.pegDeviationPercent);
            valB = Math.abs(b.pegDeviationPercent);
            break;
          case 'yield':
            valA = a.yieldRatePercent ?? 0;
            valB = b.yieldRatePercent ?? 0;
            break;
          default:
            return 0;
        }

        return sortOrder === 'asc' ? valA - valB : valB - valA;
      });
    }

    return NextResponse.json({
      success: true,
      summary,
      count: results.length,
      data: results,
      isLive,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process market data request.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
