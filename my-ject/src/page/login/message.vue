<template>
    <div class="message">
        <head-top :goback="true" class="header2">
            <span slot="user">账户信息</span>
            <span slot="aa"></span>
        </head-top>
        <div class="head">
            <ul>
                <li>
                    <span>头像</span>
                        <span v-if="this.newavatar"> 
                            <img :src='this.newavatar' />
                            <i class="fa fa-fw fa-angle-right"></i>
                        </span>
                        <span v-else>
                            <img :src="'http://elm.cangdu.org/img/'+this.avatar" /> 
                            <i class="fa fa-fw fa-angle-right"></i>
                        </span>
                    <input type="file" accept="image/jpeg, image/jpg, image/png" @change='handFile'/>          
                </li>
                <li>
                    <router-link tag='a' to="/name">
                        <span>用户名</span>
                        <span v-if='this.$store.state.name'>{{this.$store.state.name}}</span>
                        <span v-else>{{this.username}}</span>
                        <i class="fa fa-fw fa-angle-right"></i>
                    </router-link>
                </li>
                <li>
                    <router-link tag='a' to="/adress">
                        <span>收货地址</span>
                        <i class="fa fa-fw fa-angle-right"></i>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="bangding">
            <p>账号绑定</p>
            <p @click="tel">
                <span>手机</span>
                <i class="fa fa-fw fa-angle-right"></i>
            </p>
        </div>
        <div class="anquan">
            <p>安全设置</p>
            <p>
                <router-link tag='a' to="/forget">
                    <span>密码登录</span>
                    <span>修改</span>
                    <i class="fa fa-fw fa-angle-right"></i>
                </router-link>
            </p>
        </div>
        <button @click="goBack">退出登录</button>
                
        <div class="alet_container" v-if='isShow'>
            <div class="tip_text_container">
                <div class="tip_icon">
                    <span></span>
                    <span></span>
                </div>
                <p>是否退出登录</p>
                <button @click="wait">再等等</button>
                <button @click="out">退出登录</button>
            </div>
        </div>

        <div class="phone" v-if="show">
            <div class="tip_text_container">
                <div class="tip_icon">
                    <span></span>
                    <span></span>
                </div>
                <p>请在手机APP中设置</p>
                <button @click="ok">确认</button>
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
            newavatar:'',   //提交头像
            isShow:false,  //弹框
            avatar:'',  //默认头像
            username:'',  //用户名
            show:false
        }
    },
    mounted(){
        // console.log(this.$store.state.name)
        let user_id = localStorage.getItem('user_id');
        // console.log(user_id)
        this.axios
        .get('http://elm.cangdu.org/v1/user?user_id='+user_id)
        .then(res=>{
            if(res.data){
                // console.log(res.data)
                this.username=res.data.username
                this.avatar=res.data.avatar
            }
        })

    },
    methods:{
        //上传头像
        handFile(ev) {
            ev.preventDefault()//阻止浏览器进行 默认行为
            let $target = ev.target || ev.srcElement;
            //获取上传文件信息
            let file = $target.files[0];
            //读取文件
            var reader = new FileReader();
            //读取完成
            reader.onload = data => {
                let res = data.target || data.srcElement;
                this.newavatar = res.result;
            }
            //通过FormData对象发送表单数据
            let formData = new FormData(); 
            formData.append('file', file);  
            const instance=axios.create({
                withCredentials: true
                // 需要设置 withCredentials：true , 表示跨域请求时是否需要使用凭证. 默认为false
            }) 
            //将头像通过接口上传到浏览器
            let user_id=localStorage.getItem('user_id');
            instance.post('http://elm.cangdu.org/eus/v1/users/'+user_id+'/avatar',formData)
            .then(res => {
                
            })
            //把文件地址读取出来
            reader.readAsDataURL(file);
        },
        //退出登录
        goBack(){
            this.isShow=true;
        },
        //再等等
        wait(){
            this.isShow=false;
        },
        //退出登录
        out(){
            // this.$store.commit('back')
            localStorage.removeItem('user_id')
            this.isShow=false;
            this.$router.push('/user')
        },
        tel(){
            this.show=true;
        },
        ok(){
            this.show=false
        }
    }
    
}
</script>

