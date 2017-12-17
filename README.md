# vue-music

Vue 开发的音乐播放器 A Vue.js project

#### 2017 8 25
Vue 脚手架安装

* sudo cnpm install -g vue-cli
* vue init webpack vue-music
* cd vue-music
* cnpm install
* cnpm run dev

## ESlint 配置

* 'semi': ['error','always'] // 必须加分号
* 'space-before-function-paren': 0 // 函数前面的括号的空格省略

### alias 别名路径配置
```javascript
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
alias: {
  'src': resolve('src'),
  'common': resolve('src/common') // 可以这样来配置路径 写成类似绝对路径
}
```

#### Vue 组件的一些小细节
* import进来的组件第一个字母大写且要注意驼峰 MHeader m-header

#### router-link
router-link 里面的tag 可以指定渲染成什么样的标签。 默认是a
```vue
<router-link tag="div" v-for="(item, index) of items" :key="item.value" class="tab-item" :to="item.link">
  <span class="tab-link">{{item.content}}</span>
</router-link>
```

#### router 路由
```javascript
routes: [
  {
    path: '/',
    redirect: Recommonend // 路由重定向 如果/ 就会自动跳到recommonend
  }
]
```

#### slot 插槽 Slider 组件里面的dom会插入到slot里面
```html
    <slider>
      <!-- 下面的内容会显示出来 -->
      <div class="slider">

      </div>
    </slider>
```
# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 源码目录
|   |—— api                                     // 后端请求相关代码
|   |—— base                                    // 基础组件
|   |—— common                                  // 通用文件
|   |   |—— fonts                               // 字体文件
|   |   |—— images                              // 图片
|   |   |—— js                                  // 脚本
│   ├── components                              // 组件
│   │  
│   │  
│   ├── router                                  // 路由
│   ├── store                                   // Vuex
│   |
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 环境切换配置
│   │   ├── fetch.js                            // 获取数据
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.
```
