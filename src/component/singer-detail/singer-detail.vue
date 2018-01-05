<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSingerDetail } from 'api/singer';
import { ERR_OK } from 'api/config';
import { createSong } from 'common/js/song';
import MusicList from '@/component/music-list/music-list';

export default {
  data() {
    return {
      songs: []
    };
  },
  computed: {
    // props 名字
    title() {
      return this.singer.name;
    },
    // 背景图
    bgImage() {
      return this.singer.avatar;
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      // 因为vuex刷新之后数据会丢失 所以如果直接进入
      if (!this.singer.id) {
        // 没有id 就直接回退到此路由
        this.$router.push('/singer');
        return;
      }
      // 通过vuex 获取了singerid
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list);
          console.log(this.songs);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((item) => {
        let {musicData} = item;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slide-enter-active,.slide-leave-active
  transition: all .3s;
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
