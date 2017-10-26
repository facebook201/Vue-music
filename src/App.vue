<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from 'component/m-header/m-header';
import Tab from 'component/table/table';

export default {
  components: {
    MHeader,
    Tab
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/variable';

#app
  color: $color-theme;
</style>
