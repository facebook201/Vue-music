<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from 'component/m-header/m-header';
import tab from 'component/table/table';

export default {
  name: 'app',
  components: {
    MHeader,
    tab
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable";

#app{
  color: $color-theme;
}
</style>
