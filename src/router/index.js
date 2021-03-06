import Vue from 'vue';
import Router from 'vue-router';
import Rank from 'component/rank/rank';
import Recommend from 'component/recommend/recommend';
import Disc from 'component/disc/disc';
import Search from 'component/search/search';
import Singer from 'component/singer/singer';
import SingerDetail from 'component/singer-detail/singer-detail';
import TopList from 'component/top-list/top-list';

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
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
});
