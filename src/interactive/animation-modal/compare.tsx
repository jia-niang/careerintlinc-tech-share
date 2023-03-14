import { Button, Space } from 'antd'
import { useState } from 'react'

import { GoodModal } from './good'
import { Modal as PlainModal } from './plain'

export default function () {
  const [isPlainOpen, setIsPlainOpen] = useState(false)
  const [isGoodOpen, setIsGoodOpen] = useState(false)

  return (
    <div>
      <Space size="large" style={{ padding: '20px 0' }}>
        <Button onClick={() => void setIsPlainOpen(true)} type="primary">
          “简陋”的弹窗
        </Button>
        <Button onClick={() => void setIsGoodOpen(true)} type="primary">
          “精致”的弹窗
        </Button>
      </Space>

      <PlainModal open={isPlainOpen} onClose={() => void setIsPlainOpen(false)} />
      <GoodModal open={isGoodOpen} onClose={() => void setIsGoodOpen(false)} />
    </div>
  )
}
