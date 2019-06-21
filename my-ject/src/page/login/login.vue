<template>
    <div class="login">
        <head-top :goback="true" class="header2">
            <span slot="user">密码登录</span>
            <span slot="aa"></span>
        </head-top>
        <div class="content">
            <div class="input">
                <ul>
                    <li><input type="text" placeholder="账号" v-model="inp"/></li>
                    <li><input type="password" placeholder="密码" v-model="psw"/></li>
                        <li class="li">
                        <input type="text" placeholder="验证码" v-model="code"/>
                        <img :src='this.list.code'/>
                        <div class="pp">
                            <p>看不清</p>
                            <p @click="again">换一张</p>
                        </div>
                    </li>
                </ul>
                <p>温馨提示：未注册过的账号登录时将自动注册</p>
                <p>注册过的用户可凭账号密码登录</p>
                <p><input type="submit" value="登录" @click="login"/></p>
                <router-link tag='a' to="/forget"><span class="ss">重置密码？</span></router-link>
            </div>
        </div>
        <div class="alet_container" v-if="isShow">
            <div class="tip_text_container">
                <div class="tip_icon">
                    <span></span>
                    <span></span>
                </div>
                <p>{{this.warn}}</p>
                <button @click="ok">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import axios from 'axios'
axios.defaults.withCredentials=true;  //默认携带cookie
export default {
    components:{
        headTop
    },
    data(){
        return{
            warn:'',   //弹框文字
            isShow:false,  //弹框
            list:[],   //验证码
            inp:'',  //用户名
            psw:'',   //密码
            code:''   //验证码
        }
    },
    methods:{
        //换一张验证码
        again(){
            this.axios
            .post("http://elm.cangdu.org/v1/captchas")
            .then(res => {
                if(res.data){
                    this.list=res.data
                }
            })
        },
        //弹框
        ok(){
            // this.warn=''
            this.isShow=false;
        },
        //cookie
        setCookie(name,value,day){
            var exp=new Date();
            exp.setDate(exp.getDate()+day);
            document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString();
        },
        //登录
        login(){
            let username = this.inp;
            let password = this.psw;
            let code = this.code;
            let userBool=/^1[3|4|5|7|8]\d{9}$/.test(username);
            let pswBool=/^[0-9]{6}$/.test(password);
            let codeBool=/^[0-9]{4}$/.test(code);
            if(!userBool){
                this.warn='手机号格式不正确'
                this.isShow=true;
            }
            if(!pswBool){
                this.warn='密码格式不正确'
            }
            if(!codeBool){
                this.warn='验证码错误'
            }
            if(!userBool&&!pswBool&&!codeBool){
                this.warn='请输入手机号/邮箱/用户名'
            }
            if(userBool&&pswBool&&codeBool){
                this.warn=''
                this.setCookie("cap",code,1);  //获取验证码的值，并存到cookie里
                let data={username:username,password:password,captcha_code:code}
                this.axios
                .post('http://elm.cangdu.org/v2/login',data)
                .then((res) => {
                    if(res.data.status!=0){
                        this.$store.commit('login',res)  //传值到vuex
                        this.$router.push('/user') //跳页面
                    }else{
                        this.warn=res.data.message
                    }
                })
            }
        }
    },
    mounted(){
        //获取验证码
        this.axios
        .post("http://elm.cangdu.org/v1/captchas")
        .then(res => {
            if(res.data){
                this.list=res.data
            }
        })
    }
}
</script>

<style lang='scss' scoped>
    .login{
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
        .input{
            width:100%;
            ul{
                width:100%;
                margin-top: 0.25rem;
                li{
                    width: 100%;
                    height: 0.9rem;
                    position: relative;
                    margin-top: 0.01rem;
                    input{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top:0;
                        left:0;
                        border: none;
                        outline: none;
                        padding-left: 0.5rem;
                    }
                    &:nth-of-type(4){
                        border-bottom: none;
                    }
                }
                .li{
                    position: relative;
                    img{
                        position: absolute;
                        right: 1.2rem;
                        top:0.2rem;
                    }
                    .pp{
                        font-size: 0.2rem;
                        position: absolute;
                        top:0.1rem;
                        right: 0.4rem;
                        P:nth-of-type(2){
                            padding-top: 0.1rem;
                            color: #3792E5;
                        }
                    }
                }
            }
            &>p{
                font-size:0.2rem;
                color: red;
                &:nth-of-type(1){
                    padding-top: 0.15rem;
                    padding-left: 0.2rem;
                }
                &:nth-of-type(2){
                    padding-top: 0.3rem;
                    padding-left: 0.2rem;
                }
                &:nth-of-type(3){
                    padding-top: 0.2rem;
                    padding-left: 0.25rem;
                    input[type=submit]{
                        width:96%;
                        height: 0.8rem;
                        background: #4CD964;
                        border-radius: 0.05rem;
                        color: #fff;
                        border: none;
                        outline: none;
                    }       
                }
            }
            .ss{
                font-size: 0.25rem;
                color:#3792E5;
                float:right;
                padding-top: 0.5rem;
                padding-right: 0.1rem;
            }
            .dd{
                font-size: 0.25rem;
                color: red;
                padding-left: 0.2rem;
            }
        }
    }
    .alet_container{
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(255,255,255,0);
        .tip_text_container{
            width: 5rem;
            height: 3.2rem;
            background: #fff;
            position: absolute;
            top:3.5rem;
            left:50%;
            margin-left: -2.5rem;
            border-radius: 0.08rem;
            padding-top: 0.3rem;
            animation: bounceIn 350ms ;
            .tip_icon{
                width: 1.3rem;
                height: 1.3rem;
                border: .08rem solid #f8cb86;
                border-radius: 50%;
                margin: 0 auto;
                padding-top: 0.15rem;
                span:nth-of-type(1){
                    display: block;
                    width: 0.07rem;
                    height: 0.7rem;
                    margin: 0 auto;
                    background-color: #f8cb86;
                }
                span:nth-of-type(2){
                    display: block;
                    width: 0.07rem;
                    height: 0.07rem;
                    margin: 0 auto;
                    background-color: #f8cb86;
                    margin-top: 0.1rem;
                }
            }
            p{
                padding-top: 0.4rem;
                text-align: center;
                font-size: 0.3rem;
            }
            button{
                width: 100%;
                height:0.8rem;
                border: none;
                background: #4CD964;
                border-radius: 0 0 0.08rem 0.08rem;
                color: #fff;
                font-size: 0.35rem;
                font-weight: bold;
            }
        }
    }
        @keyframes bounceIn {
        from, 30%, 60%, 80%, to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }


        0% {
            opacity: 0;
            -webkit-transform: scale3d(.3, .3, .3);
            transform: scale3d(.3, .3, .3);
        }
        
        30% {
            -webkit-transform: scale3d(.8, .8, .8);
            transform: scale3d(.8, .8, .8);
        }


        60% {
            opacity: 1;
            -webkit-transform: scale3d(1.2, 1.2, 1.2);
            transform: scale3d(1.2, 1.2, 1.2);
        }


        80% {
            -webkit-transform: scale3d(.97, .97, .97);
            transform: scale3d(.97, .97, .97);
        }


        to {
            opacity: 1;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
        }
    }


    .bounceIn {
        -webkit-animation-name: bounceIn;
        animation-name: bounceIn;
    }
</style>
