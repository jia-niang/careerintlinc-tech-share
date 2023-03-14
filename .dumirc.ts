import { defineConfig } from 'dumi'

export default defineConfig({
  themeConfig: {
    name: 'Career FE',
    logo: '/icons8-starburst-shape-100.png',
    favicons: ['/favicon.ico'],
    extraBabelPlugins: [
      [
        'emotion',
        {
          autoLabel: true,
          labelFormat: '[local]',
        },
      ],
    ],
    footer: false,
  },
})
