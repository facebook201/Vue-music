音乐列表页面的动画效果。 

* 在scroll 组件上面写一个div 通过div 向上慢慢的顶起bgimage。

* scroll 外面的盒子的overflow: hidden; 样式去掉

* 监听scroll 事件 通过listenScroll 属性设置为true。 scroll组件那边监听 如果监听listenScroll 那么在scroll滚动的时候 就$emit 出scroll事件  传出pos的值 里面有x y的偏移量

  ​

```Javascript
// 子组件 初始化的时候监听scroll事件 然后使用回调传出pos
if (this.listenScroll) {
  let me = this;
  this.scroll.on('scroll', (pos) => {
    me.$emit('scroll', pos);
  });	
}

// 父组件
scroll(pos) {
  this.scrollY = pos.y; // 获取滚动的偏移量
}
// 监听scrollY
watch: {
  scrollY(newY) {
    // 逻辑代码
    // 随着scroll的滚动 scroll 会改变 然后慢慢向上移动
    this.$refs.bglayer.style['transform'] = `translate3d(0, ${newval}px, 0)`;
    this.$refs.bglayer.style['webkitTransform'] = `translate3d(0, ${newval}px, 0)`; 
  }
}
```



### 上滑动和下拉的动画 以及模糊

通过上面的scrollY的值来判断是上滑动还是下拉。

```javascript
// 下滑的时候根据比例来设置放大的倍数
let scale = 1;
let blur = 1;

const precent = Math.abs(newY / this.imageHeight);
if (newY > 0) {
  scale = 1 + precent;
  zIndex = 10;
} else {
  blur = Math.min(20 * precent, 20);
}
this.$refs.fliter.style['backdrop-filter'] = `blur(${blur}px)`;
this.$refs.fliter.style['webkitBackdrop-filter'] = `blur(${blur}px)`;
```

#### 与此同时 上面的那种js怎么统一封装这种添加前缀

```javascript
// 第一步 进行能力检测 
let elementStyle = document.createElement('div').style;

// 第二步 判断供应商
let vendor = (() => {
  let elementNames = {
    wekbit: 'webkitTransform',
    moz: 'mozTransform',
    o: 'oTransform',
    ms: 'msTransform',
    standard: 'transform'
  };
  
  for (let key in elementNames) {
    if (elementstyle[elementNames[key]] !== void 0) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

// 使用
const transform = prefixStyle('transform');
const backdrop = prefixeStyle('backdrop-filter');
let scale = 1;

this.$refs.some.style[transform] = `scale(${scale})`;

```

























