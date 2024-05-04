---
title: 非线性动画
order: 2
nav:
  title: 交互
  order: 0
group:
  title: 动效
  order: 0
demo:
  cols: 2
---

# 非线性动画

“非线性动画” 这个词大家可能比较陌生，不过在网上搜索一下可以发现很多手机系统里的系统动画都使用了这种方案，最早是由苹果 iOS 引领的。
这里的 “非线性” 指的是动画的播放进度并不是匀速的，而是存在一定变化，也就是说动画的播放进度也要 “过渡”。

<code src="@/interactive/animation-non-linear/try.tsx"></code>

可以看到，上面两个进度条动画都在点击开始按钮后开始、都在一秒钟之后结束，但是可以明显看出动画过程中，两边的进度并不同步。

如果仔细看，可以看出上面的线性动画进度是 “匀速” 的，在其中任意相同的时间段内，进度条的增长都是保持相同；
对比之下，下面的动画进度便是 “非匀速” 的，在一开始起步就比线性动画慢下来，然后赶超，最后又降速并和线性动画同时结束。

## 实现原理

点开源码可以看到，上述实现非线性动画的地方除了使用了 `transition` 过渡之外，还多了一个关键词： `ease-in-out`。
其实 CSS 中 `transition` 属性是一个复合属性，它由四个部分组成：

- 过渡属性（`transition-property`）：指定哪些属性的变化会应用过渡效果，例如上面的例子里其实是 `width` 应用到了过渡效果，不过我们可以填写 `all` 来让所有属性都应用过渡动效；
- 过渡持续时间（`transition-duration`）：指定过渡动画的持续时间，例如上面的 `1000ms` 便是持续时间的意思；
- 过渡的 “加速度曲线” 属性（`transition-timing-function`）：这里的 `ease-in-out` 便是动画曲线；
- 过渡的延迟时间（`transition-delay`）：这个是第四个属性，用的比较少，表示动画开始前延迟的时间，此处不再赘述。

我们上面写的 CSS 样式：

```less | pure
/** 线性动画 */
transition: all 1000ms;

/** 非线性动画，可以看到多了个动画曲线的参数 */
transition: all 1000ms ease-in-out;
```

这里的 `ease-in-out` 属性是使过渡动画没有匀速进行而是以一种特殊的速度曲线运作的关键。

通过查阅资料，我们可以得知这个属性支持多个值，下面给出常用的几个值：

```less | pure
/** 下面这个其实是线性 */
transition-timing-function: linear;

/** 下面这些就是常用的加速曲线，注意不指定此值那默认值是 ease */
transition-timing-function: ease;
transition-timing-function: ease-in;
transition-timing-function: ease-out;
transition-timing-function: ease-in-out;

/** 下面这俩比较特殊，分别是开始时瞬间、结束时瞬间 */
transition-timing-function: step-start;
transition-timing-function: step-end;
```

我们来看一下常见的几个加速曲线的过渡动效：

<code src="@/interactive/animation-non-linear/list.tsx"></code>

可以看出，默认的加速度曲线其实是 `ease` 而不是线性的。

还有两个特殊的：

<code src="@/interactive/animation-non-linear/step.tsx"></code>

这两个比较特殊，可以理解成它们的动画过渡时间是瞬间完成的，只不过一个在持续时间开始时就瞬间完成、一个在持续时间结束时就瞬间完成。

## 深入研究

仔细观察几个进度条的过渡动画播放情况，可以大致得出下面的结论：

- 持续时间是准确的，无论过渡动效是快是慢，最终都是同时开始、同时结束；
- `linear` 就像它自身的名字一样，是 “线性” 的动画，动效的进度是匀速的；
- `ease` 可以理解成先加速几乎马上完成进度，到最后减速保持同时结束过渡，动效播放的比较 “激进”；
- `ease-in` 一开始就落后于线性速度，到最后再加速赶上；
- `ease-out` 可以理解成和 `ease-in` 相反，一开始就超过线性，最后减速保持同时结束过渡；
- `ease-in-out` 刚开始先比线性慢，然后慢慢加速直到速度超过线性，到后半段再减速，过渡较为平缓；
- `step-start` 过渡开始的瞬间就完成了，等于说后面整段时间都是干等着结束；
- `step-end` 过渡结束的瞬间完成，等于说延迟一段时间瞬间完成。

