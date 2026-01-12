import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Si tu as des pages privées plus tard
    },
    sitemap: 'https://www.verso-agency.fr/sitemap.xml',
  }
}