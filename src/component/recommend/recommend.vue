 <template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" ref="scroll" :data="discList">
      <div>
        <div v-if="recommend.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommend">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl"></img>
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item in discList" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <Loading></Loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import scroll from 'base/scroll/scroll';
import Slider from 'base/slider/slider';
import Loading from 'base/loading/loading';
import { getRecommend, getDiscList } from 'api/recommend';
import { ERR_OK } from 'api/config';
import {playlistMixin} from 'common/js/mixin';
import {mapMutations} from 'vuex';

export default {
  mixins: [playlistMixin],
  components: {
    Slider,
    scroll,
    // loading 根据返回歌单列表的数据 加载动画
    Loading
  },
  data() {
    return {
      recommend: [],
      discList: []
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList(); // 歌单列表
  },
  methods: {
    ...mapMutations({
      setDisc: 'SET_DISC'
    }),
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '';
      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    selectItem(item) {
      this.setDisc(item);
      this.$router.push({
        path: `/recommend/${item.dissid}`
      });
    },
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommend = res.data.slider;
        }
      });
    },
    // 歌单列表
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
        }
      });
    },
    loadImage() {
      // 这里还有一个点 就是 我们只要有一张图片加载了就不需要执行这个
      // 所以我们可以用一个变量来限制只执行一次
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
