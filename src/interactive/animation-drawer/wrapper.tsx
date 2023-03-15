import { Button } from 'antd'
import cls from 'classnames'
import { CSSProperties, ReactElement, useEffect, useState } from 'react'

import drawerMaskCss from './drawer-mask-css'
import drawerWrapperCss from './drawer-wrapper-css'

export interface IDrawerWrapperProps {
  open?: boolean
  onClose?(): void

  style?: CSSProperties
  className?: string
  children?: ReactElement
}

/** 我就是 “抽屉包裹器” 组件 */
export function DrawerWrapper(props: IDrawerWrapperProps) {
  const { open, onClose, style, className, children } = props

  const [alive, setAlive] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (open) {
      setAlive(true)
      setTimeout(() => void setActive(true), 10)
    } else {
      setActive(false)
    }
  }, [open])

  const maskTransitionEndHandler = () => {
    if (!open) {
      setAlive(false)
    }
  }

  if (!children || !alive) {
    return null
  }

  return (
    <div className={cls(className, drawerWrapperCss)} style={style}>
      <div
        style={{
          position: 'absolute',
          display: 'inline',
          top: 0,
          bottom: 0,
          right: 0,
          transition: `all 300ms`,
          zIndex: 9999,
          background: '#fff',
          transform: `translateX(${active ? 0 : 100}%)`,
        }}
      >
        {children}
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

/** 我是自定义的抽屉 */
function CustomDrawer() {
  return (
    <div style={{ width: 500, maxWidth: '70vw', padding: 30 }}>
      我是一个侧边抽屉，点击蒙层关闭我
    </div>
  )
}

export default function () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => void setIsOpen(true)} type="primary">
        点我展示抽屉
      </Button>

      <DrawerWrapper open={isOpen} onClose={() => void setIsOpen(false)}>
        <CustomDrawer />
      </DrawerWrapper>
    </div>
  )
}
