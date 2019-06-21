<template>
    <div class="pp">
        <head-top :signinUp="true" :goBack="false" class="header4">
            <p slot="logo" class="head_logo">ele.me</p>
        </head-top>
        <div class="conter4">
           <p>当前定位城市<span>定位不准时，请在城市列表中选择</span></p>
           <router-link tag="p" :to="{name:'address',params:{id:guess.id}}">{{guess.name}}<span>&gt;</span></router-link>
           <div class="mm1">
               <p>热门城市</p>
               <ul>
                    <router-link tag="li" :to="{name:'address',params:{id:item.id}}" v-for="item in hot" :key="item.id">{{item.name}}</router-link>
               </ul>
           </div>
           <div class="mm2" v-for="(item,index) in sortgroup" :key="index">
               <p>{{index}}</p>
               <ul>
                    <router-link tag="li" :to="{name:'address',params:{id:i.id}}" v-for="(i,j) in group[index]" :key="j">{{i.name}}</router-link>
               </ul>
           </div>
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
            guess:"",
            hot:[],
            group:[]
        }
    },
    mounted(){
        //当前定位城市
        axios.get('http://elm.cangdu.org/v1/cities?type=guess')
        .then(res=>{
            if(res.data){
                this.guess=res.data;
            }
        })
        //当前热门城市
        axios.get('http://elm.cangdu.org/v1/cities?type=hot')
        .then(res=>{
            if(res.data){
                this.hot=res.data;
            }
        })
        //当前所有城市
        axios.get('http://elm.cangdu.org/v1/cities?type=group')
        .then(res=>{
        //    console.log(res.data)
           if(res.data){
               this.group=res.data;
           }
        })
    },
    computed:{
        //将获取的数据按照A-Z字母开头排序
        sortgroup(){
            let sortobj={};
            for(let i=65;i<=90;i++){
                if(this.group[String.fromCharCode(i)]){
                    sortobj[String.fromCharCode(i)]=this.group[String.fromCharCode(i)];
                }
            }
            return sortobj;
        }
    }

}
</script>


<style lang="scss" scoped>
    .pp{
        background-color: #F5F5F5;
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
        .header4{
            width:100%;
            height:0.9rem;
            background-color: #3792E5;
            color:#fff;
            font-size: 0.32rem;
            text-align: center;
            line-height: 0.9rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.2rem;
        }
        .conter4{
            width:100%;
            overflow: auto;
            flex: 1;
            &>p:nth-of-type(1){
                font-size: 0.24rem;
                padding: 0.15rem ;
                color:#666666;
                background-color: #fff;
                border-bottom: 0.01rem solid #E4E4E4;
                position:relative;
                span{
                    position: absolute;
                    font-weight: bold;
                    color:#999999;
                    right:0.2rem;
                }
            }
            &>p:nth-of-type(2){
                font-size: 0.27rem;
                color:#3792E5;
                background-color: #fff;
                padding: 0.15rem;
                position:relative;
                border-bottom:0.03rem solid #E4E4E4;
                span{
                    position: absolute;
                    color:#999999;
                    right:0.2rem;
                }
            }
            .mm1{
                width:100%;
                margin-top: 0.2rem;
                border-top:0.03rem solid #E4E4E4;
                background-color: #fff;
                font-size: 0.25rem;
                color:#3792E5;
                p{
                    font-size: 0.28rem;
                    color:#676767;
                    padding: 0.1rem ;
                }
                ul{
                    list-style: none;
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        flex:25%;
                        text-align: center;
                        border:0.01rem solid #F4F4F4;
                        padding: 0.2rem 0;
                    }
                }
                
            }
            .mm2{
                width:100%;
                margin-top: 0.2rem;
                border-top:0.03rem solid #E4E4E4;
                background-color: #fff;
                font-size: 0.25rem;
                color:#757575;
                p{
                    font-size: 0.28rem;
                    color:#676767;
                    padding: 0.1rem ;
                }
                ul{
                    list-style: none;
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        width: 1.7rem;
                        text-align: center;
                        border:0.01rem solid #F4F4F4;
                        padding: 0.2rem 0;
                        white-space: nowrap;
                        overflow:hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }
</style>