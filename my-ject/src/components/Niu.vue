<template>
  <div class="layout">
     <header>
            <ul>
                <li>
                    <div>
                        <a @click='$router.go(-1)'>
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                <polyline points="12,18 4,9 12,0" style="fill: none; stroke: rgb(255, 255, 255); stroke-width: 2;"></polyline>
                            </svg>
                        </a>
                        <img :src="'https://elm.cangdu.org/img/'+headList.image_path" alt="">
                    </div>
                    <div>
                        <p>{{headList.name}}</p>
                        <p>商家配送/分钟送到/配送费￥{{headList.float_delivery_fee}}
                            <span class="f">
                                <svg data-v-c8684834="" width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
                                    <path data-v-c8684834="" d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none"></path>
                                </svg>
                            </span>
                        </p>
                        <p>公告：{{headList.promotion_info}}</p>
                    </div>
                </li>
            </ul>
            <!-- <p class="pp" v-if="headList.activities!=''">
              <span class="ss">{{headList.activities[0].icon_name}}</span>
              {{headList.activities[0].description}}(APP专享)
            </p> -->
      </header>
    <!-- S tab -->
      <div class="tab">
        <div v-for="(item, index) in tabList" :class="['tab-item']" :key="index">
          <router-link to="" :class="{'link':index == pageNum}">
            {{item}}
          </router-link>
        </div>
      </div>
    <!-- <div class="cc">
      <div class="nav">
        <ul>
          <li v-on:click="shopNav=true"  ><span :class="{active:shopNav}">商品</span></li>
          <li v-on:click="shopNav=false"  ><span :class="{active:!shopNav}">评价</span></li>
        </ul>
      </div> -->
    <!-- E tab -->

    <!-- S 内容区域 -->
    
      <!-- <div class="content1"  v-if="shopNav">  -->
        <div class="content1"> 
        <!-- S 左侧边栏 -->
          <div class="menu-wrapper" ref="menuWrapper">
            <ul>
              <li v-for="(item, index) in goodList" class="menu-item border-1px" :class="{current:currentIndex == index}" @click="selectMenu(index, $event)" :key="index">
                {{item.name}}
                <!-- <span class="text"> -->
                  <!-- <span v-show="item.type>0" :class="classMap[item.type]"></span> -->
                <!-- </span> -->
              </li>
            </ul>
          </div>
        <!-- E 左侧边栏 -->
        
        <!-- S 右侧边栏 -->
          <div class="foods-wrapper" ref="foodWrapper">
            <ul>
              <li v-for="(item,call) in goodList" class="food-list food-list-hook" :key="call">
                <p class="title"><span class="s">{{item.name}}</span>{{item.description}}</p>
                <ul>
                  <li v-for="(food,inl) in item.foods" class="food-item" @click="selectFood(food, $event)" :key="inl">
                    <div class="icon">
                      <img :src="'http://elm.cangdu.org/img/'+food.image_path" width="57px">
                    </div>
                    <div class="content">
                      <h2 class="name">{{food.name}}</h2>
                      <p class="desc">{{food.description}}</p>
                      <div class="extra">
                        <span class="count">月售{{food.month_sales}}</span><span class="count">好评率{{food.satisfy_rate}}%</span>
                      </div>
                      <div class="price">
                        <span class="now">￥{{food.specfoods[0].price}}</span>
                        <span v-if="food.specifications!=''" class="gui">选规格</span>
                        <span v-else class="jia">+</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        <!-- E 右侧边栏 -->
      </div>
      <!-- <div class="content2" v-if="!showNav">评价</div> -->
    </div>
    <!-- E 内容区域 -->
</template>

