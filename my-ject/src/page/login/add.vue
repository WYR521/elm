<template>
    <div class="add">
        <head-top :goback="true" class="header2">
            <span slot="user">新增地址</span>
            <span slot="aa"></span>
        </head-top>
        <div class="input">
            <ul>
                <li><input type="text" placeholder="请填写你的姓名" v-model="username" :class="warnName?'warrn':''"/></li>
                <p class="warn" v-if="warnName">{{warnName}}</p>

                <li><router-link tag='a' to="/addDetail">
                    <input type="text" placeholder="小区/写字楼/学校等" :value='this.$store.state.address'/>
                    </router-link>
                </li>

                <li><input type="text" placeholder="请填写详细送餐地址" v-model="add" :class="warndizhi?'warrn':''"/></li>
                <p class="warn" v-if="warndizhi">{{warndizhi}}</p>

                <li><input type="text" placeholder="请填写能够联系到您的手机号" v-model="phone" :class="warndianhua?'warrn':''"/></li>
                <p class="warn" v-if="warndianhua">{{warndianhua}}</p>        
                
                <li><input type="text" placeholder="备用联系电话(选填)" v-model="tel" :class="warnxuan?'warrn':''"/></li>
                <p class="warn" v-if="warnxuan">{{warnxuan}}</p>   
            </ul>
            <button @click="zengadd" class="btn" v-if='show'>新增地址</button>
            <button @click="zengadd" class="btn1" v-if="isShow">新增地址</button>
        </div>
        <div class="alet_container" v-if="kuang">
            <div class="tip_text_container">
                <div class="tip_icon">
                    <span></span>
                    <span></span>
                </div>
                <p>{{this.warn}}</p>
                <button class="bb" @click="ok">确认</button>
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
            //姓名
            warnName:'',
            username:'',
            //送餐地址
            add:'',
            warndizhi:'',
            //手机号
            phone:'',
            warndianhua:'',
            //选填电话
            tel:'',
            warnxuan:'',
            show:false,
            isShow:true,
            kuang:false,
            warn:'',
        }
    },
    methods:{
        zengadd(){
            let add = this.$store.state.address;
            let user_id = localStorage.getItem("user_id");
            let data = {
                address:this.add,  //地址
                geohash:"31.22299,121.36025",  //经纬度
                name:this.username,     //用户名
                phone:this.phone,    //电话号码
                poi_type: 0,     
                sex: 1,
                tag: "公司",
                tag_type: 4,
                phone_bk:this.tel,   //选填电话
                address_detail:add         //地址
            }
            // console.log(data)
            this.axios.post('http://elm.cangdu.org/v1/users/'+user_id+'/addresses',data)
            .then(res=>{
                if(res.data.status!=0){
                    this.$router.push('/adress')
                }else{
                    this.warn=res.data.message
                    this.kuang=true
                }
            })
        },
        ok(){
            this.kuang=false;
        }
    },
    watch:{
        //姓名
        username(curVal,oldVal){
            if(curVal===''){
                this.warnName='请填写您的姓名'
            }else{
                this.warnName=''
            }
        },
        add(curVal,oldVal){
            if(curVal.length<3){
                this.warndizhi='送餐地址太短了，不能辨识'
            }else{
                this.warndizhi=''
            }
        },
        phone(curVal,oldVal){
            let phoneBool=/^1[3456789]\d{9}$/.test(curVal);
            if(curVal===''){
                this.warndianhua='手机号不能为空'
            }else if(!phoneBool){
                this.warndianhua='请输入正确的手机号'
            }else{
                this.warndianhua=''
            }
            if(this.username!=='' && this.add!=='' && this.phone!==''){
                this.isShow=false;
                this.show=true;
            }
        },
        tel(curVal,oldVal){
            let telBool=/^1[3456789]\d{9}$/.test();
            if(curVal===''){
                this.warnxuan='请输入正确的手机号'
            }else{
                this.warnxuan=''
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    .add{
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
            width: 100%;
            background: #fff;
            margin-top: 0.2rem;
            ul{
                width:100%;
                padding-bottom: 0.15rem;
                li{
                    width: 94%;
                    height: 0.7rem;
                    position: relative;
                    margin-left: 0.2rem;
                    margin-top: 0.15rem;
                    border-radius: 0.05rem;
                    a{
                        text-decoration: none;
                        display: block;
                    }
                    input{
                        width: 100%;
                        height:100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        border-radius: 0.08rem;
                        border: none;
                        border: 0.01rem solid #E4E4E4;
                        padding-left: 0.15rem;
                        background: #F2F2F2;
                        outline: none;
                    }
                    .warrn{
                        border:0.01rem solid  #EE7053;
                    }
                }
                .warn{
                    padding: 0.05rem 0 0 0.2rem;
                    font-size: 0.2rem;
                    color:#EA3106;
                }
            }
        }
        .btn1{
            width: 94%;
            height: 0.7rem;
            margin-left: 0.2rem;
            margin-top: 0.2rem;
            border-radius: 0.05rem;
            border: none;
            background: #4CD964;
            color: #AFEEBA;
        }
        .btn{
            width: 94%;
            height: 0.7rem;
            margin-left: 0.2rem;
            margin-top: 0.2rem;
            border-radius: 0.05rem;
            border: none;
            background: #4CD964;
            color: #fff;
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
                .bb{
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
