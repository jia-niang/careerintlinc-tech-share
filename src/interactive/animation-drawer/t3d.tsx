import { Button } from 'antd'
import { useEffect, useState } from 'react'

import drawerBodyCss from './drawer-body-css'
import drawerMaskCss from './drawer-mask-css'
import drawerWrapperCss from './drawer-wrapper-css'

interface INormalDrawerProps {
  open: boolean
  onClose(): void
}

export function T3dDrawer(props: INormalDrawerProps) {
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
        style={{
          right: 0,
          transform: `rotateY(${active ? 0 : 90}deg)`,
          transformOrigin: 'right',
        }}
      >
        我是 3D 翻折抽屉的内容，点击蒙层关闭抽屉
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
        点我打开 3D 翻折抽屉
      </Button>

      <T3dDrawer open={isOpen} onClose={() => void setIsOpen(false)} />
    </div>
  )
}
