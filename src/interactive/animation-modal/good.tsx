import { Button } from 'antd'
import { useEffect, useState } from 'react'

import modalBodyCss from './modal-body-css'
import modalMaskCss from './modal-mask-css'
import modalWrapperCss from './modal-wrapper-css'

interface IModalProps {
  open: boolean
  onClose(): void
}

export function GoodModal(props: IModalProps) {
  // 我表示节点是否存在
  const [alive, setAlive] = useState(false)
  // 我表示 opacity 属性
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (props.open) {
      setAlive(true) // 弹窗要打开，先把节点挂出来
      setTimeout(() => void setActive(true), 20) // 然后再改 opacity
    } else {
      setActive(false) // 弹窗要关闭，直接改 opacity
    }
  }, [props.open])

  const maskTransitionEndHandler = () => {
    if (!props.open) {
      setAlive(false) // 弹窗要关闭，opacity 改完了，触发我移除节点
    }
  }

  if (!alive) {
    return null
  }

  return (
    <div className={modalWrapperCss}>
      <div className={modalBodyCss} style={{ opacity: active ? 1 : 0, transition: 'all 300ms' }}>
        我是弹窗的内容，点击蒙层关闭弹窗
      </div>
      <div
        className={modalMaskCss}
        onTransitionEnd={maskTransitionEndHandler}
        onClick={props.onClose}
        style={{ opacity: active ? 0.8 : 0, transition: 'all 300ms' }}
      ></div>
    </div>
  )
}

export default function () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => void setIsOpen(true)} type="primary">
        “精致”的弹窗
      </Button>

      <GoodModal open={isOpen} onClose={() => void setIsOpen(false)} />
    </div>
  )
}