用我个人的理解，是这样的：
默认的 `ease` 就是已经很接近优质的过渡效果了，很符合生活中的运动物体的加速度情况，例如车辆、推拉门；
也可以使用 `ease-in-out`，相比之下它更加平缓一些。

在 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function) 上已经有一篇文章来介绍这些动效以及其加速度曲线。

阅读文档之后，还能发现几种特殊的加速度曲线定义方式，例如 `steps(...)`、`cubic-bezier(...)`，这个就是允许我们用更复杂、更精细的方式控制过渡动画的加速度曲线。

---

试用一下 `steps(...)` 这个函数：

<code src="@/interactive/animation-non-linear/steps.tsx"></code>

例如这个 `steps(...)` 函数，它可以生成阶梯状的加速度曲线，可以实现这种 “一段一段” 的过渡动效；
仔细观察动画，可以看出第一个参数为分段的段数量，例如这里 1000ms 的动画如果分为 4 段，那么就是 0-250ms 为第一段、250-500ms 为第二段、500-750ms 为第三段、750-1000ms 为第四段。

按照这种理解，可以看出：

- `jump-start` 便是在每个时间区间的最初瞬间执行这一段的过渡，也就是其实 750ms 就完成了动画，会给人一种 “提早结束” 的感觉；
- `jump-end` 是在每个时间区段的最末瞬间执行这一段过度，也就是说在第 250ms 之前进度是完全不动的，会给人一种 “开始慢了” 的感觉；
- `jump-both` 可以理解成上面两种的结合，意味着每个时间区间的始、末都会动一次，也就是说页面中进度条的 “跳动” 次数是 5 次而不是 4 次，它能给人一种开始、结束实际都恰好的感觉，；
- `jump-none` 在每个区间中间瞬间执行这一段的过渡，所以说页面中进度条的 “跳动” 次数是 3 次而不是 4 次，它既会让人感觉 “开始晚了，结束也提早了”。

---

关于 `cubic-bezier(...)` 这个函数：
它的名字叫做 “贝塞尔曲线”，通过网络资料，我们可以得知：

> 贝塞尔曲线(Bézier curve)，又称贝兹曲线或贝济埃曲线，是应用于二维图形应用程序的数学曲线。
> 一般的矢量图形软件通过它来精确画出曲线，贝兹曲线由线段与节点组成，节点是可拖动的支点，线段像可伸缩的皮筋，我们在绘图工具上看到的钢笔工具就是来做这种矢量曲线的。

在过渡动画的设计中，为什么会用到这个函数？
实际上，它可以用于定义我们的 “加速度曲线”。之前的 `ease`、`ease-in-out` 等加速度曲线都可以用这个函数绘制出来，甚至还能实现出 “回弹” 这种效果。

这个函数的用法较为复杂，涉及到一些数学知识，我们可能不会自己去绘制它，这里给出两个绘制工具：[Ceaser](https://matthewlein.com/tools/ceaser) 和 [Cubic-Bezier](https://cubic-bezier.com/)。

给个简单的例子：

<code src="@/interactive/animation-non-linear/bezier.tsx"></code>

## 真实体验

这里给出应用了几种不同线性动画的抽屉组件，这三个抽屉的过渡时间都是 700ms，可以点击体验一下：

<code src="@/interactive/animation-non-linear/practice.tsx"></code>

是不是明显感觉到，非线性的过渡，观感会更好。

## 医脉同道中的应用

医脉同道前端团队，深入研究用户交互和体验，为项目中的 “抽屉” 等组件都加了非线性动画。
举例：

<video src="https://cdn.paperplane.cc/careerintlinc-tech-share-attachment/interactive/ymtd__interactive__animation-non-linear.mp4" controls></video>
