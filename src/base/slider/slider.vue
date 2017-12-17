<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentIndex === index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { addClass } from 'common/js/dom';
export default {
  data() {
    return {
      dots: [],
      currentIndex: 0
    };
  },
  props: {
    // 是否可以循环轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 是否可以自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 轮播间隔 4s
    interval: {
      type: Number,
      default: 4000
    }
  },
  // 初始化 scroll的时候 要在mounted生命钩子函数里面执行
  mounted() {
    // 浏览器的刷新时间是17ms一次 设置20ms是比较合适的
    setTimeout(() => {
      // 初始化操作
      this._setSliderWidth();
      // 初始化dots dots的个数跟图片个数相匹配
      this._initDots();
      this._initSlider();
      this._play();
    }, 20);
    window.addEventListener('resize', () => {
      // slider 还未初始化直接return
      if (!this.slider) {
        return;
      }
      // 设置标识位
      this._setSliderWidth(true);
      this.slider.refresh();
    });
  },
  methods: {
    // 设置 slider的宽度
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, 'slider-item');
        child.style.width = sliderWidth + 'px';
        width += sliderWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + 'px';
    },
    // 初始化slider
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      });
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        if (this.loop) {
          pageIndex -= 1;
        }
        this.currentIndex = pageIndex;

        if (this.autoPlay) {
          clearTimeout(this.timer);
          this._play();
        }
      });
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    // 播放
    _play() {
      let pageIndex = this.currentIndex + 1;
      // 如果当前在播放中
      if (this.loop) {
        pageIndex += 1;
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400);
      }, this.interval);
    }
  },
  destroyed() {
    // 好的习惯 在生命周期末期销毁定时器
    clearTimeout(this.timer);
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
.slider
   min-height: 1px
   .slider-group
     position: relative
     overflow: hidden
     white-space: nowrap
     .slider-item
       float: left
       box-sizing: border-box
       overflow: hidden
       text-align: center
       a
         display: block
         width: 100%
         overflow: hidden
         text-decoration: none
       img
         display: block
         width: 100%
   .dots
     position: absolute
     right: 0
     left: 0
     bottom: 12px
     text-align: center
     font-size: 0
     .dot
       display: inline-block
       margin: 0 4px
       width: 8px
       height: 8px
       border-radius: 50%
       background: $color-text-l
       &.active
         width: 20px
         border-radius: 5px
         background: $color-text-ll
</style>
