<template>
    <div class="addDetail">
        <head-top :goback="true" class="header2">
            <span slot="user">搜索地址</span>
            <span slot="aa"></span>
        </head-top>
        <div>
            <div class="input">
                <p>
                    <input type="text" placeholder="小区/写字楼/学校等" ref='inp' :value="this.$store.state.address"/>
                    <button @click="queren">确认</button>
                </p>
            </div>
            <p>为了满足商家的送餐要求，建议您从列表中选择地址</p>
            <div class="point" v-if="isShow">
                <p>找不到地址？</p>
                <p>请尝试输入小区、写字楼或学校名</p>
                <p>详细地址（如门牌号）可稍后输入哦。</p>
            </div>
            <div class="list">
                <ul>
                    <li v-for="item in list" @click="add(item)">
                        <p>{{item.name}}</p>
                        <p>{{item.address}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import axios from 'axios'
export default {
    components:{
        headTop
    },
    data(){
        return{
            isShow:true,
            list:[],    //地址
        }
    },
    methods:{
        //确认搜索地址
        queren(){
            if(this.$refs.inp.value){
                this.axios
                .get('http://elm.cangdu.org/v1/pois?type=nearby&keyword='+this.$refs.inp.value)
                .then(res=>{
                    this.list=res.data
                    if(this.list.length){
                        this.isShow=false;
                    }
                })
            }
        },
        //选择地址
        add(item){
            // console.log(item.name)
            this.$store.commit('ress',item);
            this.$router.push('/add');
        }
    }
}
</script>

<style lang='scss' scoped>
    .addDetail{
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
        &>div{
            width: 100%;
            flex: 1;
            overflow: auto;
            .input{
                width:100%;
                height: 1.1rem;
                background: #fff;
                padding: 0.01rem;
                p{
                    margin-top: 0.4rem;
                    width: 94%;
                    height: 0.7rem;
                    margin: 0.2rem auto;
                    position: relative;
                    input{
                        width: 80%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: #f2f2f2;
                        border: 0.01rem solid #ddd;
                        border-radius: 0.05rem;
                        padding-left: 0.15rem;
                        outline: none;
                    }
                    button{
                        width: 1.2rem;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        right: 0;
                        background: #3199e8;
                        color: #fff;
                        border-radius: 0.05rem;
                        border: none;
                        color: #fff;
                        outline: none;
                    }
                }
            }
            &>p{
                background: #fff6e4;
                font-size: 0.26rem;
                color: #ff883f;
                text-align: center;
                padding: 0.1rem 0;
            }
            .point{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 100%;
                p{
                    width: 100%;
                    text-align: center;
                    font-size: 0.28rem;
                    color: #969696;
                    margin-bottom: 0.2rem;
                }
            }
            .list{
                width:100%;
                ul{
                    width:100%;
                    li{
                        width: 100%;
                        height: 1rem;
                        font-size: 0.26rem;
                        color: #969696;
                        padding-left: 0.2rem;
                        border-bottom: 0.01rem solid #DDD;
                        p:nth-of-type(1){
                            padding-top: 0.15rem;
                        }
                        p:nth-of-type(2){
                            padding-top: 0.05rem;
                        }
                    }
                }
            }
        }   
    }
</style>