<style lang='scss' scoped>
    .message{
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
        .head{
            width: 100%;
            border-top: 0.01rem solid #DDDDDD;
            margin-top: 0.2rem;
            background: #fff;
            ul{
                margin: 0;
                width: 100%;
                list-style: none;
                li{
                    font-size: 0.26rem;
                    line-height: 0.8rem;
                    height: 0.8rem;
                    border-bottom: 0.01rem solid #DDD;
                    a{
                        text-decoration: none;
                        color: #000;
                    }
                    span{
                        float: left;
                        padding-left: 0.2rem;
                    }
                    i{
                        float: right;
                        font-size: 0.5rem;
                        color: #D8D8D8;
                        padding-top: 0.15rem;
                    }
                }
                li:nth-of-type(1){
                    height: 1.3rem;
                    line-height: 1.3rem;
                    position: relative;
                    input{
                        position: absolute;
                        top:0rem;
                        right:0rem;
                        width: 100%;
                        height: 100%;
                        display: block;
                        opacity: 0;
                        border-radius: 50%; 
                    }
                    i{
                        padding-top: 0.4rem;
                        position: absolute;
                        right: 0rem;
                    }
                    img{
                        width: 0.8rem;
                        border-radius: 50%;
                        position: absolute;
                        top: 0.2rem;
                        right: 0.6rem;
                    }
                }
                li:nth-of-type(2){
                    span:nth-of-type(2){
                        padding-left: 3.2rem;
                    }
                }
            }
        }
        .bangding{
            width: 100%;
            p:nth-of-type(1){
                font-size: 0.24rem;
                color: #666;
                padding-left: 0.2rem;
                line-height: 0.6rem;
                border-bottom: 0.01rem solid #DDD;
            }
            p:nth-of-type(2){
                background: #fff;
                font-size: 0.26rem;
                line-height: 0.8rem;
                border-bottom: 0.01rem solid #DDD;
                span:nth-of-type(1){
                    padding-left: 0.2rem;
                }
                span:nth-of-type(2){
                    padding-left: 4.3rem;
                    color: #9FA19F;
                    font-size: 0.28rem;
                }
                i{
                    float: right;
                    font-size: 0.5rem;
                    color: #D8D8D8;
                    padding-top: 0.15rem;
                }
            }
        }
        .anquan{
            width: 100%;
            p:nth-of-type(1){
                font-size: 0.24rem;
                color: #666;
                padding-left: 0.2rem;
                line-height: 0.6rem;
                border-bottom: 0.01rem solid #DDD;
            }
            p:nth-of-type(2){
                background: #fff;
                font-size: 0.26rem;
                line-height: 0.8rem;
                border-bottom: 0.01rem solid #DDD;
                a{
                    text-decoration: none;
                    color: #000;
                }
                span:nth-of-type(1){
                    padding-left: 0.2rem;
                }
                span:nth-of-type(2){
                    padding-left: 4.2rem;
                    color: #9FA19F;
                    font-size: 0.28rem;
                }
                i{
                    float: right;
                    font-size: 0.5rem;
                    color: #D8D8D8;
                    padding-top: 0.15rem;
                }
            }
        }
        &>button{
            width: 95%;
            height: 0.6rem;
            margin-left: 0.15rem;
            background: #D8584A;
            border: none;
            color: #fff;
            border-radius: 0.05rem;
            margin-top: 0.6rem;
            outline: none;
        }
    }
    //弹框
    .alet_container{
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0,0,0,0.2);
        .tip_text_container{
            width: 6rem;
            height: 5rem;
            background: #fff;
            position: absolute;
            top:2.5rem;
            left:50%;
            margin-left: -3rem;
            padding-top: 0.5rem;
            animation: bounceIn 350ms ;
            border-radius: 0.08rem;
            .tip_icon{
                width: 1.7rem;
                height: 1.7rem;
                border: 0.08rem solid #f8cb86;
                border-radius: 50%;
                margin: 0 auto;
                padding-top: 0.2rem;
                span:nth-of-type(1){
                    display: block;
                    width: 0.09rem;
                    height: 0.9rem;
                    margin: 0 auto;
                    background-color: #f8cb86;
                }
                span:nth-of-type(2){
                    display: block;
                    width: 0.09rem;
                    height: 0.09rem;
                    margin: 0 auto;
                    background-color: #f8cb86;
                    margin-top: 0.1rem;
                }
            }
            p{
                padding-top: 0.4rem;
                text-align: center;
                font-size: 0.5rem;
                font-weight: 500;
                color: #575757;
            }
            &>button:nth-of-type(1){
                width: 1.7rem;
                height:0.7rem;
                border: none;
                background: #C1C1C1;
                color: #fff;
                border-radius: 0.08rem;
                font-size: 0.24rem;
                margin-left: 1.2rem;
                outline: none;
            }
            &>button:nth-of-type(2){
                width: 2rem;
                height:0.7rem;
                border: none;
                background: #DD6B55;
                color: #fff;
                border-radius: 0.08rem;
                font-size: 0.24rem;
                outline: none;
            }
        }
    }
        .phone{
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
