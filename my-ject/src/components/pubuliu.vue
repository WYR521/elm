<template>
  <!-- <div class="waterfall-wrapper">
    <ul class="left-waterfall" ref="left">
        <li class="item" v-for="(item, index) in leftItems" >
            <img :src='item.src' alt="">
            {{ index }}
        </li>
    </ul>
    <ul class="right-waterfall" ref="right">
        <li class="item" v-for="(item, index) in rightItems" >
            {{ index }}
            <img :src='item.src' alt="">
            <img src='../image/img/1.png' alt="">
        </li>
    </ul>
  </div> -->
  <div>
    <div id="ball" @click="newBall($event)"></div>
    <div class="shopping_footer"></div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      // data: [
      //   {height: 100,src:'../image/img/1.png'},
      //   {height: 110,src:'../image/img/10.png'},
      //   {height: 150,src:'../image/img/11.png'},
      //   {height: 200,src:'../image/img/12.png'},
      //   {height: 300,src:'../image/img/15.png'},
      //   {height: 100,src:'../image/img/15.png'},
      //   {height: 222,src:'../image/img/15.png'},
      //   {height: 111,src:'../image/img/15.png'},
      //   {height: 123,src:'../image/img/15.png'},
      //   {height: 451,src:'../image/img/15.png'},
      // ],
      // leftItems: [],
      // rightItems: []
    }
  },
  // mounted () {
  //   // TODO GET DISPLAY_DATA
  //   this.updateWaterfall()
  // },
  methods: {
    newBall(event){//当前点击的元素
      let div=document.createElement('div');
      div.className='ballFather';
      document.body.appendChild(div);

      let sonDiv=document.createElement('div');
      sonDiv.className='ballSon';
      div.appendChild(sonDiv);


      let top=event.target.getBoundingClientRect().top;//获得 跳动小球top
      let left=event.target.getBoundingClientRect().left;//获得 left
      div.style.left=left+'px';
      div.style.top=top+'px';

      let y = (window.innerHeight - top);// 下落的高度
      // div.style.display ='';
      div.style.webkitTransform = `translate3d(0,${y}px,0)`;
      div.style.transform = `translate3d(0,${y}px,0)`;

      sonDiv.style.webkitTransform = `translate3d(-${left-10}px,0,0)`;
      sonDiv.style.transform = `translate3d(-${left-10}px,0,0)`;
      //保证 小球运动结束后，调用购物车的动画

      setTimeout(()=>{
        // document.body.removeChild(div);
        document.querySelector('.shopping_footer').classList.add("animation");
        setTimeout(()=>{
          document.querySelector('.shopping_footer').classList.remove("animation");
        },400)
      },620)
    }
    // updateWaterfall () {
    //   const leftHeight = this.$refs.left.clientHeight
    //   const rightHeight = this.$refs.right.clientHeight
    // //   console.log(leftHeight)
    // //   console.log(rightHeight) 
    //   let item = this.data.shift()
      
    //   if (item == null) {
    //     return
    //   }
    //   if (leftHeight <= rightHeight) {
    //     this.leftItems.push(item)
    //   }
    //   else {
    //     this.rightItems.push(item)
    //   }
    //   this.$nextTick(function () {
    //     // console.log('进来了')
    //     this.updateWaterfall()
    //   })
    // }
  }
}
</script>


<style scoped>
    #ball{
      width: 100px;
      height: 100px;
      background: #3190e8;
      border-radius: 50%;
      margin: 100px auto;
    }
    .shopping_footer{
      width: 100px;
      height: 100px;
      background-color: plum
    }
    .ballFather{
      position: absolute;
      width: 0.2rem;
      height:0.2rem;
      border-radius: 50%;
      transition: all  0.6s cubic-bezier(1, -0.5, 1, 1);
    }
    .ballSon{
      width: 0.533333rem;
      height: 0.533333rem;
      background: #3190e8;
      border-radius: 50%;
      transition:all 0.6s linear;
    }
    @keyframes ani{
      0%{transform: scale(0)}
      20%{transform: scale(1.2)}
      40%{transform: scale(.8)}
      80%{transform: scale(1.1)}
      100%{transform: scale(1)}
    }
    .animation{
      animation: ani .4s linear;
    }
    /* .waterfall-wrapper{
        overflow: auto;
        height: 100%;
        width: 100%;
    }
    ul {
        width: 40%
    }
    ul.left-waterfall {
        float: left;
        list-style:none;
    }
    ul.right-waterfall {
        float: right;
        list-style:none;
    }
    li.item {
        width: 100%;

    }
    li.item img{
        width:100%;
        height: 100%;
    } */

</style>