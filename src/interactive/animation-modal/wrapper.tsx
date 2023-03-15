import { Button } from 'antd'
import cls from 'classnames'
import { CSSProperties, ReactElement, useEffect, useState } from 'react'

import modalMaskCss from './modal-mask-css'
import modalWrapperCss from './modal-wrapper-css'

export interface IModalWrapperProps {
  /** 弹窗是否已打开 */
  open?: boolean
  /** 关闭弹窗时触发此事件 */
  onClose?(): void
  /** 过渡动画持续多久毫秒，默认 300 */
  transitionDuration?: number

  style?: CSSProperties
  className?: string
  children?: ReactElement
}

/** 我就是包裹器组件了 */
export function ModalWrapper(props: IModalWrapperProps) {
  const { open, onClose, transitionDuration = 300, style, className, children } = props

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

  if (!children || !alive) {
    return null
  }

  return (
    <div className={cls(className, modalWrapperCss)} style={style}>
      <div
        style={{
          transition: `all ${transitionDuration}ms`,
          opacity: active ? 1 : 0,
          zIndex: 9999,
        }}
      >
        {children}
      </div>
      <div
        onClick={onClose}
        onTransitionEnd={maskTransitionEndHandler}
        className={modalMaskCss}
        style={{ transition: `all ${transitionDuration}ms`, opacity: active ? 0.8 : 0 }}
      ></div>
    </div>
  )
}

/** 我是自定义的弹窗 */
function CustomModal() {
  return (
    <div style={{ width: 500, maxWidth: '70vw', height: 400, background: '#fff', padding: 30 }}>
      我是一个弹窗
    </div>
  )
}

export default function () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => void setIsOpen(true)} type="primary">
        点我展示弹窗
      </Button>

      <ModalWrapper open={isOpen} onClose={() => void setIsOpen(false)}>
        <CustomModal />
      </ModalWrapper>
    </div>
  )
}
