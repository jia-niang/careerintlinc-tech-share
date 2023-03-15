import { css } from '@emotion/css'
import { Button } from 'antd'
import { useState } from 'react'

import './font-optional.css'

const fzzy4Css = css`
  font-family: fzzy4;
`

export default function () {
  const [font, setFont] = useState<string>()

  return (
    <div>
      <div style={{ fontFamily: font, fontSize: '50px' }}>我是动态改字体的文字</div>
      <div className={fzzy4Css} style={{ fontSize: '50px', color: 'turquoise' }}>
        我固定是方正准圆字体
      </div>

      <Button
        onClick={() => void setFont(f => (f ? undefined : 'fzzy4'))}
        style={{ margin: '20px 0' }}
        type="primary"
      >
        点我更换字体
      </Button>
    </div>
  )
}
