<template>
    <div class="adress">
        <head-top :goback="true" class="header2">
            <span slot="user">编辑地址</span>
            <span slot="aa" v-if="isShow" @click="bianji">编辑</span>
            <span slot="aa" v-if="wan" @click=wancheng>完成</span>
        </head-top>
        <div class="div">
            <p></p>
            <div v-for="item in list">
                <span>{{item.address}}</span>
                <span>{{item.phone}}</span>
                <span v-if="show" @click="del(item)">&times;</span>
            </div>
            <p></p>
            <p>
                <router-link tag='a' to="/add">
                    <span>新增地址</span>
                    <i class="fa fa-fw fa-angle-right"></i>
                </router-link>
            </p>
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
            isShow:true,   //编辑
            show:false,    //×
            wan:false,    //完成
            list:[],
        }
    },
    mounted(){
        let user_id = localStorage.getItem('user_id');
        this.axios.get('http://elm.cangdu.org/v1/users/'+user_id+'/addresses')
        .then(res=>{
            if(res.data){
                // console.log(res)
                let arr = res.data
                this.list=arr.reverse()
            }
        })
    },
    methods:{
        //编辑
        bianji(){
            this.isShow=false;
            this.wan=true;
            this.show=true;
        },
        wancheng(){
            this.isShow=true;
            this.wan=false;
            this.show=false;
        },
        //删除
        del(item){
            let id = item.id;
            let user_id = localStorage.getItem("user_id");
            this.axios.delete("http://elm.cangdu.org/v1/users/"+user_id+"/addresses/"+id)
            .then(res=>{
                this.axios.get('http://elm.cangdu.org/v1/users/'+user_id+'/addresses')
                .then(res=>{
                    if(res.data){
                        let arr = res.data
                        this.list=arr.reverse()
                    }
                })
            })
        }
    }

}
</script>

<style lang='scss' scoped>
    .adress{
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
                padding-right: 0.8rem;
                display: inline-block;
                font-weight: bold;
            }
            span:nth-of-type(2){
                font-size: 14px;
            }
        }
        .div{
            p:nth-of-type(1){
                width: 100%;
                height: 0.02rem;
                background: #DDD;
                margin-top: 0.15rem;
            }
            &>div:nth-of-type(1){
                width: 100%;
                height: 1rem;
                background: #FFF8C3;
                font-size: 0.24rem;
                border-bottom: 0.01rem solid #DDD;
                padding-left: 0.2rem;
                padding-top: 0.2rem;
                position: relative;
                span:nth-of-type(2){
                    display: block;
                }
                span:nth-of-type(3){
                    position: absolute;
                    right: 0.3rem;
                    top: 0.25rem;
                    font-size: 0.3rem;
                }
            }
            &>div{
                width: 100%;
                height: 1rem;
                background: #fff;
                font-size: 0.24rem;
                border-bottom: 0.01rem solid #DDD;
                padding-left: 0.2rem;
                padding-top: 0.2rem;
                position: relative;
                span:nth-of-type(2){
                    display: block;
                }
                span:nth-of-type(3){
                    position: absolute;
                    right: 0.3rem;
                    top: 0.25rem;
                    font-size: 0.3rem;
                }
            }
            p:nth-of-type(2){
                width: 100%;
                height: 0.02rem;
                background: #DDD;
                margin-top: 0.15rem;
            }
            p:nth-of-type(3){
                width: 100%;
                background: #fff;
                height: 0.7rem;
                font-size: 0.28rem;
                line-height: 0.7rem;
                border-bottom: 0.01rem solid #DDD;
                a{
                    text-decoration: none;
                    color: #000;
                }
                span{
                    padding-left: 0.2rem;
                }
                i{
                    float: right;
                    font-size: 0.5rem;
                    color: #D8D8D8;
                    padding-top: 0.1rem; 

                }
            }
        }
    }
</style>
