<template>
    <div class="forget">
        <head-top :goback="true" class="header2">
            <span slot="user">重置密码</span>
            <span slot="aa"></span>
        </head-top>
        <div class="input">
            <ul>
                <li><input type="text" placeholder="账号" ref='uname'/></li>
                <li><input type="text" placeholder="旧密码" ref='oldpsw'/></li>
                <li><input type="text" placeholder="请重新输入密码" ref='newpsw'/></li>
                <li><input type="text" placeholder="请确认密码" ref='qpsw'/></li>
                <li class="li">
                    <input type="text" placeholder="验证码" ref='code'/>
                    <img :src='this.list.code'/>
                    <div class="pp">
                        <p>看不清</p>
                        <p @click="again">换一张</p>
                    </div>
                </li>
            </ul>
            <p class="submit"><input type="submit" value="确认修改" @click="submit"/></p>
        </div>
        <div class="alet_container" v-if="isShow">
            <div class="tip_text_container">
                <div class="tip_icon">
                    <span></span>
                    <span></span>
                </div>
                <p>{{this.warn}}</p>
                <button @click="queren">确认</button>
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
            isShow:false,  //弹框
            list:[],    //验证码
            warn:'',    //弹框字
        }
    },
    methods:{
        again(){
            this.axios.post('http://elm.cangdu.org/v1/captchas')
            .then(res=>{
                this.list=res.data
            })
        },
        setCookie(name,value,day){
            var exp=new Date();
            exp.setDate(exp.getDate()+day);
            document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString();
        },
        submit(){
            let yan = this.$refs.code.value
            this.setCookie("cap",yan,7);
            let data = {
                username:this.$refs.uname.value,
                oldpassWord:this.$refs.oldpsw.value,
                newpassword:this.$refs.newpsw.value,
                confirmpassword:this.$refs.qpsw.value,
                captcha_code:this.$refs.code.value
            }
            this.axios.post('http://elm.cangdu.org/v2/changepassword',data)
            .then(res=>{
                if(res.data.status!=0){
                    this.warn=res.data.success
                    this.isShow=true
                }else{
                    this.warn=res.data.message
                    this.isShow=true
                }
            })
        },
        queren(){
            this.isShow=false;
        }
    },
    mounted(){
        this.axios.post('http://elm.cangdu.org/v1/captchas')
        .then(res=>{
            this.list=res.data
        })
    }

}
</script>

<style lang='scss' scoped>
    .forget{
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
            .submit{
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
                padding-top: 0.4rem;
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
    }
</style>
