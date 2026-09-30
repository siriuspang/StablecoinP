import { NextRequest, NextResponse } from 'next/server';
import { getAccumulatedPapers } from '@/lib/reportsAggregator';
import { PaperCategory, DifficultyLevel, SourceType } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const category = searchParams.get('category') as PaperCategory | null;
    const difficulty = searchParams.get('difficulty') as DifficultyLevel | null;
    const sourceType = searchParams.get('sourceType') as SourceType | null;
    const search = searchParams.get('search');
    const forceRefresh = searchParams.get('refresh') === 'true' || searchParams.get('force') === 'true';

    const allPapers = await getAccumulatedPapers(forceRefresh);

    if (id) {
      const paper = allPapers.find((p) => p.id === id);
      if (!paper) {
        return NextResponse.json(
          {
            success: false,
            error: `Research paper with ID '${id}' was not found.`,
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: paper,
        timestamp: new Date().toISOString(),
      });
    }

    let results = [...allPapers];

    if (category) {
      results = results.filter((p) => p.category === category);
    }

    if (difficulty) {
      results = results.filter((p) => p.difficulty === difficulty);
    }

    if (sourceType) {
      results = results.filter((p) => p.sourceType === sourceType);
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.titleKo.toLowerCase().includes(q) ||
          p.titleEn.toLowerCase().includes(q) ||
          p.authors.some((a) => a.toLowerCase().includes(q)) ||
          p.institutions.some((inst) => inst.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.executiveSummary.background.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      count: results.length,
      data: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process research reports request.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
