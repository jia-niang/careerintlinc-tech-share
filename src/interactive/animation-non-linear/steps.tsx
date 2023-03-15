import { css } from '@emotion/css'
import { Button } from 'antd'
import { useState } from 'react'

const progressCss = css`
  margin: 10px;
  margin-left: 0;
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
    left: -120px;
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
      <span>线性：</span>
      <div className={progressCss}>
        <div style={{ transition: `all 1000ms linear`, width: isFull ? '100%' : '0%' }}></div>
      </div>

      <span>steps(4, jump-start)：</span>
      <div className={progressCss}>
        <div
          style={{ transition: `all 1000ms steps(4, jump-start)`, width: isFull ? '100%' : '0%' }}
        ></div>
      </div>

      <span>steps(4, jump-end)：</span>
      <div className={progressCss}>
        <div
          style={{ transition: `all 1000ms steps(4, jump-end)`, width: isFull ? '100%' : '0%' }}
        ></div>
      </div>

      <span>steps(4, jump-both)：</span>
      <div className={progressCss}>
        <div
          style={{ transition: `all 1000ms steps(4, jump-both)`, width: isFull ? '100%' : '0%' }}
        ></div>
      </div>

      <span>steps(4, jump-none)：</span>
      <div className={progressCss}>
        <div
          style={{ transition: `all 1000ms steps(4, jump-none)`, width: isFull ? '100%' : '0%' }}
        ></div>
      </div>

      <div>
        <Button onClick={playHandler} type="primary">
          播放
        </Button>
      </div>
    </div>
  )
}
