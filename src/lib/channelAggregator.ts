import fs from 'fs';
import path from 'path';
import { ChannelVideo } from '@/types';
import { initialChannelVideos, FEATURED_CHANNELS, ChannelProfile } from '@/data/channelData';

const CACHE_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'accumulatedVideos.json');

let inMemoryVideos: ChannelVideo[] | null = null;

function loadAccumulatedVideosFromDisk(): ChannelVideo[] {
  try {
    if (fs.existsSync(CACHE_FILE_PATH)) {
      const content = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading accumulated videos from disk:', error);
  }
  return [...initialChannelVideos];
}

function saveAccumulatedVideosToDisk(videos: ChannelVideo[]) {
  try {
    const dir = path.dirname(CACHE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(videos, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving accumulated videos to disk:', error);
  }
}

export async function getAccumulatedVideos(forceRefresh = false): Promise<{
  videos: ChannelVideo[];
  channels: ChannelProfile[];
}> {
  if (inMemoryVideos && !forceRefresh) {
    return {
      videos: inMemoryVideos,
      channels: FEATURED_CHANNELS,
    };
  }

  const diskArchive = inMemoryVideos || loadAccumulatedVideosFromDisk();
  const videoMap = new Map<string, ChannelVideo>();

  // Ensure baseline curated videos are preserved
  for (const video of initialChannelVideos) {
    videoMap.set(video.id, video);
  }

  // Merge accumulated videos
  for (const video of diskArchive) {
    if (!videoMap.has(video.id)) {
      videoMap.set(video.id, video);
    }
  }

  const combined = Array.from(videoMap.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  inMemoryVideos = combined;
  saveAccumulatedVideosToDisk(combined);

  return {
    videos: combined,
    channels: FEATURED_CHANNELS,
  };
}
