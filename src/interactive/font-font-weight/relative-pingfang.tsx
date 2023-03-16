import { css } from '@emotion/css'
import { Space } from 'antd'

import './pingfang.css'

const titleCss = css`
  font-size: 18px;
  display: inline-block;
  font-weight: 400;
  width: 200px;
`

export default function () {
  return (
    <div>
      <div style={{ margin: '0 0 30px' }}>苹方字体，默认 400 字重：</div>
      <Space
        style={{ fontSize: '26px', fontFamily: 'pingfang', fontWeight: 400 }}
        direction="vertical"
      >
        <div>
          <span className={titleCss}>font-weight 默认</span>
          <span style={{}}>我是字体</span>
        </div>

        <div>
          <span className={titleCss}>font-weight: lighter</span>
          <span style={{ fontWeight: 'lighter' }}>我是字体</span>
        </div>

        <div>
          <span className={titleCss}>font-weight: bolder</span>
          <span style={{ fontWeight: 'bolder' }}>我是字体</span>
        </div>
      </Space>

      <div style={{ margin: '30px 0 30px' }}>苹方字体，默认 300 字重：</div>
      <Space
        style={{ fontSize: '26px', fontFamily: 'pingfang', fontWeight: 300 }}
        direction="vertical"
      >
        <div>
          <span className={titleCss}>font-weight 默认</span>
          <span style={{}}>我是字体</span>
        </div>

        <div>
          <span className={titleCss}>font-weight: lighter</span>
          <span style={{ fontWeight: 'lighter' }}>我是字体</span>
        </div>

        <div>
          <span className={titleCss}>font-weight: bolder</span>
          <span style={{ fontWeight: 'bolder' }}>我是字体</span>
        </div>
      </Space>

      <div style={{ margin: '30px 0 30px' }}>苹方字体，默认 500 字重：</div>
      <Space
        style={{ fontSize: '26px', fontFamily: 'pingfang', fontWeight: 500 }}
        direction="vertical"
      >
        <div>
          <span className={titleCss}>font-weight 默认</span>
          <span style={{}}>我是字体</span>
        </div>

        <div>
          <span className={titleCss}>font-weight: lighter</span>
          <span style={{ fontWeight: 'lighter' }}>我是字体</span>
        </div>

        <div>
          <span className={titleCss}>font-weight: bolder</span>
          <span style={{ fontWeight: 'bolder' }}>我是字体</span>
        </div>
      </Space>
    </div>
  )
}
