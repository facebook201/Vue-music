<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'component/m-header/m-header';
import Tab from 'component/table/table';
import Player from 'component/player/player';

export default {
  components: {
    MHeader,
    Tab,
    Player
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/variable';

#app
  color: $color-theme;
</style>
