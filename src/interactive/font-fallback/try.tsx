import { Button } from 'antd'
import { useState } from 'react'

import './font-normal.css'

export default function () {
  const [font, setFont] = useState<string>()

  return (
    <div>
      <div style={{ fontFamily: font, fontSize: '50px' }}>我是一段文字</div>

      <Button
        onClick={() => void setFont(f => (f ? undefined : 'fzzy'))}
        style={{ margin: '20px 0' }}
        type="primary"
      >
        点我更换字体
      </Button>
    </div>
  )
}
