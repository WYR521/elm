<template>
    <div class="box">
        <ant v-if="aa!=1"></ant>
        <head-top :headTitle="geohash.name" :signinUp="true" class="header2">
            <router-link tag='span' to='/search/geohash' class="logo" slot='logo'><i class="fa fa-fw fa-search"></i></router-link>
        </head-top>
        <div class="center">
            <div class="nav" v-if="flags.length">
                <div class="swiper-container" >
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in flags" :key="index">
                            <ul>
                                <router-link tag="li" to="/" v-for="(fooditem,index) in item" :key="index">
                                    <img :src="'https://fuss10.elemecdn.com'+fooditem.image_url" >
                                    <span>{{fooditem.title}}</span>
                                </router-link>
                            </ul>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <ul v-else class="animation_opactiy">
                <li class="list_back_li" v-for="item in 1" :key="item">
                    <img src="../../image/img/fl.svg" class="list_back_svg">
                </li>
            </ul>
            <p class="title">
                <img src="../../image/img/11.png" alt="">
                <span>附近商家</span>
            </p>
            <con-tent></con-tent>
        </div>
        <foot></foot>
    </div>
    
</template>

<script>
import axios from 'axios'
import headTop from '../../components/header/head'
import foot from '../../components/footer/foot'
import ConTent from '../../components/comm/centent'

import Swiper from 'swiper'
import swiperr from '../../config/swiper.min.js'
import swiperrr from '../../style/swiper.min.css'
import ant from '../../components/animeta'
export default {
    components:{
        headTop,
        foot,
        ConTent,
        ant
    },
    data(){
        return{
            flags:[],
            geohash:'',
            headTitle:"'请选择地址...'",
            aa:1
        }
    },
    mounted(){
        this.aa=this.aa-1;
        axios.get('http://elm.cangdu.org/v2/index_entry?geohash='+this.$route.params.geohash+'&group_type=1&flags')
        .then(res=>{
            this.aa=this.aa+1;
            if(res.data){
                let len=res.data.length;
                let resArr=res.data;
                let foodArr=[];
                for(let i=0,j=0;i<len;i+=8,j++){ //一共16个数据  循环2次
                    foodArr[j]=resArr.splice(0,8)
                }
                this.flags=foodArr;
                console.log(this.flags)
            }
        })
        .then(()=>{
            new Swiper('.swiper-container',{
                pagination:{
                    el:".swiper-pagination"
                },
                autoplay:true,
                loop:true,
                autoplay:{
                    delay:1500
                }
            })
        })

        axios.get('http://elm.cangdu.org/v2/pois/'+this.$route.params.geohash)
        .then(res=>{
            if(res.data){
                this.geohash=res.data;
                console.log(this.geohash)
            }
        })

        
    }
}
</script>

<style lang="scss" scoped>
    .box{
        width: 100%;
        height: 100%;
        background: #F5F5F5;
        display: flex;
        flex-direction: column;
        .header2{
            width:100%;
            height:0.9rem;
            background-color: #3792E5;
            color:#fff;
            font-size: 0.32rem;
            font-weight: bold;

            line-height: 0.9rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.2rem;
            p{
                font-size: 0.25rem;
            }
            .logo{
                font-size: 0.35rem;
            }
        }
        .center{
            width: 100%;
            padding-bottom: 0.3rem;
            border-top: 0.01rem solid #E8E8E8;
            flex: 1;
            overflow: auto;
            .nav{
                width: 100%;
                height: 4rem;
                background: #fff;
                border-bottom: 0.01rem solid #E8E8E8;
                .swiper-container{
                    width: 100%;
                    height: 4.1rem;
                    .swiper-wrapper{
                        width: 100%;
                        .swiper-slide{
                            width: 100%;
                           ul{
                                width: 100%;
                                display: flex;
                                list-style: none;
                                padding: 0 0.2rem;
                                flex-wrap: wrap;
                                li{
                                    width: 25%;
                                    text-align: center;
                                    img{
                                        width: 0.8rem;
                                    }
                                    span{
                                        display: block;
                                        font-size: 0.22rem;
                                    }
                                }
                                &:nth-of-type(2){
                                    padding-bottom:0.5rem;
                                }
                            }
                        }
                    }
                }
            }
            .title{
                width: 100%;
                margin-top: 0.3rem;
                background:#fff;
                img{
                    width: 0.36rem;
                    display: block;
                    vertical-align: middle;
                    margin-top: 0.3rem;
                    margin-left: 0.2rem;
                }
                span{
                    font-size: 0.25rem;
                    display: block;
                    padding-left: 0.6rem;
                    margin-top: -0.35rem;
                    color:#A3A3A3;
                }
            }
        }
    }
</style>
