<template>
    <div class="box">
        <head-top :goback="true" class="header2">
            <span slot="user">搜索</span>
            <span slot="aa"></span>
        </head-top>
        <div class="div">
            <div class="search">
                <input type="text" placeholder="请输入商家或美食" v-model="inp" @keyup.enter="clk">
                <input type="button" value="提交" @click="clk">
                <span class="cc" v-if="del" @click="shanchu">&times;</span>
            </div>
            <div class="center" v-if="show">
                <p>商家</p>
                <ul>
                    <li v-for="item in shop">
                        <div><img :src="'http://elm.cangdu.org/img/'+item.image_path" alt=""></div>
                        <div>
                            <p>{{item.name}}</p>
                            <p>月售{{item.recent_order_num}}单</p>
                            <p>{{item.float_minimum_order_amount}}元起送/距离{{item.distance}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="old" v-if="isShow">
                <p>搜索历史</p>
                <ul>
                    <li v-for="(item,index) in SearchHistory">
                        <span @click="hish(index)">{{item}}</span>
                        <span class="del" @click="rem(index)">&times;</span>
                    </li>
                </ul>
                <p @click="remove">清空搜索历史</p>
            </div>
            <p class="pp" v-if="sear">很抱歉！无搜索结果</p>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import foot from '../../components/footer/foot'
import axios from 'axios'
export default {
    components:{
        headTop,
        foot
    },
    data(){
        return{
            isShow:false,   //搜索历史
            del:false,     //input删除按钮
            inp:'',      //输入框绑定的值
            shop:[],     //搜索商铺
            show:false,   //商铺
            SearchHistory:[],     //历史记录
            sear:false,   //无搜索结果
        }
    },
    mounted(){
        let user_id = localStorage.getItem('user_id');
        axios.get('http://elm.cangdu.org/v1/user?user_id='+user_id)
        .then(res=>{
            console.log(res)
        })
        this.app();
        if(this.SearchHistory!=''){
            this.isShow=true;
        }else{
            this.isShow=false;
        }
    },
    methods:{
        //搜索
        clk(){
            axios.get('http://elm.cangdu.org/v4/restaurants?extras[]=restaurant_activity&geohash=39.902802,116.427048&keyword='+this.inp+'&type=search') 
            .then(res=>{
                if(res.data.status!=0){
                    this.shop=res.data
                    this.show=true;    //商铺
                    this.isShow=false;  //历史记录
                }else{
                    this.shop=[];
                    this.sear=true;
                }
            })
            this.add();
        },
        // 删除输入框值
        shanchu(){
            this.inp=''
            this.show=false;  //商铺
            this.isShow=true;  //历史记录
            this.sear=false;
        },
        app(){
            if(localStorage.getItem('SearchHistory')){
                this.SearchHistory=JSON.parse(localStorage.getItem('SearchHistory')); //parse字符串转对象(取)
            }else{
                this.SearchHistory=[];
            }
        },
        add(){  
            let history=localStorage.getItem('SearchHistory') 
            if(history){ 
                let checkrepeat=false;
                this.SearchHistory=JSON.parse(history);
                this.SearchHistory.forEach(i=>{
                    if(i==this.inp){
                        checkrepeat=true;
                    }
                })
                if(checkrepeat==false){
                    this.SearchHistory.push(this.inp);
                    localStorage.setItem('SearchHistory',JSON.stringify(this.SearchHistory))  //stringify对象转字符串(存)
                }
            }else{
                this.SearchHistory.push(this.inp);
                localStorage.setItem('SearchHistory',JSON.stringify(this.SearchHistory))
            }
        },
        remove(){
            localStorage.removeItem('SearchHistory');
            this.SearchHistory=[];
            this.isShow=false;
        },
        //单个删除历史记录
        rem(index){
            this.SearchHistory.splice(index,1);
            localStorage.setItem('SearchHistory', JSON.stringify(this.SearchHistory))
        },
        //历史记录搜索
        hish(index){
            let word = this.SearchHistory[index]
            this.inp = word;
            // console.log(word)
            axios.get('http://elm.cangdu.org/v4/restaurants?extras[]=restaurant_activity&geohash=39.902802,116.427048&keyword='+word+'&type=search') 
            .then(res=>{
                if(res.data.status!=0){
                    this.shop=res.data
                    this.show=true;    //商铺
                    this.isShow=false;  //历史记录
                }else{
                    this.shop=[];
                    this.sear=true;
                    this.isShow=false;  //历史记录
                }
            })
        }
    },
    
    updated(){
        if(this.inp!=''){
            this.del=true;   //删除按钮
        }else{
            this.del=false;   
        }
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
        .div{
            width: 100%;
            flex: 1;
            overflow: auto;
            .center{
                width: 100%;
                &>p{
                    widows: 100%;
                    height:0.8rem;
                    font-size: 0.2rem;
                    color: #666;
                    padding-left: 0.25rem;
                    line-height: 0.8rem;
                    background: #F5F5F5;
                    font-weight: bold;
                }
                ul{
                    width: 100%;
                    background: #fff;
                    li{
                        width: 100%;
                        display: flex;
                        padding: 0.2rem;
                        border-bottom: 1px solid #E4E4E4;
                        div:nth-of-type(1){
                            width: 22%;
                            img{
                                width: 1.2rem;;
                            }
                        }
                        div:nth-of-type(2){
                            border-bottom: 1px solid #E4E4E4;
                            flex: 1;
                            p{
                                font-size: 0.22rem;
                                padding-top: 0.1rem;
                            }
                            p:nth-of-type(1){
                                padding-top: 0.15rem;
                            }
                        }
                    }
                }
            }
            .search{
                width: 100%;
                height:1rem;
                position: relative;
                background: #fff;
                input[type=text]{
                    width: 4.92rem;
                    height: 0.64rem;
                    position: absolute;
                    top: 0.2rem;
                    left: 0.2rem;
                    background-color:#F2F2F2;
                    border: 1px solid #E4E4E4;
                    border-radius: 4px;
                    outline: none;
                    padding-left: 0.2rem;
                    &::placeholder{
                        font-size: 0.3rem;
                        font-weight: bold;
                        color:#757575;
                    }
                }
                input[type=button]{
                    width: 1.42rem;
                    height: 0.64rem;
                    position: absolute;
                    top: 0.2rem;
                    right: 0.2rem;
                    background-color:#3792E5;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    outline: none;
                    font-size: 0.3rem;
                    font-weight: bold;
                }
            }
            .cc{
                font-size: 0.3rem;
                font-weight: bold;
                color:#476598;
                position: absolute;
                top:0.3rem;
                right:1.8rem;
            }
            .old{
                width: 100%;
                p:nth-of-type(1){
                    width: 100%;
                    height:0.8rem;
                    background: #F5F5F5;
                    color:#666;
                    padding-left: 0.1rem;
                    font-size: 0.25rem;
                    font-weight: bold;
                    line-height: 0.8rem;
                }
                ul{
                    width: 100%;
                    background: #fff;
                    li{
                        width: 100%;
                        height: 0.8rem;
                        font-size: 0.28rem;
                        line-height: 0.8rem;
                        padding-left: 0.2rem;
                        border-bottom: 1px solid #E4E4E4;
                        display:flex;
                        justify-content: space-between;
                        span:nth-of-type(1){
                            width: 70%;
                        }
                        .del{
                            flex:1;
                            text-align: right;
                            color: #757575;
                            font-size: 0.3rem;
                            font-weight:bold;
                            padding-right: 0.2rem;
                        }
                    }
                }
                p:nth-of-type(2){
                    width: 100%;
                    height:0.8rem;
                    color:#3792E5;
                    text-align: center;
                    font-size: 0.3rem;
                    font-weight: bold;
                    line-height: 0.8rem;
                    background: #fff;
                }
            }
        }
        .pp{
            font-size: 0.3rem;
            text-align: center;
            line-height: 0.8rem;
            background: #fff;
            margin-top: 0.1rem;
        }
    }
</style>
