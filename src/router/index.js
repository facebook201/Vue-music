import Vue from 'vue';
import Router from 'vue-router';
import Recommend from 'component/recommend/recommend';
import Rank from 'component/rank/rank';
import Search from 'component/search/search';
import Singer from 'component/singer/singer';

Vue.use(Router); // 注册路由

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend' // 默认初始化启动的时候进入到这个路径 优化方案
    },
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
