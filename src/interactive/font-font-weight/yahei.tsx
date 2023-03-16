import { Space } from 'antd'

import './yahei.css'

export default function () {
  return (
    <div>
      <div style={{ marginBottom: 30 }}>以下是微软雅黑字体：</div>
      <Space
        style={{ fontFamily: 'yahei', fontSize: '30px' }}
        direction="vertical"
        size="middle"
        wrap
      >
        <div style={{ fontWeight: 100 }}>我是 100 字体</div>
        <div style={{ fontWeight: 200 }}>我是 200 字体</div>
        <div style={{ fontWeight: 300 }}>我是 300 字体</div>
        <div style={{ fontWeight: 400 }}>我是 400 字体</div>
        <div style={{ fontWeight: 500 }}>我是 500 字体</div>
        <div style={{ fontWeight: 600 }}>我是 600 字体</div>
        <div style={{ fontWeight: 700 }}>我是 700 字体</div>
      </Space>
    </div>
  )
}
