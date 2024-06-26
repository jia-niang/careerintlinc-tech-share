import { defineConfig } from 'dumi'
// @ts-ignore
import S3Plugin from 'webpack-s3-plugin'

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
      memo.plugin('S3Plugin').use(S3Plugin, [
        {
          exclude: /.*\.html$/,
          basePath: 'careerintlinc-tech-share',
          s3Options: {
            accessKeyId: process.env.COS_SECRET_ID,
            secretAccessKey: process.env.COS_SECRET_KEY,
            region: 'ap-hongkong',
            endpoint: 'https://cos.ap-hongkong.myqcloud.com',
            apiVersion: '2006-03-01',
          },
          s3UploadOptions: {
            Bucket: 'paperplane-cdn-1253277322',
          },
        },
      ])
    }
  },
})
