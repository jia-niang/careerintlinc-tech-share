import { css } from '@emotion/css'
import { Button } from 'antd'
import { useState } from 'react'

const progressCss = css`
  margin: 30px;
  margin-left: 100px;
  margin-right: 0;
  height: 30px;
  position: relative;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  & > div {
    height: 30px;
    background: #5ea6ff;
  }

  & > span {
    position: absolute;
    left: -100px;
    line-height: 30px;
  }
`

export default function () {
  const [isFull, setIsFull] = useState(false)

  const playHandler = () => {
    setIsFull(!isFull)
  }

  return (
    <div>
      <div className={progressCss}>
        <span>默认：</span>
        <div style={{ transition: `all 1000ms`, width: isFull ? '100%' : '0%' }}></div>
      </div>

      <div className={progressCss}>
        <span>step-start：</span>
        <div style={{ transition: `all 1000ms step-start`, width: isFull ? '100%' : '0%' }}></div>
      </div>

      <div className={progressCss}>
        <span>step-end：</span>
        <div style={{ transition: `all 1000ms step-end`, width: isFull ? '100%' : '0%' }}></div>
      </div>

      <div>
        <Button onClick={playHandler} type="primary">
          播放
        </Button>
      </div>
    </div>
  )
}
