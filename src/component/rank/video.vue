<template>
  <div ref="play">
    排行界面
  </div>
</template>

<script>
import ChimeeMobilePlayer from 'chimee-mobile-player';

export default {
  name: 'rank',
  methods: {
    _initPlay() {
      this.play = new ChimeeMobilePlayer({
        wrapper: this.$refs.play,
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        autoplay: true,
        controls: true
      });
    }
  },
  mounted() {
    this._initPlay();
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
