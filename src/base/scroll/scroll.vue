<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  props: {
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
    },
    enable() {
      this.scroll && this.srcoll.enable();
    },
    disable() {
      this.scroll && this.srcoll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
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
