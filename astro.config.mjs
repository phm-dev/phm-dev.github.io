// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://phm-dev.github.io',
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
  integrations: [
    starlight({
      title: 'PHM',
      logo: {
        src: './public/logo.png',
      },
      favicon: '/icon-light-32x32.png',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        pl: { label: 'Polski', lang: 'pl' },
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/phm-dev/phm' },
      ],
      sidebar: [
        { slug: 'overview' },
        { slug: 'what-is-phm' },
        {
          label: 'Getting Started',
          translations: { pl: 'Pierwsze kroki' },
          items: [
            { slug: 'installation' },
            { slug: 'shell-setup' },
            { slug: 'tools' },
          ],
        },
        {
          label: 'Usage',
          translations: { pl: 'Użytkowanie' },
          items: [
            { slug: 'version-switching' },
            { slug: 'configuration' },
            { slug: 'web-servers' },
          ],
        },
        {
          label: 'Reference',
          translations: { pl: 'Referencja' },
          items: [
            { slug: 'packages' },
            { slug: 'how-packages-are-built' },
            { slug: 'phm-vs-alternatives' },
            { slug: 'why-not-docker' },
            { slug: 'faq' },
          ],
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      head: [
        // Open Graph image
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://phm-dev.github.io/og-image.png' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:width', content: '1200' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:height', content: '630' },
        },
        // Twitter Card image
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: 'https://phm-dev.github.io/og-image.png' },
        },
        // Author
        {
          tag: 'meta',
          attrs: { name: 'author', content: 'Mateusz Flasiński' },
        },
        // Analytics
        {
          tag: 'script',
          attrs: { async: true, src: 'https://scripts.simpleanalyticscdn.com/latest.js' },
        },
      ],
    }),
  ],
});
