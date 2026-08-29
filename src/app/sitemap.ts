import type { MetadataRoute } from 'next'
import { getArticles } from '@/lib/dal'

const BASE_URL = 'https://gemarawana.or.id'

const staticPages: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/artikel`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const articles = await getArticles()

    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${BASE_URL}/artikel/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

    return [...staticPages, ...articlePages]
  } catch {
    // If the fetch fails (e.g. DB unavailable at build time), fall back to static pages only
    return staticPages
  }
}
