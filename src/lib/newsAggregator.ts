import fs from 'fs';
import path from 'path';
import { NewsArticle, NewsCategory } from '@/types';
import { initialNewsData } from '@/data/newsData';

const CACHE_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'accumulatedNews.json');

// In-memory cache
let inMemoryNews: NewsArticle[] | null = null;
let lastFetchTimestamp: number = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache for RSS re-fetch

interface RawRssItem {
  title: string;
  source: string;
  link: string;
  pubDate: string;
}

// Clean HTML tags and decode basic XML entities
function cleanText(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .trim();
}

// Fetch RSS feed from Google News for a given query
async function fetchGoogleNewsRss(query: string): Promise<RawRssItem[]> {
  try {
    const encoded = encodeURIComponent(query);
    const url = `https://news.google.com/rss/search?q=${encoded}&hl=ko&gl=KR&ceid=KR:ko`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return [];
    }

    const xml = await res.text();
    const items: RawRssItem[] = [];
    const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    for (const itemXml of itemMatches) {
      const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
      const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
      const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const sourceMatch = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/);

      let rawTitle = titleMatch ? cleanText(titleMatch[1]) : '';
      let source = sourceMatch ? cleanText(sourceMatch[1]) : '국내외 언론사';
      let link = linkMatch ? cleanText(linkMatch[1]) : '';
      let pubDate = pubDateMatch ? new Date(pubDateMatch[1]).toISOString() : new Date().toISOString();

      // Clean title ending with " - Source"
      if (source && rawTitle.endsWith(' - ' + source)) {
        rawTitle = rawTitle.substring(0, rawTitle.length - (' - ' + source).length).trim();
      }

      if (rawTitle && link) {
        items.push({
          title: rawTitle,
          source,
          link,
          pubDate,
        });
      }
    }

    return items;
  } catch (error) {
    console.error('Error fetching Google News RSS:', error);
    return [];
  }
}

// Map a raw RSS item to a structured NewsArticle
function convertRssToNewsArticle(item: RawRssItem, index: number): NewsArticle {
  const title = item.title;
  const isDomestic =
    item.source.includes('블록미디어') ||
    item.source.includes('디센터') ||
    item.source.includes('매일경제') ||
    item.source.includes('한국경제') ||
    item.source.includes('연합뉴스') ||
    item.source.includes('아시아경제') ||
    item.source.includes('전자신문') ||
    item.source.includes('조선비즈') ||
    item.source.includes('마켓인') ||
    item.source.includes('v.daum.net') ||
    item.source.includes('yna.co.kr') ||
    item.source.includes('kr.investing.com') ||
    item.source.includes('뉴시스') ||
    title.includes('한국') ||
    title.includes('원화') ||
    title.includes('금융위') ||
    title.includes('한은') ||
    title.includes('신한') ||
    title.includes('카카오');

  // Determine category
  let category: NewsCategory = 'domestic';
  if (
    title.includes('법안') ||
    title.includes('규제') ||
    title.includes('금융위') ||
    title.includes('한은') ||
    title.includes('입법') ||
    title.includes('제도') ||
    title.includes('가이드라인') ||
    title.includes('인허가')
  ) {
    category = 'regulatory';
  } else if (
    title.includes('테더') ||
    title.includes('써클') ||
    title.includes('Tether') ||
    title.includes('Circle') ||
    title.includes('Ethena') ||
    title.includes('발행사') ||
    title.includes('에테나')
  ) {
    category = 'issuer';
  } else if (!isDomestic || title.includes('미국') || title.includes('Fed') || title.includes('연준') || title.includes('EU') || title.includes('MiCA')) {
    category = 'global';
  }

  // Tags extraction
  const tags: string[] = ['실시간속보'];
  if (title.includes('원화')) tags.push('원화스테이블코인');
  if (title.includes('해외송금') || title.includes('송금')) tags.push('해외송금');
  if (title.includes('신한')) tags.push('신한은행');
  if (title.includes('카카오')) tags.push('카카오');
  if (title.includes('솔라나')) tags.push('솔라나');
  if (title.includes('씨티') || title.includes('Citi')) tags.push('씨티은행');
  if (title.includes('토큰증권') || title.includes('STO')) tags.push('토큰증권');
  if (title.includes('디지털금융')) tags.push('디지털금융');
  if (title.includes('연준') || title.includes('Fed') || title.includes('월러')) tags.push('연준');
  if (title.includes('결제')) tags.push('지급결제');
  if (tags.length === 1) tags.push('시장동향');

  // Related Coins
  const relatedCoins: string[] = [];
  if (title.includes('원화') || title.includes('KRW')) relatedCoins.push('KRW-Coin');
  if (title.includes('테더') || title.includes('USDT')) relatedCoins.push('USDT');
  if (title.includes('써클') || title.includes('USDC')) relatedCoins.push('USDC');
  if (title.includes('솔라나') || title.includes('SOL')) relatedCoins.push('SOL');
  if (title.includes('에테나') || title.includes('USDe')) relatedCoins.push('USDe');
  if (relatedCoins.length === 0) relatedCoins.push('USDT', 'USDC');

  // Impact level
  const impactLevel: 'high' | 'medium' | 'low' =
    title.includes('인가') ||
    title.includes('가이드라인') ||
    title.includes('입법') ||
    title.includes('해외송금') ||
    title.includes('추진') ||
    title.includes('실증')
      ? 'high'
      : 'medium';

  // Generate ID based on normalized URL or timestamp
  const simpleHash = Math.abs(
    item.link.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  ).toString(36);
  const id = `live-rss-${simpleHash}-${index}`;

  return {
    id,
    title,
    source: item.source,
    sourceType: isDomestic ? 'domestic' : 'global',
    category,
    publishedAt: item.pubDate,
    url: item.link,
    tags,
    relatedCoins,
    summaryPoints: [
      `[실시간 보도] ${item.source} 보도: ${title}`,
      `스테이블코인 결제 및 제도화 인프라 관련 실시간 시장 이벤트 반영`,
      `당일 속보 기사로서 국내외 스테이블코인 생태계와 금융당국 규제 정책에 연계`,
    ],
    impactLevel,
    impactAnalysis: {
      domesticMarket: `국내 금융기관 및 핀테크사의 스테이블코인 도입과 지급결제 인프라 확장에 긍정적/직접적 영향.`,
      regulatoryImplication: `가상자산 2단계 입법 및 외국환거래법, 전자금융거래법 개정 논의에 중요한 선례 제공.`,
      investorAction: `국내 원화 코인 발행 컨소시엄 및 글로벌 주요 결제 인프라 토큰 생태계 모니터링 필요.`,
    },
  };
}

