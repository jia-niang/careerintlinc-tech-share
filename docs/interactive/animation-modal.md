---
title: 模态框动画
order: 0
nav:
  title: 交互
  order: 0
group:
  title: 动效
  order: 0
---

# 模态框动画

模态框是我们常常称为 “弹窗” 的组件。
我们经历了多年业务开发，写个模态框出来是随手的事：

<code src="@/interactive/animation-modal/plain.tsx"></code>

## 对比一下

对比以下两个模态框的打开和关闭，你能看出来它们有什么区别吗：

<code src="@/interactive/animation-modal/compare.tsx" inline></code>

显而易见的：

“简陋”的弹窗，打开时就是瞬间一个弹窗覆盖在页面上，没有任何过渡和动画；
“精致”的弹窗，打开会有淡入、关闭会有淡出效果，通过透明度的变化，来产生一个渐变的过渡。

熟悉 CSS 动画的同学，可能马上就会反应过来：这不就是 CSS 的 `transition` 属性吗？
于是乎马上信手拈来，写下了以下样式：

```less | pure
.modal {
  transition: all 300ms;

  /** 弹窗关闭时 */
  opacity: 0;
  /** 弹窗开启时 */
  opacity: 1;
}
```

把上面这句样式应用到组件上后，却发现出了问题：**动画并没有生效**。
你可以试一试，或者看一下源码：

<code src="@/interactive/animation-modal/try-with-css.tsx"></code>

其实，动画没有生效的原因很简单：

对于一个元素而言，如果给它设置了 `transition: all` 属性，那么对于大部分有过渡状态的属性而言，只要这些属性发生了改变，CSS 就会让它们产生过渡动画。

例如 “透明度”、“宽度”、“高度” 等都是有过渡状态的，但是 “背景色”、“是否显示” 这种属性就是没有过渡状态了。
我们这里通过 `class` 来更改元素的 `opacity` 属性，这个属性是有过渡状态的，按理说是应该有动画效果。

但是，我们以打开弹窗为例，令 `open` 属性变成 `ture` ，此时对于 React 而言，等于说是创建了一个节点，同时给这个节点的 `class` 加上一个 `"open"`；**而 React 会批量合并 DOM 操作，最终的结果其实是我们的操作等于说凭空创造了一个 `<div class="open ...">` 的节点**。

节点从无到有这个过程，其实是瞬间跳出来的（包括 `display: none;` 的切换），而 CSS 的过渡只能针对 CSS 属性的更新。
因此我们的动画没有生效。

## 如何实现过渡

通过上面的例子我们可以看出：对于弹窗这一类组件，如果想让它的出现和消失产生动画过渡效果，我们要做到：

- 首先，使用支持过渡的 CSS 属性，例如透明度 `opacity`；
- 其次，必须保证在过渡动画期间，**节点要一直保持存在**，不能提前把节点移除掉。

出于以上的原因，我们需要在此类组件开发的时候，采取**使用多个状态来分别控制节点和 CSS 属性**的方式来处理动画。

仔细回想一下对于弹窗而言它的内部状态会经历哪些变化？

- 弹窗打开时，先把带有 `opacity: 0;` 属性的节点渲染出来，此时它不显示，然后节点出来后再更改它的属性，把 `opacity` 改为 `1` ，这样一个从无到有的弹窗淡入过渡就产生了；
- 弹窗关闭时，先把 `opacity` 属性改为 `0`，**等待过渡动画到时间结束后，再把节点移除**。

第二步这个等待操作，我们大可不用通过写 `setTimeout` 来完成，DOM 元素有一个 `onTransitionEnd` 事件，当元素的过渡动画完成时会触发这个事件。我们可以通过这个事件来完成节点的移除操作。此处感谢 @Randle 给我的指点。

## 实践

理解了上面的理论，便可以动手实践，自己写一个 “精致” 的模态框组件：

<code src="@/interactive/animation-modal/good.tsx"></code>

## 组件化

既然理解了原理，我们就可以实现一个包装器组件，用来给项目中所有的 “弹窗组件” 作为包装；
后续有弹窗相关的需求，只需要写出弹窗本身的代码，然后套上 “包装器” 即可。

这里给出一个简单的实现：

<code src="@/interactive/animation-modal/wrapper.tsx"></code>

只提供一个包装器，可能还不够过瘾，我们还会提供一个 HOC 组件，用于直接包装弹窗组件 FC 本身：

<code src="@/interactive/animation-modal/wrapper-hoc.tsx"></code>

## 医脉同道中的应用

因为 antd 自带了弹窗动画，所以医脉同道 PC 站并没有使用自研的弹窗组件；
而医脉同道小程序使用 Taro 框架，它的 UI 框架方面较为薄弱，因此我们开发了相关的弹窗控制组件来方便使用。

上述的弹窗组件，在医脉同道中的应用：

<video src="https://cdn.paperplane.cc/career-share/interactive/ymtd__interactive__animation-modal.mp4" controls></video>
