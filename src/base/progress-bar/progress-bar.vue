<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import {prefixStyle} from 'common/js/dom';

const progressBtnWidth = 16;
const transform = prefixStyle('transform');

export default {
  props: {
    precent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
    // 点击按钮的时候
    progressTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth; // 保存偏移量
    },
    // 手指滑动的时候连续触发 且阻止
    progressTouchMove(e) {
      // 判断
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth -
        progressBtnWidth, Math.max(0, this.touch.left + deltaX));
      this._offset(offsetWidth);
    },
    // 触发事件结尾
    progressTouchEnd(e) {
      this.touch.initiated = false;
      this._triggerPrectent();
    },
    // 这里在拖动结束之后 给父组件传一个precent的参数
    _triggerPrectent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const precent = this.$refs.progress.clientWidth / barWidth;
      this.$emit('precentChange', precent);
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      // 进度条按钮偏移量
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
    },
    // 点击进度条 切换到想要的位置
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this._offset(offsetWidth);
      // 当点击progressBtn e.offsetX获取不对
      // this._offset(e.offsetX);
      this._triggerPrectent();
    }
  },
  watch: {
    precent(newPrecent) {
      // 只有在precent变化的过程中并且不再拖动的过程中
      if (newPrecent >= 0 && !this.touch.initiated) {
        // 首先计算bar的宽度
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const offsetWidth = newPrecent * barWidth; // 得到偏移量
        this._offset(offsetWidth);
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable';
.progress-bar
  height: 30px;
  .bar-inner
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress
      position: absolute;
      height: 100%;
      background: $color-theme;
    .progress-btn-wrapper
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
</style>
