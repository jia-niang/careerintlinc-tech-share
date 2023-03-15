import { css } from '@emotion/css'
import { Button, Modal } from 'antd'
import cls from 'classnames'
import { useState } from 'react'

const listItemCss = css`
  margin: 16px 0;
  padding: 8px 10px;
  border-radius: 4px;
  background: #e9f4fe;
  cursor: pointer;

  &.last {
    background: #d0e8ff;
  }
`

const citys = ['苏州', '北京', '上海', '深圳', '纽约']

async function showCitySelect() {
  function List(props: { onItemClick(item: string): void }) {
    const [last, setLast] = useState<string>()

    return (
      <div>
        {citys.map(item => (
          <div
            onClick={() => {
              setLast(item)
              // 👇🏻 注意，这里延迟了 250ms，再触发点击事件
              setTimeout(() => {
                props.onItemClick(item)
              }, 250)
            }}
            className={cls(listItemCss, item === last ? 'last' : '')}
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    )
  }

  return new Promise<string>(resolve => {
    const modal = Modal.info({
      title: '请选择城市',
      footer: null,
      icon: null,
      content: (
        <List
          onItemClick={item => {
            resolve(item)
            modal.destroy()
          }}
        />
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
