import { css } from '@emotion/css'
import { Button } from 'antd'
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
  transition: all 300ms;
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
  transition: all 300ms;
`

interface INormalDrawerProps {
  open: boolean
  onClose(): void
}

/** 我是抽屉组件 */
export function NormalDrawer(props: INormalDrawerProps) {
  const { open, onClose } = props

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
        // 下面的样式是抽屉动画的核心 👇🏻
        style={{
          right: 0,
          transform: `translateX(${active ? 0 : 100}%)`,
        }}
      >
        我是抽屉的内容，点击蒙层关闭抽屉
      </div>
      <div
        onClick={onClose}
        onTransitionEnd={maskTransitionEndHandler}
        className={drawerMaskCss}
        style={{ opacity: active ? 0.8 : 0 }}
      ></div>
    </div>
  )
}

export default function () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => void setIsOpen(true)} type="primary">
        点我打开抽屉
      </Button>

      <NormalDrawer open={isOpen} onClose={() => void setIsOpen(false)} />
    </div>
  )
}
