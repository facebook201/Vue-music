<template>
  <scroll class="suggest"
          :data="result"
          @scrollToEnd="searchMore"
          :pullup="pullup"
          ref="suggest"
          :beforeScroll="beforeScroll"
          @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无数据"></no-result>
    </div>
  </scroll>
</template>

<script>
import {search} from 'api/search';
import {ERR_OK} from 'api/config';
import {createSong} from 'common/js/song';
import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading';
import Singer from 'common/js/singer';
import {mapMutations, mapActions} from 'vuex';
import NoResult from 'base/no-result/no-result';

const TYPE_SINGER = 'singer';
const perPage = 20;

export default {
  components: {
    Scroll,
    Loading,
    NoResult
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      // 标志位 是否加载完
      hasMore: true,
      beforeScroll: true
    };
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ]),
    // scroll 组件滚动之前派发出来的
    listScroll() {
      this.$emit('listScroll');
    },
    // 下拉查询更多信息
    searchMore() {
      if (!this.hasMore) {
        return '';
      }
      // 每次下拉一次 page页数就加1
      this.page++;
      search(this.query, this.page, this.showSinger, perPage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._getResult(res.data));
          // 每次拿到结果的时候检查是否加载完毕
          this._checkMore(res.data);
        }
      });
    },
    selectItem(item) {
      // 跳到歌手详情页面
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        });
        // 设置歌手的信息
        this.$router.push({
          path: `/search/${singer.id}`
        });
        this.setSinger(singer);
      } else {
        this.insertSong(item);
      }
      // 插入列表之后 派发一个事件出去 保存搜索历史
      this.$emit('select');
    },
    getIconClass(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine';
      } else {
        return 'icon-music';
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.name}-${item.singer}`;
      }
    },
    _search() {
      this.page = 1;
      this.hasMore = true;
      // 第一次
      this.$refs.suggest.scrollTo(0, 0);
      search(this.query, this.page, this.showSinger, perPage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this._getResult(res.data);
          // 每次拿到结果的时候检查是否加载完毕
          this._checkMore(res.data);
        }
      });
    },
    _checkMore(data) {
      const song = data.song;
      // 如果歌曲的列表为0 或者 列表的数据全部加载完毕 标志信息则为false
      if (!song.list.length || (song.curnum + song.curpage * perPage) > song.totalnum) {
        this.hasMore = false;
      }
    },
    _getResult(data) {
      let ret = [];
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}});
      }
      if (data.song) {
        ret = ret.concat(this._normalize(data.song.list));
      }
      return ret;
    },
    _normalize(list) {
      let ret = [];
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  watch: {
    query() {
      this._search();
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
