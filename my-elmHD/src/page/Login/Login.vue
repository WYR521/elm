<template>
    <div class="login">
        <div class="box">
            <div class="title">elm后台管理系统</div>
            <div class="content">
                <p><el-input v-model="uname" placeholder="用户名"></el-input></p>
                <!-- <span v-if="isShow">{{warn}}</span> -->
                <p><el-input placeholder="密码" v-model="psw" show-password></el-input></p>
                <!-- <span v-if="isShow">{{warn}}</span> -->
                <p><input type="submit" value="登录" @click="login"></p>
                <p class="p">温馨提示：</p>
                <p class="p">未登录过的新用户，自动注册</p>
                <p class="p">注册过的用户可凭账号密码登录</p>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return {
            uname: '', //用户名
            psw:'',     //密码
            warn:'',    //正则验证
            isShow:false
        }
    },
    methods:{
        login(){
            // let uname=/^1[3|4|5|7|8]\d{9}$/.test(uname);
            // let psw=/^[0-9]{6}$/.test(psw);
            let data={user_name:this.uname,password:this.psw}
            this.axios
            .post('https://elm.cangdu.org/admin/login',data)
            .then(res=>{
                console.log(res.data)
                if(res.data.status!=0){
                    this.$router.push('/content')
                }else{
                    console.log(res.data.message)
                }
            })
            // if(!uname || this.uname.value.lenght<1){
            //     this.warn="请输入用户名"
            //     this.isShow=true;
            // }
            // if(!psw){
            //     this.warn="请输入密码"
            //     this.isShow=true;
            // }
        }
        
    }
}
</script>

<style lang="scss" scoped>
    .login{
        width: 100%;
        height: 100%;
        background:#324057;
        padding: 0.01px;
        .title{
            color: #fff;
            font-size: 30px;
            text-align: center;
            padding-top:250px;
        }
        .content{
            width: 320px;
            height: 210px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -105px;
            margin-left: -180px;
            padding: 25px;
            border-radius: 5px;
            text-align: center;
            background-color: #fff;
            p:nth-of-type(2){
                padding-top: 15px;
            }
            p:nth-of-type(3){
                padding-top: 15px;
            }
            input[type=submit]{
                width: 320px;
                height: 38px;
                background-color:#20A0FF;
                border:none;
                color:#fff;
                border-radius: 5px;
            }
            p:nth-of-type(4){
                padding-top: 20px;
            }
            .p{
                color:red;
                font-size: 12px;
            }
            span{
                color:red;
                font-size: 10px;
                text-align: left;
                padding: 0;
                display: block;
            }
            .inp{
                border:1px solid red;
            }
        }
    }
</style>
