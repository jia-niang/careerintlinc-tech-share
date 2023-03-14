import { css } from '@emotion/css'
import { Button } from 'antd'
import { useEffect, useState } from 'react'

import drawerMaskCss from './drawer-mask-css'
import drawerWrapperCss from './drawer-wrapper-css'

const drawerBodyCss = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 30px;
  box-sizing: border-box;
  z-index: 9999;
  transition: all 300ms;
`

interface INormalDrawerProps {
  open: boolean
  onClose(): void
}

export function ScrollDrawer(props: INormalDrawerProps) {
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
        className={css`
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          transition: all 300ms;
          overflow: hidden;
          height: ${active ? 300 : 0}px;
        `}
      >
        <div className={drawerBodyCss} style={{ height: 300 }}>
          <p>我是卷轴式抽屉的内容，点击蒙层关闭抽屉</p>
          <p>我是卷轴式抽屉的内容，点击蒙层关闭抽屉</p>
          <p>我是卷轴式抽屉的内容，点击蒙层关闭抽屉</p>
          <p>我是卷轴式抽屉的内容，点击蒙层关闭抽屉</p>
          <p>我是卷轴式抽屉的内容，点击蒙层关闭抽屉</p>
        </div>
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
        点我展开卷轴式抽屉
      </Button>

      <ScrollDrawer open={isOpen} onClose={() => void setIsOpen(false)} />
    </div>
  )
}
