<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="ecmascript-6">
import BScroll from 'better-scroll';

export default {
  props: {
    // 这里默认的是节流的方式 如果不节流就传3
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    // 父组件传递的数据 如果有数据变化 那么 watch 到变化。 就refresh 重新计算 BScroll
    data: {
      type: Array,
      default: null
    },
    // 要不要监听滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 初始化scroll 要确保dom渲染出来
    _initScroll() {
      // 先判断dom有没有
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      });
      // 如果监听了scroll 派发出去
      if (this.listenScroll) {
        let me = this;
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos);
        });
      }
    },
    enable() {
      this.scroll && this.srcoll.enable();
    },
    disable() {
      this.scroll && this.srcoll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    // 滚动到指定元素
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
