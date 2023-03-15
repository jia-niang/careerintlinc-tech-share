import { css } from '@emotion/css'
import { Space } from 'antd'

const publicCss = `
  display: inline-block;
  cursor: pointer;
  padding: 10px 30px;
  border-radius: 5px;
  background-color: #ddd;
`

const hoverCss = css`
  ${publicCss}

  /** 这些是增强反馈的代码 👇🏻 */
  transition: all 250ms;

  &:hover {
    background-color: #bbb;
  }
`

const clickCss = css`
  ${publicCss}

  /** 这些是增强反馈的代码 👇🏻 */
  transition: all 250ms;

  &:active {
    background-color: #bbb;
  }
`

const focusCss = css`
  ${publicCss}

  /** 这些是增强反馈的代码 👇🏻 */
  &:focus {
    outline: #bbb dashed;
  }
`

export default function () {
  return (
    <Space wrap>
      <div className={hoverCss}>鼠标悬停我</div>
      <div className={clickCss}>鼠标点击我</div>
      <div
        className={focusCss}
        // 👇🏻 注意这个必不可少，否则 :focus 不生效
        tabIndex={1}
      >
        最后点选我的试试
      </div>
    </Space>
  )
}
