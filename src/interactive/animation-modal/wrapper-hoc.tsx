import { Button } from 'antd'
import { FC, useState } from 'react'

import { IModalWrapperProps, ModalWrapper } from './wrapper'

/** 我是 “弹窗包装器” 的 HOC */
export function modalWrapper(ModalComponent: FC) {
  return function (props: IModalWrapperProps) {
    return (
      <ModalWrapper {...props}>
        <ModalComponent />
      </ModalWrapper>
    )
  }
}

/** 我是自定义的弹窗 */
function MyModal() {
  return (
    <div style={{ width: 500, maxWidth: '70vw', height: 400, background: '#fff', padding: 30 }}>
      我是一个弹窗
    </div>
  )
}

/** 被包装后的组件 */
const MyGoodModal = modalWrapper(MyModal)

export default function () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => void setIsOpen(true)} type="primary">
        点我展示弹窗
      </Button>

      <MyGoodModal open={isOpen} onClose={() => void setIsOpen(false)} />
    </div>
  )
}
