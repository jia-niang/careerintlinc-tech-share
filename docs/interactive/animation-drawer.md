---
title: 抽屉动画
order: 1
nav:
  title: 交互
  order: 0
group:
  title: 动效
  order: 0
demo:
  cols: 2
---

# 抽屉动画

在 PC 端 “抽屉” 动画一般用于实现类似于 “侧边导航栏” 这一类功能；
而在移动端使用的场景更多一些，很多弹窗都会使用这种动画，可以回想一下微信支付的密码输入弹窗，其实也算一个 “抽屉” 动画。

上一章我们讲到模态框组件的实现，其实抽屉动画的实现也一样，核心要点是利用了 `transition` 这个 CSS 属性来实现过渡；
但是模态框的实现方式更简单，只需要修改 `opacity` 即可实现淡入淡出，而抽屉是运动动画，属性的处理方面会更复杂。

让我们模拟 antd 的 `Drawer` 抽屉组件，写一个类似的组件，这次就不卖关子了，该做的动画都做上：

<code src="@/interactive/animation-drawer/normal.tsx"></code>

## 实现方式

与模态框动画不同，抽屉动画的过渡状态是页面元素的移动，因此它需要考虑到元素的定位问题。

以上面的代码为例，可以把抽屉展开、收起的两种状态用 CSS 表示为：

```less | pure
position: absolute;
top: 0;
bottom: 0;
transition: all 300ms;

/** 展开状态，元素右边缘刚好贴着屏幕右边 */
right: 0;
transform: translateX(0%);

/** 收起状态，此时元素被右移自身 100% 的宽度，刚好移出屏幕外 */
transform: translateX(100%);
```

实际上抽屉的实现方式有很多，这里还能举出个例子：

```less | pure
position: absolute;
top: 0;
bottom: 0;
transition: all 300ms;
width: 500px;

/** 展开状态，元素右边缘刚好贴着屏幕右边 */
right: 0;

/** 收起状态，此时元素 right 为负，刚好移出屏幕外 */
right: -500px;
```

可以看出上面这个方法还是存在缺点的，就是必须明确知道抽屉的宽度，否则收起时的 `right` 就必须给一个很大的负数，这会导致抽屉收起的速度变快。

## 组件化

和上一章的模态框一样，我们可以开发一个 “包裹器” 组件，内部封装了状态和动画样式等，便于开发其他的抽屉组件。

<code src="@/interactive/animation-drawer/wrapper.tsx"></code>
<code src="@/interactive/animation-drawer/wrapper-hoc.tsx"></code>

## 更多有趣的实现

再来点例子：

<code src="@/interactive/animation-drawer/scroll.tsx"></code>
<code src="@/interactive/animation-drawer/t3d.tsx"></code>

修改 `transform` 属性值便可以控制抽屉动画的表现形式。

## 医脉同道中的应用

因为 antd 自带了抽屉动画，所以医脉同道 PC 站并没有使用自研的抽屉组件；
而医脉同道小程序使用 Taro 框架，它的 UI 框架方面较为薄弱，因此我们开发了相关的抽屉控制组件来方便使用。

上述的抽屉组件，在医脉同道中的应用：

<video src="https://paperplane-1253277322.cos.ap-shanghai.myqcloud.com/career-share/interactive/ymtd__interactive__animation-drawer.mp4" controls></video>
