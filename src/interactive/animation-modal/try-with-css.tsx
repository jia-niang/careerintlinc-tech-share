import { Button } from 'antd'
import { useState } from 'react'

import modalBodyCss from './modal-body-css'
import modalMaskCss from './modal-mask-css'
import modalWrapperCss from './modal-wrapper-css'

interface IMyModalProps {
  open: boolean
  onClose(): void
}

function MyModal(props: IMyModalProps) {
  if (!props.open) {
    return null
  }

  return (
    <div className={modalWrapperCss}>
      <div
        className={modalBodyCss}
        // 下面这个 style 是新加的 👇🏻
        style={{ opacity: props.open ? 1 : 0, transition: 'all 300ms' }}
      >
        我是弹窗的内容，点击蒙层关闭弹窗
      </div>

      <div
        onClick={props.onClose}
        className={modalMaskCss}
        // 下面这个 style 是新加的 👇🏻
        style={{ opacity: props.open ? 0.8 : 0, transition: 'all 300ms' }}
      ></div>
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

      <MyModal open={isOpen} onClose={() => void setIsOpen(false)} />
    </div>
  )
}
