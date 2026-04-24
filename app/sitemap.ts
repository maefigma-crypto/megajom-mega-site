import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { allGames } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: Array<[string, number, MetadataRoute.Sitemap[number]['changeFrequency']]> = [
    ['/', 1.0, 'daily'],
    ['/rtp/', 0.9, 'hourly'],
    ['/rtp/jackpot/', 0.85, 'hourly'],
    ['/rtp/freespin/', 0.85, 'hourly'],
    ['/rtp/angpao/', 0.85, 'hourly'],
    ['/tips/', 0.8, 'weekly'],
    ['/download/ios/', 0.9, 'weekly'],
    ['/about/', 0.6, 'monthly'],
    ['/blog/', 0.7, 'weekly'],
  ];

  const gameRoutes = allGames().map((g) => [
    `/games/${g.id}/`,
    0.6,
    'weekly' as const,
  ] as const);

  return [...staticRoutes, ...gameRoutes].map(([path, priority, changeFrequency]) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
