---
title: 反馈动效
order: 3
nav:
  title: 交互
  order: 0
group:
  title: 动效
  order: 0
demo:
  cols: 3
---

# 反馈动效

设想一个场景：
一个很复杂的表单或者说操作面板，你点击了其中某一个控件，但是打了个喷嚏，然后就找不到刚才点的是哪个控件；
或者说，在一个 feed 列表里，你点击了某个列表项进入了其详情页面，但是怀疑自己是不是手滑了点错了。

我们可以回想一下，这个场景近期又出现吗？应该很难遇到了吧。现代的 UI 工具已经可以很好的把这个问题解决了：“焦点” 和 “反馈动效”。
**我们在实现交互效果时，可以注重对页面控件的添加强调效果，来维持页面控件给用户的 “反馈”。**

这里用 antd 来举例，可以尝试一下点击按钮：

<code src="@/interactive/animation-hover/try.tsx"></code>

设想一下，假设你面对数十个 antd 的按钮，点击某个按钮后你会马上想不起刚才点的是哪个吗？
因此，本章主要考虑的是对交互的 “强调与反馈” 效果。

## 举个例子

如果使用 antd 等 UI 库，它们自身已经具备了丰富的动效，可以避免这种问题。
主要是自研 UI 组件，如果不注意这个问题，会导致用户交互上出现缺失。

可以体验一下在下面两个列表组件中，点击某个列表项时，交互有何不同：

<code src="@/interactive/animation-hover/bad.tsx"></code>
<code src="@/interactive/animation-hover/middle.tsx"></code>
<code src="@/interactive/animation-hover/good.tsx"></code>

上面三个示例，从左到右反馈感依次增强了，可以说最右边的反馈感最强烈，交互体验也最好。

---

如果是涉及到**界面跳转**的场合，例如：打开弹窗，选中某一项后关掉弹窗，此时反馈效果就更为重要。
这里可以体验一下：

<code src="@/interactive/animation-hover/bad-modal.tsx"></code>
<code src="@/interactive/animation-hover/good-modal.tsx"></code>

通过体验，可以明显感觉到右边弹窗设计的交互效果更好。
查看源码可以发现，除了使用了强调效果之外，我们还给弹窗做了一个 250ms 的关闭延迟，通过这种方式来增强用户的反馈感。

## 实现方式

展开上面 3 个列表示例的源代码，可以发现我们是通过给元素附加 `:hover` 来实现鼠标悬停样式，通过附加 `:active` 来实现点击按下时的样式，通过 `:focus` 给最后一个点击的元素附加样式；
注意：`:active` 必须写在 `:hover` 后面，否则会被覆盖无法生效；必须有 `tabIndex` 属性，元素的 `:focus` 才能有效。

如果配合把这些伪类和 `transition` 过渡结合，可以得到更好的效果：

<code src="@/interactive/animation-hover/pratice.tsx"></code>

另外，在移动端，最后一个点选过的元素会自动适用 `:hover` 效果。

---

在小程序中，官方为每个内置组件都提供了一套属性用于实现上述的反馈特效（微信官方不推荐使用 `:active` 等来实现）：

- `hover-class`：被点按时，会自动给元素附加此属性的类名；
- `hover-start-time`：用户点按此元素多少毫秒后开始进入点按状态（默认 50）；
- `hover-stay-time`：手指松开后，点按状态会留存多少毫秒（默认 400）；
- `hover-stop-propagation`：被点按的元素如果开启了这个属性，那么它会避免元素的外层元素也进入被点按的状态。

## 医脉同道中的应用
