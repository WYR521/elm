import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

// const a = resolve => require(['../components/HelloWorld.vue'],resolve)
const login = resolve => require(['../page/Login/Login.vue'],resolve)               //登录页
const content = resolve => require(['../page/Content.vue'],resolve)         //信息页
const home = resolve => require(['../page/Home/Home.vue'],resolve)               //首页
const userlist = resolve => require(['../page/Message/Data/Userlist.vue'],resolve)             //用户列表
const shoplist = resolve => require(['../page/Message/Data/Shoplist.vue'],resolve)             //商品列表
const foodlist = resolve => require(['../page/Message/Data/Foodlist.vue'],resolve)             //食品列表
const orderlist = resolve => require(['../page/Message/Data/Orderlist.vue'],resolve)             //订单列表
const adminlist = resolve => require(['../page/Message/Data/Adminlist.vue'],resolve)             //管理员列表

const adminset = resolve => require(['../page/Message/Set/adminSet.vue'],resolve)             //管理员设置
const explain = resolve => require(['../page/Message/Explain/explain.vue'],resolve)             //说明
 
Vue.use(Router)

export default new Router({
  routes: [{
    path:'/',
    component:App,  //经层路由，对应index
    children:[  //二级路由 对应App.vue
      //地址为空时跳转到首页
      {  //首页登录
        path: '',
        redirect: '/login'
      },
      {  //首页登录
        path: '/login',
        name:"login",
        component: login
      },
      {  //信息页
        path: '/content',
        name:"content",
        component: content,
        redirect:'/home',
        children:[
          {  //首页
            path: '/home',
            name:"home",
            component: home
          },
          {  //用户列表
            path: '/userlist',
            name:"userlist",
            component: userlist
          },
          {  //商品列表
            path: '/shoplist',
            name:"shoplist",
            component: shoplist
          },
          {  //食品列表
            path: '/foodlist',
            name:"foodlist",
            component: foodlist
          },
          {  //订单列表
            path: '/orderlist',
            name:"orderlist",
            component: orderlist
          },
          {  //管理员列表
            path: '/adminlist',
            name:"adminlist",
            component: adminlist
          },
          {  //管理员设置
            path: '/adminset',
            name:"adminset",
            component: adminset
          },
          {  //说明
            path: '/explain',
            name:"explain",
            component: explain
          }
        ]
      },
      
    ]
  }]
})
