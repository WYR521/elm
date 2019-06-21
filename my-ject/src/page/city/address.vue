<template>
    <div class="my">
        <head-top :headTitle="goods.name" :goback="true" class="header3">  
            <router-link tag="p" to="/place" slot="changecity">切换城市</router-link>
        </head-top>
        <div class="center3">
            <div class="mm">
                <input type="text" placeholder="输入学校、商务楼、地址" v-model="word" @keyup.enter="clk">
                <input type="submit" value="提交" @click="clk">
                <span @click="del" v-if="img"><img src="../../image/img/333.png"></span>
            </div>
            <p v-show="isShow">搜索历史</p>
            <p v-show="isShowNo">很抱歉！啥也没有</p>
            <ul>
                <li v-for="(item,index) in list" :key="index" @click="add(index,item)" >
                    <p>{{item.name}}</p>
                    <p>{{item.address}}</p>
                </li>
            </ul>
            <p class="pp" v-show="isShow2" @click="remove">清空所有记录</p>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import headTop from '../../components/header/head'
export default {
    components:{
        headTop
    },
    data(){
        return{
            goods:"",
            word:"",
            list:[],
            isShow:true,
            isShow2:false,
            img:false,
            isShowNo:false,
            historyList:[]
        }
    },
    mounted(){
        //根据id获取城市
        axios.get('http://elm.cangdu.org/v1/cities/'+this.$route.params.id)
        .then(res=>{
            // console.log(res.data)
            if(res.data){
                this.goods=res.data;
            }
        })
        this.app()
    },
    updated(){
        if(this.word.length!=""){
            this.img=true;
        }else{
            this.img=false;
        }
    },
    methods:{
        clk(){
            axios.get('http://elm.cangdu.org/v1/pois?type=search&city_id='+this.$route.params.id+'&keyword='+this.word)
            .then(res=>{
                if(res.data){ //获得搜索结果
                    this.list=res.data;
                    this.isShow=false;
                }else{
                    this.isShow=true;
                }
            })
        },
        app(){
            if(localStorage.getItem('historyList')){
                this.list=JSON.parse(localStorage.getItem('historyList')); //parse字符串转对象(取)
                this.isShow2=true;
            }else{
                this.list=[];
            }
        },
        add(index,item){  //item是点击是获得的具体地址对象
            let history=localStorage.getItem('historyList') 
            if(history){ //如果history为空 代表没本地存储过 那么创建一个本地存储并且名字就是list
                let checkrepeat=false;
                this.historyList=JSON.parse(history);
                this.historyList.forEach(i=>{
                    if(i.address==item.address){
                        checkrepeat=true;
                    }
                })
                if(checkrepeat==false){
                    this.historyList.push(item);
                    localStorage.setItem('historyList', JSON.stringify(this.historyList))  //stringify对象转字符串(存)
                }
            }else{
                //为空创建list并存入数据
                this.historyList.push(item);
                localStorage.setItem('historyList', JSON.stringify(this.historyList))
            }
            this.$router.push({ name: "take",params:{geohash:item.geohash}});

        },
        del(){
            this.word='';
        },
        remove(){
            localStorage.removeItem('historyList')
            this.list=''
            this.isShow2=false;
        }
    }
}
</script>


<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .my{
        background-color: #F5F5F5;
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
        .header3{
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
            p{
                font-size: 0.25rem;
            }
        }
        .center3{
            width:100%;
            flex:1;
            overflow: auto;
            .mm{
                background-color: #fff;
                position:relative;
                width:100%;
                height:1.8rem;
                &>input:nth-of-type(1){
                    position:absolute;
                    padding-left: 0.3rem;
                    width:90%;
                    height:0.6rem;
                    background-color: #F2F2F2;
                    font-size: 0.26rem;
                    border-radius: 0.05rem;
                    outline: none;
                    border:none;
                    border:0.01rem solid #E4E4E4;
                    padding-left: 0.2rem;
                    top:0.2rem;
                    left:0.4rem;
                }
                &>input:nth-of-type(2){
                    position:absolute;
                    padding-left: 0.3rem;
                    border-bottom:0.03rem solid #E4E4E4;
                    width:90%;
                    height:0.6rem;
                    font-size: 0.28rem;
                    color:#fff;
                    outline: none;
                    background-color: #3792E5;
                    border:none;
                    border-radius: 0.05rem;
                    top:1rem;
                    left:0.4rem;
                }
                img{
                    width: 0.2rem;
                    position: absolute;
                    top: 0.4rem;
                    right: 0.5rem;
                }
            }
            &>p{
                font-size: 0.2rem;
                padding: 0.05rem;
                padding-left: 0.2rem;
            }
            ul{
                border-top:0.03rem solid #E4E4E4;
                background-color: #fff;
                list-style: none;
                li{
                    font-size: 0.28rem;
                    padding: 0.2rem;
                    border-bottom:0.01rem solid #E4E4E4;
                    p:nth-of-type(2){
                        font-size: 0.2rem;
                        color:#999999;
                        padding-top: 0.1rem;
                        white-space: nowrap;
                        overflow:hidden;
                        text-overflow: ellipsis;
                    }
                }
                &>p{
                    font-size:0.28rem ;
                    padding: 0.2rem 0;
                    text-align: center;
                    button{
                        font-size:0.28rem ;
                        background-color: #fff;
                        color:#666666;
                        border:none;
                        outline: none;
                    }
                }
            }
            .pp{
                color: #999;
                font-size: 0.25rem;
                text-align: center;
                line-height: 0.6rem;
                background: #fff;
            }
        }
    }
</style>