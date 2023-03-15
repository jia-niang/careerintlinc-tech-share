import { Button, Space } from 'antd'
import { useState } from 'react'

import Drawer from './drawer'

export default function () {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  return (
    <div>
      <Space wrap>
        <Button onClick={() => void setOpen1(true)} type="default">
          线性过渡（linear）的抽屉
        </Button>
        <Button onClick={() => void setOpen2(true)} type="primary">
          非线性过渡（ease）的抽屉
        </Button>
        <Button onClick={() => void setOpen3(true)} type="primary">
          非线性过渡（ease-in-out）的抽屉
        </Button>
      </Space>

      <Drawer transitionTiming="linear" open={open1} onClose={() => void setOpen1(false)} />
      <Drawer transitionTiming="ease" open={open2} onClose={() => void setOpen2(false)} />
      <Drawer transitionTiming="ease-in-out" open={open3} onClose={() => void setOpen3(false)} />
    </div>
  )
}
