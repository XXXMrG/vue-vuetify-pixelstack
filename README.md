# vue-vuetify-pixelstack 项目梳理
#JavaScript/vue
- - - -

## 主要界面

![5cbeadca37494.png](https://i.loli.net/2019/04/23/5cbeadca37494.png)

![5cbeae0435e93.png](https://i.loli.net/2019/04/23/5cbeae0435e93.png)

![5cbeae59aad61.png](https://i.loli.net/2019/04/23/5cbeae59aad61.png)

## install

* make sure your node version 10.0+
* npm install
* npm run dev // 开发环境
* npm run build //构建生产环境，会在当前目录的 dist 文件夹下构建体积最小的生产版本，可以使用 serve 等本地服务工具直接部署访问



## 技术栈
* vue.js 核心框架
* vue-CLI 官方提供的脚手架工具，用于快速生成项目框架，方便项目配置和调试
* vuex 页面状态管理模块
* vue-router 路由模块
* axios 基于 promise 的 ajax 请求封装模块
* vuetify 一款基于 material design 的 vue 组件模版
* Element 一款国人开发的 vue 组件库
* webpack with vue 组件结构框架



## 难点

### UI 构建

#### 生命周期

在基础项目构建中我们主要打交道的两个生命周期钩子就是 `created`
和  `mounted`  二者在基本的页面渲染上的区别就是前者是发生在整个页面第一次渲染之前的，在这个钩子函数中，vue 会加载 data 中的数据，因此我们的 ajax 请求就应当再此时发起，保证需要伴随页面首次加载的数据的成功渲染。
而和 `mounted` 的触发时机是在 dom 渲染之前，是在 `created` 之后触发的，并且任何需要重新渲染的 dom 操作都会触发这个钩子，常用与那些与 	dom 改变相关的数据的处理过程。
关于更为详细的 vue 生命周期过程，可以参考官方给我们的这张图：

![5c82766077562.png](https://i.loli.net/2019/03/08/5c82766077562.png)

#### 栅格系统

vuetify 和 element 等组件库都有着和 Bootstrap 相似的栅格系统，利用栅格系统我们可以很快的构建一个页面的整体框架，同样 vuetify 对于屏幕像素大小的不同给出了构造响应式网站的 breakpoint，基本与 Bootstrap 有着相似的处理方式，即网页分割为 12 分等。

#### 动态路由

vue-router 的灵魂所在，可以完美的解决页面复用问题，同时也能实现在前端内部路由跳转时的参数传递。

#### 组件库的选择和使用

element 有着很好的易用性和部署上的优势，更是封装了上传组件这种复杂的组件。就是整个组件库的风格还是比较传统且老旧的素材和材质。
vuetify 由于遵守了 material design 风格，颜值和逼格都有优势，就是有的组件的构建过于繁琐，而且那个中英混搭的文档真的是反人类。


### 网络请求

#### axios 封装

axios 基本上是官方钦定的请求封装工具了，我们对于请求的封装完全参考了掘金上的一篇文章，该方案也是目前多数开发者较为认同的模块化封装方案，有利于功能模块化，提高 api 复用度，并且对拦截器做了较好的封装。

#### 跨域解决

chrome 是可以关闭跨域校验的，命令行启动的时候加个参数就行 —disabe-web-security

#### 请求头和参数序列化

主要是 json 类型数据的封装问题，需要前后端沟通好 json 格式。


## Reference


designed by https://github.com/creativetimofficial/vuetify-material-dashboard


[vue中Axios的封装和API接口的管理（更新） - 掘金](https://juejin.im/post/5b55c118f265da0f6f1aa354)

[Vue生命周期详解+对应代码解析 - 掘金](https://juejin.im/post/5aacfdfa51882555850753b5)

[自我理解——啃英文的vuetify（问题很多，有待验证）](https://xudany.github.io/vuetify/2017/09/15/%E8%87%AA%E6%88%91%E7%90%86%E8%A7%A3-%E5%95%83%E8%8B%B1%E6%96%87%E7%9A%84vuetify-%E9%97%AE%E9%A2%98%E5%BE%88%E5%A4%9A-%E6%9C%89%E5%BE%85%E9%AA%8C%E8%AF%81/)

[vuetify 栅格系统](https://vuetifyjs.com/zh-Hans/framework/grid-lists)

[HTTP访问控制（CORS） - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
