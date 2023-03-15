import { Button } from 'antd'
import { FC, useState } from 'react'

import { DrawerWrapper, IDrawerWrapperProps } from './wrapper'

/** 我是 “抽屉包装器” 的 HOC */
export function drawerWrapper(DrawerComponent: FC) {
  return function (props: IDrawerWrapperProps) {
    return (
      <DrawerWrapper {...props}>
        <DrawerComponent />
      </DrawerWrapper>
    )
  }
}

/** 我是自定义的抽屉 */
function MyDrawer() {
  return (
    <div style={{ width: 500, maxWidth: '70vw', padding: 30 }}>
      我是一个自定义的抽屉，点击蒙层关闭我
    </div>
  )
}

/** 被包装后的组件 */
const MyGoodDrawer = drawerWrapper(MyDrawer)

export default function () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => void setIsOpen(true)} type="primary">
        点我展示抽屉
      </Button>

      <MyGoodDrawer open={isOpen} onClose={() => void setIsOpen(false)} />
    </div>
  )
}
