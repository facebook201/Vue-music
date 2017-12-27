import Vue from 'vue';
import Router from 'vue-router';
import Rank from 'component/rank/rank';
import Recommend from 'component/recommend/recommend';
import Search from 'component/search/search';
import Singer from 'component/singer/singer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Recommend',
      component: Recommend
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer
    }
  ]
});
