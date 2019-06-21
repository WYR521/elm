<template>
  <div id="app">
      <div class="content">
        <transition name="router-fade" mode="out-in">
          <!-- <keep-alive> -->
            <router-view></router-view>
          <!-- </keep-alive> -->
        </transition>
      </div>
      <!-- <div class="footer"><com-footer></com-footer></div> -->
  </div>
</template>

<script>
// import foot from './components/footer/foot'
export default {
  name: 'App',
  // components:{
  //   ComFooter
  // }
}
</script>

<style lang="scss">
  @import './style/common'; //在css样式中在引入css样式
  .router-fade-enter-active,.router-fade-leave-active{
    transition: opacity 0.3s;
  }
  .router-fade-enter,.router-fade-leave-active{
    opacity:0;
  }
  *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  html,body,#app{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .content{
    width: 100%;
    flex: 1;
    overflow: auto;
  }
  .footer{
    height: 1rem;
    background: #fff;
  }
</style>
