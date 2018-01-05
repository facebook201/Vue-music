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



