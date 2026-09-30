import { NextRequest, NextResponse } from 'next/server';
import { getAccumulatedNews } from '@/lib/newsAggregator';
import { NewsCategory } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const category = searchParams.get('category') as NewsCategory | null;
    const sourceType = searchParams.get('sourceType') as 'domestic' | 'global' | null;
    const coin = searchParams.get('coin');
    const impactLevel = searchParams.get('impactLevel') as 'high' | 'medium' | 'low' | null;
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const forceRefresh = searchParams.get('refresh') === 'true' || searchParams.get('force') === 'true';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, parseInt(searchParams.get('limit') || '50', 10));

    // Fetch accumulated news (with live RSS sync)
    const allNews = await getAccumulatedNews(forceRefresh);

    // Single article lookup
    if (id) {
      const article = allNews.find((item) => item.id === id);
      if (!article) {
        return NextResponse.json(
          {
            success: false,
            error: `News article with ID '${id}' was not found.`,
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: article,
        timestamp: new Date().toISOString(),
      });
    }

    // Filter collection
    let results = [...allNews];

    if (category && category !== 'all') {
      results = results.filter((item) => item.category === category);
    }

    if (sourceType) {
      results = results.filter((item) => item.sourceType === sourceType);
    }

    if (coin) {
      const upperCoin = coin.toUpperCase();
      results = results.filter((item) =>
        item.relatedCoins.some((c) => c.toUpperCase() === upperCoin)
      );
    }

    if (impactLevel) {
      results = results.filter((item) => item.impactLevel === impactLevel);
    }

    if (tag) {
      const lowerTag = tag.toLowerCase();
      results = results.filter((item) =>
        item.tags.some((t) => t.toLowerCase() === lowerTag)
      );
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.source.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          item.summaryPoints.some((p) => p.toLowerCase().includes(q)) ||
          item.impactAnalysis.domesticMarket.toLowerCase().includes(q) ||
          item.impactAnalysis.regulatoryImplication.toLowerCase().includes(q) ||
          item.impactAnalysis.investorAction.toLowerCase().includes(q)
      );
    }

    // Pagination
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedData = results.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      totalPages,
      count: paginatedData.length,
      data: paginatedData,
      isLiveSynced: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process news data request.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
