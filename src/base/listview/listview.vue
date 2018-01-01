<template>
  <scroll class="listview"
          :data="data"
          ref="listview"
          :listenScroll="listenScroll"
          @scroll="scroll"
          :probeType="probeType">
    <ul>
      <li v-for="group in data" class="list-group" :key="group.id" ref="listgroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" :key="item.id" class="list-group-item">
            <img class="avatar" height="60" width="60" v-lazy="item.avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList"
            :key="item.id"
            class="item"
            :class="{'current': currentIndex === index}"
            :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>

    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div class="loading-container" v-show="!data.length">
      <Loading></Loading>
    </div>
  </scroll>
</template>

<script type="text/javascript">
  import Scroll from 'base/scroll/scroll';
  import Loading from 'base/loading/loading';
  import { getData } from 'common/js/dom';

  // 定义锚点的高度 来计算到底有几个锚点
  const ANCHOR_HEIGHT = 18;
  const TITLE_HEIGHT = 30;

  export default {
    created() {
      // 创建两个函数共享的数据 但是不用vue来监听
      this.touch = {};
      this.listenScroll = true;
      this.listHeight = [];
      this.probeType = 3;
    },
    data() {
      return {
        // listview组件滚动时Y轴的变化 从子组件的BScroll派发出来
        scrollY: -1,
        // 保存滚动到哪个区间 然后使用这个值来跟右侧栏比较 显示高亮字母
        currentIndex: 0,
        diff: -1
      };
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
      },
      //
      fixedTitle() {
        if (this.scrollY > 0) {
          return '';
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
      }
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
        let anchorIndex = parseInt(this.touch.anchorIndex, 10) + delta;
        this._onScroll(anchorIndex);
      },
      // 子组件派发出来的
      scroll(pos) {
        this.scrollY = pos.y;
      },
      _onScroll(index) {
        // 如果点击边界区块
        if (!index && index !== 0) {
          return;
        }
        // 滚动到顶部
        if (index < 0) {
          index = 0;
          // 滚动到底部
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2;
        }
        this.scrollY = -this.listHeight[index];
        // 第二个参数是要不要有动画的时间
        this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 0);
      },
      // 计算每个group的高度
      _calculateHeight() {
        this.listHeight = [];
        // lisgroup的集合
        const list = this.$refs.listgroup;
        // 设置初始高度为0
        let height = 0;
        this.listHeight.push(height);

        for (let i = 0, len = list.length; i < len; i++) {
          let item = list[i];
          height += item.clientHeight;
          // 把每个区块的高度保存下来
          this.listHeight.push(height);
        }
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight();
        }, 20);
      },
      diff(newVal) {
        // 只有当差值在title高度之间是 才会操作g改变偏移量
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
        // 这里表示如果没有在此范围之内 就不要操作dom 优化部分
        if (this.fixedTop === fixedTop) {
          return;
        }
        this.fixedTop = fixedTop;
        // 开启加速 把title慢慢的过渡上去
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`;
      },
      // 时刻观测者scrollY的变化
      scrollY(newY) {
        const listHeight = this.listHeight;
        // 滚动到顶部 newY > 0
        if (newY > 0) {
          this.currentIndex = 0;
          return;
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length; i++) {
          let height1 = listHeight[i];
          let height2 = listHeight[i + 1];
          // 当向上滚动的时候newY就是负值
          if (!height2 || (-newY >= height1 && -newY < height2)) {
            // 如果落在height2 和 -1之间
            // 那个区间的索引
            this.currentIndex = i;
            this.diff = height2 + newY;
            return;
          }
        }
        // 滚动到底部 且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2;
      }
    },
    components: {
      Scroll,
      Loading
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
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%
</style>