<script>
import BScroll from 'better-scroll' // 使用better-scrol实现滑动
  export default {
    data () {
      return {
        tabList: ['商品', '评价'],
        pageNum: 0,
        listHeight: [],
        scrolly: 0, // 滚动处始值
        headList:[],
        goodList:[],
        currentIndex:0,
        active:'',
        // shopNav:true
      }
    },
    mounted(){
        this.axios
        .get("http://elm.cangdu.org/shopping/restaurant/"+this.$route.params.id+"?latitude=45.80031&longitude=126.50329&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics")
        .then(res=>{
            if(res.data){
                this.headList=res.data
            }
        })
        this.axios
        .get("http://elm.cangdu.org/shopping/v2/menu?restaurant_id="+this.$route.params.id)
        .then(res=>{
            if(res.data){
                this.goodList=res.data
            }
        })
    },
    created () {
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(()=> {
        this._initScroll()
        this._calculateHeight()
      })

      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    computed: {
      currentIndex () { //计算到达哪个区域的区间的时候的对应的索引值
        for(let i = 0; i < this.listHeight.length; i++) { 
          let height = this.listHeight[i] //当前menu子块的高度
          let height2 = this.listHeight[i+1] //下一个menu子块的高度
          //滚动到底部的时候,height2为undefined,需要考虑这种情况
          //需要确定是在两个menu子块的高度区间
          if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
            return i; //返回这个menu子块的索引
          }
        }
        return 0;
      }
    },
    methods: {
      //初始化scroll区域
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true //结合BScroll的接口使用,是否将click事件传递,默认被拦截了
        })
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3, //结合BScroll的接口使用,3实时派发scroll事件，探针的作用
          click: true
        })
        //结合BScroll的接口使用,监听scroll事件(实时派发的),并获取鼠标坐标，当滚动时能实时暴露出scroll
        this.foodScroll.on('scroll', (pos) => {
          this.scrolly = Math.abs(Math.round(pos.y))  //滚动坐标会出现负的,并且是小数,所以需要处理一下，实时取得scrollY
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')  //获取每一个food的dom对象
        let height = 0;
        this.listHeight.push(height)  //初始化第一个高度为0
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i] //每一个item都是刚才获取的food的每一个dom
          height += item.clientHeight //主要是为了获取每一个foods内部块的高度
          this.listHeight.push(height)
        }
      },
      selectMenu (index, event) {
         if (!event._constructed) { //去掉自带的click事件点击，即pc端直接返回
          return;
        }
        // debugger;
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
         //类似jump to的功能,通过这个方法,跳转到指定的dom
        this.foodScroll.scrollToElement(el, 300);
        this.currentIndex=index;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    width: 100%;
    header{
            width: 100%;
            height: 2rem;
            background-color:#AB99C9;
            ul{
                width: 100%;
                li{
                    width: 100%;
                    display: flex;
                    div:nth-of-type(1){
                        width: 25%;
                        position: relative;
                        a{
                            font-size: 0.5rem;
                            color: #fff;
                            position: absolute;
                            top: 0.1rem;
                        }
                        img{
                            width: 1.3rem;
                            margin-left: 0.2rem;
                            margin-top: 0.2rem;
                        }
                    }
                    div:nth-of-type(2){
                        flex: 1;
                        p{
                            color:#fff;
                            font-size: 0.2rem;
                        }
                        p:nth-of-type(1){
                            font-size: 0.4rem;
                            font-weight: bold;
                            padding-top: 0.2rem;
                        }
                        p:nth-of-type(2){
                            position: relative;
                            padding-top: 0.1rem;
                            .f{
                                font-size: 0.3rem;
                                color: #fff;
                                position: absolute;
                                top: -0.05rem;
                                right: 0.3rem;
                            }
                        }
                        p:nth-of-type(3){
                            padding-top: 0.1rem;
                        }
                    }
                }
            }
            .pp{
                font-size: 0.2rem;
                color:#fff;
                padding-left: 0.1rem;
                margin-top: -0.1rem;
                .ss{
                    display: inline-block;
                    color: #fff;
                    background: #F07373;
                    padding: 0.03rem 0.05rem;
                    transform:scale(0.9); 
                    margin-right: 0.1rem;
                }
            }
        }
    .tab {
      width: 100%;
      height: 0.8rem;
      display: flex;
      background-color: #fff;
      font-size: 0.2rem;
      .tab-item {
        flex: 1;
        align-self: center; // 弹性子元素剧中
        text-align: center;
        a {
          color: black;          
          text-decoration: none;
          -webkit-tap-highlight-color:rgba(0,0,0,0); // 去除a标签点击时高亮背景
          &.link {
            color:#3792E5;
          }
        }
      }
    }
    // .cc{
    //   width: 100%;
    //   flex: 1;
    //   display: flex;
    //   flex-direction: column;
      // .nav{
      //   width:100%;
      //   height: 0.8rem;
      //   display: flex;
      //   border-bottom: 0.01rem solid #EBEBEB;
      //   background: #fff;
      //   ul{
      //     width: 100%;
      //     display: flex;
      //     list-style: none;
      //     li{
      //       flex: 1;
      //       text-align: center;
      //       line-height: 0.8rem;
      //       font-size: 0.25rem;
      //       color:#828282;
      //       }
      //       .active{
      //         color:#3792E5;
      //         border-bottom: 0.05rem solid #3792E5;
      //         }
      //       }
      //     }
        .content1 {
          display: flex;
          position: absolute;
          top: 50px;
          bottom: 46px;
          width: 100%;
          overflow: hidden;
          top:150px;
          background: #fff;
          overflow: auto;
          .menu-wrapper {
            width: 100px;
            background: #F5F5F5;
            .menu-item {
              display: table;
              width: 100px;
              height: 54px;
              line-height: 14px;
              padding-left: 12px;
              font-size: 15px;
              line-height: 54px;
              border-top: 1px solid #EDEDED;
          // &.current {
          //   position: relative;
          //   background: #fff;
          //   border-left:0.05rem solid #3792E5;
          //   .text {
          //     font-size: 0.25rem;
          //     font-weight: bold;
          //     &:after{
          //       display: none
          //     }
          //   }
          // }
          // .icon {
          //   display: inline-block;
          //   width: 12px;
          //   height: 12px;
          //   vertical-align: top;
          //   margin-right: 4px;
          //   background-size: 12px 12px;
          //   background-repeat: no-repeat;
          //   &.decrease {
          //     background-image: url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg);
          //   }
          //   &.discount {
          //     background-image: url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044191397,2911599132&fm=27&gp=0.jpg);

          //   }
          //   &.guarantee {
          //     background-image: url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1944805937,3724010146&fm=27&gp=0.jpg);
              
          //   }
          //   &.invoice {
          //     background-image: url(https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=147015573,3182587356&fm=27&gp=0.jpg);

          //   }
          //   &.special {
          //     background-image: url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1046983545,2051560208&fm=27&gp=0.jpg);

          //   }
              
          // }
          // .text {
          //   display: table-cell;
          //   width: 56px;
          //   vertical-align: middle;
          //    position: relative;
          //    font-size: 12px;  
          //   &:after {
          //     display: block;
          //     position: absolute;
          //     left: 0;
          //     bottom: 0;
              
          //     width: 100%;
          //     content: '';
          //   }
          // }
        }
        .current {
            position: relative;
            background: #fff;
            border-left:0.05rem solid #3792E5;
            .text {
              font-size: 0.25rem;
              font-weight: bold;
              &:after{
                display: none
              }
            }
          }
      }
     .foods-wrapper {
       flex: 1;
       .food-list {
         .title {
            padding-left: 14px;
            height: 45px;
            line-height: 45px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147, 153, 159);
            background: #f3f5f7;
            .s{
              font-size: 0.3rem;
              font-weight: bold;
              color: #666;
              margin-right: 0.1rem;
            }
         }
         .food-item {
           display: flex;
            padding: 10px;
            padding-bottom: 18px;
            border-bottom:0.01rem solid #f5f5f5;
            &:after {
              display: block;
              position: absolute;
              left: 0;
              bottom: 0;
              border-top: 1px solid orangered;
              width: 100%;
              content: '';
            }
            &:last-child {
              &:after{
                display: none
              }
            }
            .icon {
              flex: 0 0 57px;
              margin-right: 10px;
            }
            .content {
              flex: 1;
              .name {
                margin: 2px 0 8px 0;
                font-size: 14px;
                line-height: 14px;
                height: 14px;
                color: rgb(7, 17, 27);
              }
              .desc, .extra {
                font-size: 10px;
                line-height: 10px;
                color: rgb(147, 153, 159);
              }
              .desc {
                 margin-bottom: 8px;
                 line-height: 12px;
              }
              .extra {
                .count {
                  margin-right: 12px;
                }
              }
              .price {
                  font-weight: 700px;
                  line-height: 24px;
                  .now {
                     padding-right: 8px;
                     font-size: 14px;
                     color: rgb(240, 20, 20);
                  }
                .old {
                  font-size: 10px;
                  color: rgb(147, 153, 159);
                  text-decoration: line-through;
                }
                .gui{
                    display: inline-block;
                    color: #fff;
                    background: #3792E5;
                    padding:0rem 0.06rem;
                    border-radius: 0.05rem;
                    float: right;
                    margin-right: 0.1rem;
                    font-size: 0.2rem;
                    margin-top: 0.3rem;
                    }
                .jia{
                      color: #fff;
                      background: #3792E5;
                      padding: 0rem 0.11rem 0.03rem 0.11rem;
                      border-radius: 50%;
                      float: right;
                      margin-right: 0.2rem;
                      font-size: 0.3rem;
                      margin-top: 0.3rem;
                    }
                  
              }
              .cartControl-wrapper {
                  position: absolute;
                  right: 0;
                  bottom: 12px;
              }
            }
         }
       }
     }
    }
    // }
  }
</style>