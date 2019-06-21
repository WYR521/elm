<template>
  <div class="box">
    <div class="cen" ref="wrapper" >
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
            <ul v-if="list.length" type="1" class="mui-table-view mui-grid-view">
                <router-link tag="li" :to="'/details/'+$route.params.geohash+'/'+item.id" v-for="(item,index) in list" :key="index" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <div><img :src="'https://elm.cangdu.org/img/'+item.image_path"></div>
                    <div>
                        <p><span v-if="item.is_premium" class="s">品牌</span><span class="name">{{item.name}}</span> <span class="s1" v-if="item.is_new"><span>保</span> <span>准</span> <span>票</span></span></p>
                        <p>
                            <span class="star">
                                <span class="xing" :style="{width:`${100*item.rating/5}%`}"></span>
                            </span>
                                {{item.rating}}
                            <span class="s2" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span><span class="s3">准时达</span>月销售<span>{{item.recent_order_num}}</span>单</p>
                        <p>￥<span>{{item.float_minimum_order_amount}}</span>起送 / 配送费约￥<span>{{item.float_delivery_fee}}</span><span>{{item.distance}}</span>/<span>{{item.order_lead_time}}</span></p>
                    </div>
                </router-link>
            </ul>
            <ul v-else class="animation_opactiy">
                <li class="list_back_li" v-for="item in 10" :key="item">
                    <img src="../../image/shopback.svg" class="list_back_svg">
                </li>
            </ul>
            <div slot="bottom" class="mint-loadmore-bottom">
                <span v-if="show">loading...</span>
                <span v-else>没有数据了</span>
            </div>
        </mt-loadmore>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Loadmore } from 'mint-ui'
export default {
  data() {
    return {
      list: [],
      //可以进行上拉
      allLoaded: false,
      //是否自动触发上拉函数
      isAutoFill: false,
      show:true,
      n: 0
    };
  },
  created() {
    this.loadFrist();
  },
  mounted() {
//刚进入显示的数据
      this.axios
        .get("http://elm.cangdu.org/shopping/restaurants?latitude=39.78493&longitude=116.49476&offset=0&limit=8&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=")
        .then(response => {
            this.allLoaded = false; // 可以进行上拉
            this.list = response.data;
            // console.log(this.list)
            this.$refs.loadmore.onTopLoaded();
        })
  },
  methods: {
    //   下拉刷新
    loadTop() {
      this.loadFrist();
    },
    // 上拉加载
    loadBottom() {
      this.loadMore();
    },
    // 下来刷新加载
    loadFrist() {
        
    },
    // 加载更多
    loadMore() {// 
      this.n+=8;
      this.axios
        .get("http://elm.cangdu.org/shopping/restaurants?latitude=39.78493&longitude=116.49476&offset="+this.n+"&limit=8&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=")
        .then(response => {
            // concat数组的追加
            if(response.data.length<8){
                    this.show=false;
            }
            this.list = this.list.concat(response.data);
            console.log(this.list)
            this.$refs.loadmore.onBottomLoaded();
        })
        .catch(error => {
            console.log(error);
            alert("网络错误，不能访问");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
    .box{
        width: 100%;
        height: 100%;
        background: #fff;
        font-size: 0.4rem;
            .cen{
                background: #fff;
                overflow: scroll;
                ul{
                    width: 100%;
                    padding-top: 0.1rem;
                    font-size: 0.12rem;
                    li{
                        width: 100%;
                        display: flex;
                        padding: 0.3rem 0.2rem 0.2rem 0.2rem;
                        border-bottom: 1px solid #eee;
                        div:nth-of-type(1){
                            width: 20%;
                            img{
                                width: 1.2rem;
                            }
                        }
                        div:nth-of-type(2){
                            flex: 1;
                            p:nth-of-type(1){
                                position: relative;
                                display: flex;
                                .name{
                                    font-size: 0.25rem;
                                    font-weight: bold;
                                    width: 2.5rem;
                                    white-space: nowrap;
                                    overflow:hidden;
                                    text-overflow: ellipsis;
                                }
                                .s{
                                    display: inline-block;
                                    font-size: 0.2rem;
                                    background: #FED744;
                                    padding: 0.02rem 0.06rem;
                                    border-radius: 3px;
                                    margin-right: 0.04rem;
                                    transform:scale(0.8); 
                                }
                                .s1{
                                    position: absolute;
                                    right: 0.1rem;
                                    top: 0;
                                    transform:scale(0.9); 
                                    span{
                                        font-size: 0.2rem;
                                        display: inline-block;
                                        padding: 0.05rem;
                                        border: 0.01rem solid #F1F1F1;
                                        color:#999;
                                        transform:scale(0.8); 
                                        font-weight: initial;
                                        margin: -0.05rem;
                                    }
                                }
                            }
                            p:nth-of-type(2){
                                font-size: 0.18rem;
                                color:#797979;
                                margin-left: 0.05rem;
                                padding-top: 0.2rem;
                                position: relative;
                                .star{
                                    width: 1.2rem;
                                    height: 0.22rem;
                                    display: inline-block;
                                    background: url("https://img-bbs.csdn.net/upload/201510/22/1445523252_651795.png") no-repeat;
                                    background-size: 1.2rem 0.22rem;
                                    .xing{
                                        width: 1.2rem;
                                        height: 0.22rem;
                                        display: inline-block;
                                        background: url("https://img-bbs.csdn.net/upload/201510/22/1445523260_910443.png") no-repeat;
                                        background-size: 1.2rem 0.22rem;
                                    }
                                }
                                .s2{
                                    color: #fff;
                                    background: #3792E5;
                                    display: inline-block;
                                    padding: 0.03rem 0.05rem;
                                    border-radius: 0.03rem;
                                    position: absolute;
                                    left: 3.5rem;
                                    transform:scale(0.7); 
                                }
                                .s3{
                                    display: inline-block;
                                    padding: 0.02rem 0.05rem;
                                    border-radius: 0.03rem;
                                    color: #3792E5;
                                    border: 0.01rem solid #3792E5;
                                    position: absolute;
                                    right: 0rem;
                                    transform:scale(0.7); 
                                }
                            }
                            p:nth-of-type(3){
                                font-size: 0.18rem;
                                color:#797979;
                                margin-left: -0.25rem;
                                padding-top: 0.1rem;
                                transform:scale(0.9);
                                position: relative; 
                                span:nth-of-type(3){
                                    color:#999999;
                                    padding-left: 0.68rem;
                                }
                                span:nth-of-type(4){
                                    color:#3792E5;
                                    position:absolute;
                                    right: -0.15rem;
                                }
                            }
                        }
                    }
                }
            }
        }

</style>
