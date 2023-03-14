import { css } from '@emotion/css'
import { Button } from 'antd'
import { useState } from 'react'

const modalWrapperCss = css`
  z-index: 9999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

/** 我是模态框的 CSS 样式 */
const modalCss = css`
  z-index: 9999;
  width: 500px;
  max-width: 70vw;
  height: 300px;
  border-radius: 20px;
  background: #fff;
  padding: 40px;
`

/** 我是背景蒙层的 CSS 样式 */
const maskCss = css`
  z-index: 9998;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  opacity: 0.8;
`

interface IModalProps {
  open: boolean
  onClose(): void
}

export function Modal(props: IModalProps) {
  if (!props.open) {
    return null
  }

  return (
    <div className={modalWrapperCss}>
      <div className={modalCss}>我是弹窗的内容，点击蒙层关闭弹窗</div>
      <div onClick={props.onClose} className={maskCss}></div>
    </div>
  )
}

export default function () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => void setIsOpen(true)} type="primary">
        点我打开弹窗
      </Button>

      <Modal open={isOpen} onClose={() => void setIsOpen(false)} />
    </div>
  )
}
