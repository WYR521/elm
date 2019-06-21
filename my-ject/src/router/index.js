import Vue from 'vue'
import Router from 'vue-router'

import App from '../App'

//路由懒加载 按需加载 两种方法
// const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const take = resolve => require(['../page/home/take'],resolve)   //首页
const search = resolve => require(['../page/home/search'],resolve)   //搜索
const indent = resolve => require(['../page/home/indent'],resolve)   //订单
const user = resolve => require(['../page/home/user'],resolve)     //我的
const search2 = resolve => require(['../page/search/search2'],resolve)   //搜索2
const details = resolve => require(['../page/search/details'],resolve)   //详情页
const place = resolve => require(['../page/city/place'],resolve)       //城市
const address = resolve => require(['../page/city/address'],resolve)    //地址

const login = resolve => require(['../page/login/login'],resolve)    //登录
const forget = resolve => require(['../page/login/forget'],resolve)    //重置密码
const message = resolve => require(['../page/login/message'],resolve)    //用户信息
const adress = resolve => require(['../page/login/adress'],resolve)    //编辑地址
const add = resolve => require(['../page/login/add'],resolve)    //新增地址
const addDetail = resolve => require(['../page/login/addDetail'],resolve)    //搜索地址
const name = resolve => require(['../page/login/name'],resolve)    //修改用户名

const pubuliu = resolve => require(['../components/pubuliu.vue'],resolve)    //修改用户名
Vue.use(Router)

export default new Router({
  routes: [{
    path:'/',
    component:App,  //经层路由，对应index
    children:[  //二级路由 对应App.vue
      //地址为空时跳转到首页
      {  //首页
        path: '',
        redirect: '/place'
      },
      {  //首页
        path: '/take/:geohash',
        name:"take",
        component: take
      },
      { //搜索
        path: '/search/:geohash',
        name:"search",
        component: search
      },
      { //订单
        path: '/indent',
        name:"indent",
        component: indent
      },
      {  //我的
        path: '/user',
        name:"user",
        component: user
      },
      {  //搜索2
        path: '/search2',
        name:"search2",
        component: search2
      },
      {  //详情
        path: '/details/:geohash/:id',
        name:"details",
        component: details
      },
      {  //城市
        path: '/place',
        name:"place",
        component: place
      },
      {  //地址
        path: '/address/:id',
        name:"address",
        component: address
      },
      {  //登录
        path: '/login',
        name:"login",
        component: login
      },
      {  //重置密码
        path: '/forget',
        name:"forget",
        component: forget
      },
      {  //用户信息
        path: '/message',
        name:"message",
        component: message
      },
      {  //编辑地址
        path: '/adress',
        name:"adress",
        component: adress
      },
      {  //新增地址
        path: '/add',
        name:"add",
        component: add
      },
      {  //搜索地址
        path: '/addDetail',
        name:"addDetail",
        component: addDetail
      },
      {  //修改用户名
        path: '/name',
        name:"name",
        component: name
      },
      {  //瀑布流事件
        path: '/pubuliu',
        name:"pubuliu",
        component: pubuliu
      }
    ]
  }]
})
