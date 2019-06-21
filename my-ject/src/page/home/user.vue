<template>
    <div class="user">
        <head-top :goback="true" class="header2">
            <span slot="user">我的</span>
            <span slot="aa"></span>
        </head-top>
        <div class="center">
            <div class="top">
                <ul>
                    <li>
                        <img v-if="this.avatar" :src="'http://elm.cangdu.org/img/'+this.avatar"/>
                        <img v-else src="http://elm.cangdu.org/img/default.jpg"/>
                    </li>
                    <li>  
                        <p class="deng" v-if="this.username">
                            <router-link tag='a' to="/message">{{this.username}}</router-link>
                            <router-link tag='a' to="/message"> <i class="fa fa-fw fa-angle-right"></i></router-link>
                        </p>            
                        <p class="deng" v-else>
                            <router-link tag='a' to="/login"> 登录/注册 </router-link>
                            <router-link tag='a' to="/login"> <i class="fa fa-fw fa-angle-right"></i></router-link>
                        </p> 
                        <p class="bang">暂无绑定手机号</p>
                    </li>
                </ul>
            </div>
            <div class="nav">
                <ul>
                    <li>
                        <p><span>0.00</span>元</p>
                        <p>我的余额</p>
                    </li>
                    <li>
                        <p><span>0</span>个</p>
                        <p>我的优惠</p>
                    </li>
                    <li>
                        <p><span>0</span>分</p>
                        <p>我的积分</p>
                    </li>
                </ul>
            </div>
            <div class="center">
                <ul>
                    <li>
                        <router-link tag='a' to="/indent">我的订单</router-link>
                        <i class="fa fa-fw fa-angle-right"></i>
                    </li>
                    <li>
                        积分商城
                        <i class="fa fa-fw fa-angle-right"></i>
                    </li>
                    <li>
                        饿了么会员卡
                        <i class="fa fa-fw fa-angle-right"></i>
                    </li>
                </ul>
                <ul>
                    <li>
                        服务中心
                        <i class="fa fa-fw fa-angle-right"></i>
                    </li>
                    <li>
                        下载饿了么APP
                        <i class="fa fa-fw fa-angle-right"></i>
                    </li>
                </ul>
            </div>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import foot from '../../components/footer/foot'
import headTop from '../../components/header/head'
import axios from 'axios'
export default {
    components:{
        headTop,
        foot
    },
    data(){
        return{
            username:'',   //用户名
            avatar:''
        }
    },
    mounted(){
        let user_id=localStorage.getItem('user_id');
        if(user_id!==( '' || null )){
            this.axios
            .get('http://elm.cangdu.org/v1/user?user_id='+user_id)
            .then(res=>{
                if(res.data){
                    this.username=res.data.username
                    this.avatar=res.data.avatar
                }
            })
        }
        
        // console.log(this.$store.state.user_id)
    }
}
</script>

<style lang="scss" scoped>
    .user{
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
            text-align: center;
            line-height: 0.9rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.2rem;
            span:nth-of-type(1){
                padding-right: 1rem;
                display: inline-block;
                font-weight: bold;
            }
        }
        .center{
            width: 100%;
            flex: 1;
            overflow: auto;
            .top{
                background: #3792E5;
                ul{
                    padding-top: 0.2rem;
                    width:100%;
                    display: flex;
                    list-style: none;
                    position: relative;
                    li:nth-of-type(1){
                        width: 20%;
                        img{
                            width: 1.2rem;
                            border-radius: 50%;
                            margin-left: 0.2rem;
                        }
                    }
                    li:nth-of-type(2){
                        flex: 1;
                        padding-left: 0.25rem;
                        .deng{
                            margin:0;
                            padding-top: 0.2rem;
                            font-size: 0.35rem;
                            position: relative;
                            a{
                                color:#fff;
                                font-weight: bold;
                                text-decoration: none;
                            }
                            i{
                                position: absolute;
                                right:0.2rem;
                                top:0.4rem;
                                font-size: 0.35rem;
                            }
                        }
                        .bang{
                            margin:0;
                            font-size: 0.22rem;
                            color: #fff;
                        }
                    }
                }
            }
            .nav{
                width:100%;
                background: #fff;
                ul{
                    width: 100%;
                    list-style: none;
                    display: flex;
                    border-bottom:0.15rem solid #F5F5F5;
                    li{
                        flex: 1;
                        border-right: 0.01rem solid #F1F1F1;
                        font-size: 0.25rem;
                        color:#666;
                        text-align: center;
                        padding: 0.2rem;
                        &:nth-of-type(1){
                            span{
                                font-size: 0.5rem;
                                font-weight: bold;
                                color: #FF9900;
                            }
                        }
                        &:nth-of-type(2){
                            span{
                                font-size: 0.5rem;
                                font-weight: bold;
                                color: #FF5F3E;
                            }
                        }
                        &:nth-of-type(3){
                            border-right:none;
                            span{
                                font-size: 0.5rem;
                                font-weight: bold;
                                color: #6AC20B;
                            }
                        }
                        p:nth-of-type(2){
                            padding-top: 0.05rem;
                        }
                    }
                }
            }
            .center{
                width: 100%;
                background: #fff;
                ul{
                    width: 100%;
                    list-style: none;
                    li{
                        font-size: 0.3rem;
                        line-height: 0.8rem;
                        border-bottom: 0.01rem solid #F1F1F1;
                        margin-left: 0.6rem;
                        a{
                            text-decoration: none;
                            color: #333;
                        }
                        .fa-angle-right{
                            float:right;
                            padding-top: 0.25rem;
                            color: #BBBBBB;
                        }
                        &:nth-of-type(3){
                            border-bottom: none;
                        }
                    }
                }
                ul:nth-of-type(1){
                    border-bottom:0.15rem solid #F5F5F5;
                    &:nth-of-type(2){
                        border-bottom: none;
                    }
                }
            }
        }
    }
</style>
