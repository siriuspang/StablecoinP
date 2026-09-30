import fs from 'fs';
import path from 'path';
import { ResearchPaper } from '@/types';
import { initialPapersData } from '@/data/papersData';

const CACHE_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'accumulatedPapers.json');

let inMemoryPapers: ResearchPaper[] | null = null;

function loadAccumulatedPapersFromDisk(): ResearchPaper[] {
  try {
    if (fs.existsSync(CACHE_FILE_PATH)) {
      const content = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading accumulated papers from disk:', error);
  }
  return [...initialPapersData];
}

function saveAccumulatedPapersToDisk(papers: ResearchPaper[]) {
  try {
    const dir = path.dirname(CACHE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(papers, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving accumulated papers to disk:', error);
  }
}

export async function getAccumulatedPapers(forceRefresh = false): Promise<ResearchPaper[]> {
  if (inMemoryPapers && !forceRefresh) {
    return inMemoryPapers;
  }

  const diskArchive = inMemoryPapers || loadAccumulatedPapersFromDisk();
  const paperMap = new Map<string, ResearchPaper>();

  // Ensure all baseline curated papers with 6-step study modules are present
  for (const paper of initialPapersData) {
    paperMap.set(paper.id, paper);
  }

  // Merge any accumulated research items
  for (const paper of diskArchive) {
    if (!paperMap.has(paper.id)) {
      paperMap.set(paper.id, paper);
    }
  }

  const combined = Array.from(paperMap.values()).sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  inMemoryPapers = combined;
  saveAccumulatedPapersToDisk(combined);

  return combined;
}
