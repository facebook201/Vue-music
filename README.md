# vue-music

> 音乐播放器

#### 开发步骤

* 第一步初始化项目 安装好路由 注册路由 可以使用webpack配置好路径

* 第二部 引入组件 配置好路由
```javascript

import Router from 'vue-router';
import Singer from 'component/singer/singer'; // 歌手

Vue.use(Router); // 注册路由

export default new Router({
  routes: [
    {
      path: '/singer',
      component: Singer
    }
  ]
});
```

* 第三 写好路由导航栏
```HTML

  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/歌手">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/排行">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/搜索">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
<!-- router-link  有一个tag属性。这个属性值 决定router-link渲染成什么html标签。默认是a标签 -->
```




## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
