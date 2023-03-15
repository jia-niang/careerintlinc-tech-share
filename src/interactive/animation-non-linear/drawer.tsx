import { css } from '@emotion/css'
import { useEffect, useState } from 'react'

const drawerWrapperCss = css`
  z-index: 9999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const drawerMaskCss = css`
  background: #000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9998;
`

const drawerBodyCss = css`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 400px;
  max-width: 60vw;
  background: #fff;
  padding: 30px;
  z-index: 9999;
`

interface INormalDrawerProps {
  open: boolean
  onClose(): void
  transitionTiming?: string
  duration?: number
}

export default function Drawer(props: INormalDrawerProps) {
  const { open, onClose, transitionTiming = '', duration = 700 } = props

  const [alive, setAlive] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (open) {
      setAlive(true)
      setTimeout(() => void setActive(true), 20)
    } else {
      setActive(false)
    }
  }, [open])

  const maskTransitionEndHandler = () => {
    if (!open) {
      setAlive(false)
    }
  }

  if (!alive) {
    return null
  }

  return (
    <div className={drawerWrapperCss}>
      <div
        className={drawerBodyCss}
        style={{
          right: 0,
          transition: `all ${duration}ms ${transitionTiming}`,
          transform: `translateX(${active ? 0 : 100}%)`,
        }}
      >
        我是抽屉的内容，点击蒙层关闭抽屉
      </div>
      <div
        onClick={onClose}
        onTransitionEnd={maskTransitionEndHandler}
        className={drawerMaskCss}
        style={{ transition: `all ${duration}ms`, opacity: active ? 0.8 : 0 }}
      ></div>
    </div>
  )
}
