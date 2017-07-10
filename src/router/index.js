import Vue from 'vue';
import Router from 'vue-router';
import Recommend from 'component/recommend/recommend'; // 推荐
import Rank from 'component/rank/rank'; // 排行
import Search from 'component/search/search'; // 搜索
import Singer from 'component/singer/singer'; // 歌手

Vue.use(Router); // 注册路由

export default new Router({
  routes: [
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
});
