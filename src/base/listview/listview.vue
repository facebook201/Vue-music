<template>
  <scroll class="listview"
          :data="data"
          ref="listview"
          :listenScroll="listenScroll"
          @scroll="scroll">
    <ul>
      <li v-for="group in data" :key="group.id" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img class="avatar" height="60" width="60" v-lazy="item.avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" class="item" :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script type="text/javascript">
  import Scroll from 'base/scroll/scroll';
  import { getData } from 'common/js/dom';

  // 定义锚点的高度 来计算到底有几个锚点
  const ANCHOR_HEIGHT = 18;

  export default {
    created() {
      // 创建两个函数共享的数据 但是不用vue来监听
      this.touch = {};
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      // 返回列表字母索引
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1);
        });
      }
    },
    components: {
      Scroll
    },
    methods: {
      onShortcutTouchStart(e) {
        // 获取右边锚索引 index
        let anchorIndex = getData(e.target, 'index');
        // 获取手指的位置
        let firstTouch = e.touches[0];
        // 开始y轴的位置
        this.touch.y1 = firstTouch.pageY;
        // 记录当前是第几个锚点 便于后面的计算
        this.touch.anchorIndex = anchorIndex;
        // 根据索引值将列表滚动到指定位置
        this._onScroll(anchorIndex);
      },
      onShortcutTouchMove(e) {
        // 通过滚动的差值来计算滚动到何处停止
        let firstTouch = e.touches[0];
        this.touch.y2 = firstTouch.pageY;
        // 得到偏移量 然后除以一个锚点的高度 得到偏移了几个锚点
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
        // 得到touchmove的index 开始加上锚点差
        let anchorIndex = this.touch.anchorIndex + delta;
        this._onScroll(anchorIndex);
      },
      _onScroll(index) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
      }
    }
  };
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .list-group-item
      display: flex;
      align-items: center
      padding: 20px 0 0 30px;
      .avatar
        display: block
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
  .list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-size: $font-size-small
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
    .current
      color: $color-theme
  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 30px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
