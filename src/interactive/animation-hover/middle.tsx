import { css } from '@emotion/css'
import { useState } from 'react'

const listItemCss = css`
  margin: 16px 0;
  padding: 8px 10px;
  border-radius: 4px;
  background: #e9f4fe;
  cursor: pointer;

  /** 注意，下面是我们添加的 CSS 👇🏻 */
  &:hover {
    background: #d0e8ff;
  }

  &:active {
    background: #b9ddff;
  }
`

interface IListProps<T = string> {
  list: T[]
  onItemClick(item: T): void
}

function List(props: IListProps) {
  return (
    <div>
      {props.list.map(item => (
        <div className={listItemCss} onClick={() => void props.onItemClick(item)} key={item}>
          {item}
        </div>
      ))}
    </div>
  )
}

const list = ['我是列表项1', '我是列表项2', '我是列表项3', '我是列表项4']

export default function () {
  const [item, setItem] = useState<string>()

  return (
    <div>
      <div style={{ marginBottom: 30 }}>你刚点击了：{item}</div>
      <List list={list} onItemClick={setItem} />
    </div>
  )
}
