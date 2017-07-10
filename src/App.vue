<template>
  <div id="app">
    <m-header></m-header>
  </div>
</template>

<script>
import MHeader from 'component/m-header/m-header';

export default {
  name: 'app',
  components: {
    MHeader
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable";

#app{
  color: $color-theme;
}
</style>
