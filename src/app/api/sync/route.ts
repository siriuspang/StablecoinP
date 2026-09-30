import { NextRequest, NextResponse } from 'next/server';
import { getAccumulatedNews } from '@/lib/newsAggregator';
import { getLiveMarketData } from '@/lib/marketAggregator';
import { getAccumulatedPapers } from '@/lib/reportsAggregator';
import { getAccumulatedVideos } from '@/lib/channelAggregator';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now();

    // Trigger parallel re-fetch
    const [news, market, reports, channel] = await Promise.all([
      getAccumulatedNews(true),
      getLiveMarketData(true),
      getAccumulatedPapers(true),
      getAccumulatedVideos(true),
    ]);

    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: '전체 스테이블코인 인텔리전스 데이터가 실시간으로 동기화 및 누적 갱신되었습니다.',
      stats: {
        totalNewsCount: news.length,
        totalCoinsCount: market.data.length,
        totalReportsCount: reports.length,
        totalVideosCount: channel.videos.length,
        marketLiveSynced: market.isLive,
        syncDurationMs: durationMs,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: '전체 데이터 실시간 동기화 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST(new NextRequest('http://localhost:3000/api/sync'));
}
