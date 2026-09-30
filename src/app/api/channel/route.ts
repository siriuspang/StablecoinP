import { NextRequest, NextResponse } from 'next/server';
import { getAccumulatedVideos } from '@/lib/channelAggregator';
import { ChannelCategoryType } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const category = searchParams.get('category') as ChannelCategoryType | null;
    const search = searchParams.get('search');
    const forceRefresh = searchParams.get('refresh') === 'true' || searchParams.get('force') === 'true';

    const { videos, channels } = await getAccumulatedVideos(forceRefresh);

    if (id) {
      const video = videos.find((v) => v.id === id);
      if (!video) {
        return NextResponse.json(
          {
            success: false,
            error: `Video with ID '${id}' was not found.`,
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: video,
        timestamp: new Date().toISOString(),
      });
    }

    let results = [...videos];

    if (category && category !== 'all') {
      results = results.filter((v) => v.channelCategory === category);
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.channelName.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q)) ||
          v.summaryPoints.some((p) => p.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      count: results.length,
      data: results,
      channels,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process channel videos request.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
