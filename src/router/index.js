import Vue from 'vue';
import Router from 'vue-router';
import Rank from 'component/rank/rank';
import Recommonend from 'component/recommend/recommend';
import Search from 'component/search/search';
import Singer from 'component/singer/singer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: Recommonend
    },
    {
      path: '/recommonend',
      component: Recommonend
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
