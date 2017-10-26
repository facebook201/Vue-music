<template>
  <div class="tab">
    <router-link tag="div" v-for="(item, index) of items" :key="item.value" class="tab-item" :to="item.link">
      <span class="tab-link">{{item.content}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          content: '推荐',
          link: '/recommend'
        },
        {
          content: '歌手',
          link: '/singer'
        },
        {
          content: '排行',
          link: '/rank'
        },
        {
          content: '搜索',
          link: '/search'
        }
      ]
    };
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';

  .tab
    display: flex
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.r
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>