// Load accumulated articles from disk or fallback to initial data
function loadAccumulatedFromDisk(): NewsArticle[] {
  try {
    if (fs.existsSync(CACHE_FILE_PATH)) {
      const content = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading accumulated news from disk:', error);
  }
  return [...initialNewsData];
}

// Save accumulated articles to disk
function saveAccumulatedToDisk(articles: NewsArticle[]) {
  try {
    const dir = path.dirname(CACHE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(articles, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving accumulated news to disk:', error);
  }
}

// Main function to get all accumulated news with automatic live sync
export async function getAccumulatedNews(forceRefresh = false): Promise<NewsArticle[]> {
  const now = Date.now();

  // If we already have in-memory cache and not forced and within TTL, return memory
  if (inMemoryNews && !forceRefresh && now - lastFetchTimestamp < CACHE_TTL_MS) {
    return inMemoryNews;
  }

  // 1. Load baseline / previous accumulated articles
  const currentArchive = inMemoryNews || loadAccumulatedFromDisk();

  // Ensure all initial curated articles from newsData.ts are preserved
  const articleMap = new Map<string, NewsArticle>();

  // First, add all initial curated articles (highest priority for rich data)
  for (const item of initialNewsData) {
    articleMap.set(item.title.trim().toLowerCase(), item);
    articleMap.set(item.url.trim(), item);
  }

  // Next, merge existing disk archive
  for (const item of currentArchive) {
    const titleKey = item.title.trim().toLowerCase();
    if (!articleMap.has(titleKey) && !articleMap.has(item.url.trim())) {
      articleMap.set(titleKey, item);
    }
  }

  // 2. Fetch live RSS from multiple targeted keyword feeds
  try {
    const [rssStable, rssWon, rssDigital] = await Promise.all([
      fetchGoogleNewsRss('스테이블코인'),
      fetchGoogleNewsRss('원화 스테이블코인'),
      fetchGoogleNewsRss('디지털금융 스테이블코인'),
    ]);

    const combinedRss = [...rssStable, ...rssWon, ...rssDigital];
    let newItemsAdded = 0;

    combinedRss.forEach((rawItem, idx) => {
      const cleanTitleKey = rawItem.title.trim().toLowerCase();
      const cleanUrl = rawItem.link.trim();

      // If neither title nor URL exists in map, add it as a new accumulated item
      if (!articleMap.has(cleanTitleKey) && !articleMap.has(cleanUrl)) {
        const article = convertRssToNewsArticle(rawItem, idx);
        articleMap.set(cleanTitleKey, article);
        newItemsAdded++;
      }
    });

    if (newItemsAdded > 0) {
      console.log(`[NewsAggregator] Added ${newItemsAdded} new live articles to accumulation.`);
    }
  } catch (err) {
    console.error('[NewsAggregator] Live RSS fetch error (fallback to archive):', err);
  }

  // Convert map to array and sort by published date descending (newest first)
  const combinedList = Array.from(new Set(articleMap.values())).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Update memory and save to disk
  inMemoryNews = combinedList;
  lastFetchTimestamp = now;
  saveAccumulatedToDisk(combinedList);

  return combinedList;
}
