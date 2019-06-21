<template>
    <div class="name">
        <head-top :goback="true" class="header2">
            <span slot="user">修改用户名</span>
            <span slot="aa"></span>
        </head-top>
        <input type="text" placeholder="输入用户名" v-model="uname" :class="username?'warrn':''"/>
        <p class="warn" v-if="username">{{username}}</p>
        <p v-if="isShow">用户名只能修改一次（5-24字符之间）</p>
        <button v-if="showis" @click="alter(uname)">确认修改</button>
        <button v-if="show" class="bth" @click="alter(uname)">确认修改</button>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
export default {
    components:{
        headTop
    },
    data(){
        return{
            isShow:true,
            uname:'',
            username:'',
            show:false,
            showis:true
        }
    },
    methods:{
        //确认修改
        alter(uname){
            // console.log(uname)
            let name = this.uname;
            this.$store.commit('name',uname)
            this.$router.push('/message')
        }
    },
    mounted(){
        let user_id = localStorage.getItem("user_id")
        this.axios.get('http://elm.cangdu.org/v1/user?user_id='+user_id)
        .then(res=>{
            console.log(res)
        })
        if(this.uname.length>4){
            this.show=true;
            this.showis=false;
        }
    },
    watch:{
        uname(curVal,oldVal){
            if(curVal.length<5){
                this.username='用户名长度在5到24位之间'
                this.isShow=false
            }else{
                this.username=''
                this.isShow=true;
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    .name{
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
        input{
            background: none;
            width: 95%;
            height: 0.7rem;
            border: 0.01rem solid #ddd;
            border-radius: 0.05rem;
            margin-top: 0.2rem;
            margin-left: 0.15rem;
            margin-bottom: 0.2rem;
            line-height: 0.8rem;
            font-size: 0.28rem;
            padding-left: 0.15rem;
            outline: none;
        }
        .warrn{
            border:0.01rem solid  #EE7053;
        }
        p{
            width: 100%;
            font-size: 0.22rem;
            color: #666;
            padding-left: 0.2rem;
            padding-bottom: 0.4rem;
        }
        .warn{
            padding: 0 0 0.4rem 0.15rem;
            font-size: 0.2rem;
            color:#EA3106;
        }
        .btn{ 
            width: 95%;
            height: 0.8rem;
            background: #3190E8;
            color: #fff;
            border: none;
            margin-left: 0.15rem;
            font-size: 0.3rem;
        }
        button{ 
            width: 95%;
            height: 0.8rem;
            background: #3190E8;
            color: #ADD6F6;
            border: none;
            margin-left: 0.15rem;
            font-size: 0.3rem;
        }
    }
    
</style>
