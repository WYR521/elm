<template>
    <div class="message">
        <div class="nav">
            <el-col :span="12">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="rgb(50, 64, 87)"
                    text-color="#fff"
                    active-text-color="#20A0FF">
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title" @click="home">首页</span>
                </el-menu-item>

                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>数据管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="userlist">用户列表</el-menu-item>
                    <el-menu-item index="1-2" @click="shoplist">商家列表</el-menu-item>
                    <el-menu-item index="1-3" @click="foodlist">食品列表</el-menu-item>
                    <el-menu-item index="1-4" @click="orderlist">订单列表</el-menu-item>
                    <el-menu-item index="1-5" @click="adminlist">管理员列表</el-menu-item>
                </el-menu-item-group>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-plus"></i>
                        <span>添加数据</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">添加商铺</el-menu-item>
                        <el-menu-item index="1-2">添加商品</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-star-on"></i>
                        <span>图表</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">用户分布</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-edit"></i>
                        <span>编辑</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">文本编辑</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-s-tools"></i>
                        <span>设置</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="adminset">管理员设置</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-warning"></i>
                        <span>说明</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="explain">说明</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                </el-menu>
            </el-col>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        //首页
        home(){
            this.$router.push("/home")
        },
        //用户列表
        userlist(){
            this.$router.push("/userlist")
        },
        //商家列表
        shoplist(){
            this.$router.push("/shoplist")
        },
        //食品列表
        foodlist(){
            this.$router.push("/foodlist")
        },
        //订单列表
        orderlist(){
            this.$router.push("/orderlist")
        },
        //管理员列表
        adminlist(){
            this.$router.push("/adminlist")
        },
        //管理员设置
        adminset(){
            this.$router.push("/adminset")
        },
        //说明
        explain(){
            this.$router.push("/explain")
        }
    }
}
</script>

<style lang="scss" scoped>
    .message{
        width:100%;
        height: 100%;
        background-color:rgb(50, 64, 87);
        div{
            width: 100%;
        } 
    }
</style>
