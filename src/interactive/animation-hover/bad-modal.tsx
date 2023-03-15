import { css } from '@emotion/css'
import { Button, Modal } from 'antd'
import { useState } from 'react'

const listItemCss = css`
  margin: 16px 0;
  padding: 8px 10px;
  border-radius: 4px;
  background: #e9f4fe;
  cursor: pointer;
`

const citys = ['苏州', '北京', '上海', '深圳', '纽约']

async function showCitySelect() {
  return new Promise<string>(resolve => {
    const modal = Modal.info({
      title: '请选择城市',
      footer: null,
      icon: null,
      content: (
        <div>
          {citys.map(item => (
            <div
              onClick={() => {
                resolve(item)
                modal.destroy()
              }}
              className={listItemCss}
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      ),
    })
  })
}

export default function () {
  const [city, setCity] = useState<string>()

  const selectHandler = () => {
    showCitySelect().then(setCity)
  }

  return (
    <div>
      <div style={{ padding: '20px 0' }}>你选择了：{city}</div>
      <Button onClick={selectHandler} type="primary">
        点我打开城市选择
      </Button>
    </div>
  )
}
