import { defineConfig } from 'dumi'

export default defineConfig({
  themeConfig: {
    name: '',
    logo: '/logo.svg',
    favicons: ['/favicon.ico'],
    footer: false,
  },

  links: [
    { href: 'https://cdn.paperplane.cc', rel: 'dns-prefetch' },
    { href: 'https://cdn.paperplane.cc', rel: 'preconnect' },
  ],

  chainWebpack(memo: any) {
    if (process.env.NODE_ENV === 'production') {
      memo.output.publicPath('https://cdn.paperplane.cc/careerintlinc-tech-share/')
    }
  },
})
