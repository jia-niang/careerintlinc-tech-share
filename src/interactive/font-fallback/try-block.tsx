import { Button } from 'antd'
import { useState } from 'react'

import './font-block.css'
import './iconfont-block.css'

export default function () {
  const [font, setFont] = useState(false)

  return (
    <div>
      <div style={{ fontFamily: font ? 'fzzy2' : undefined, fontSize: '50px' }}>
        我是文字，这是图标：
        <i
          style={{
            fontFamily: font ? 'iconfont2' : undefined,
            fontSize: '50px',
            fontStyle: 'normal',
          }}
        >
          &#xe604;
        </i>
      </div>

      <Button onClick={() => void setFont(f => !f)} style={{ margin: '20px 0' }} type="primary">
        点我更换字体
      </Button>
    </div>
  )
}
