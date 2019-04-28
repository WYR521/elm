<template>
    <div class="menu">
        <el-container>
            <el-aside width="280px"><Message></Message></el-aside>
            <el-container>
                <el-header><Header></Header></el-header>
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Message from './Message/Message'
import Header from './Message/Header/header'
export default {
    components:{
        Message,
        Header
    },
    data(){
        return{

        }
    },
}
</script>

<style lang="scss" scoped>
    .menu{
        width: 100%;
        height: 100%;
        box-sizing: border-box; 
        display: flex; 
    }
    .el-header {
        background-color: #eff2f7;
        color: #333;
        line-height: 60px;
        font-size: 14px;
        
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        line-height: 200px;
    }
    .el-main {
        background-color: white;;
        color: #333;
        padding: 0;
    }
</style>
