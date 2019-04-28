<template>
    <div>
        <div class="title">
            <div class="el-breadcrumb">
                <span class="el-breadcrumb__item">
                    <router-link tap="span" to="/home" class="el-breadcrumb__item__inner">首页</router-link>
                    <span class="el-breadcrumb__separator">/</span>
                </span>
                <!-- <span class="el-breadcrumb__item">
                    <span class="el-breadcrumb__item__inner">数据管理</span>
                    <span class="el-breadcrumb__separator">/</span>
                </span>
                <span class="el-breadcrumb__item">
                    <span class="el-breadcrumb__item">数据列表</span>
                </span> -->
            </div>
            <img src="https://elm.cangdu.org/img/default.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .title{
            width: 100%;
            height:60px;
            background: #EFF2F7;
            position: relative;
            padding:0;
            span{
                font-size: 10px;
                line-height: 60px;
                color:#97A8BE;
            }
            img{
                width: 35px;
                border-radius: 50%;
                position: absolute;
                top: 10px;
                right:30px;
            }
        }
        .el-breadcrumb{
            font-size: 13px;
            line-height: 1;
            padding-left: 20px;
            .el-breadcrumb__item{
                float:left;
                a{
                    text-decoration: none;
                    color: #48576a;
                }
                .el-breadcrumb__item__inner{
                    transition: color .15s linear;
                    color: #48576a;
                    cursor: pointer;
                    &:hover{
                        color:#20A0FF;
                    }
                }
                .el-breadcrumb__item__inner{
                    transition: color .15s linear;
                    color: #48576a;
                    cursor: pointer;
                    &:hover{
                        color:#20A0FF;
                    }
                }
                .el-breadcrumb__item{
                    transition: color .15s linear;
                    color: #97A8BE;
                }
                .el-breadcrumb__separator{
                    margin: 0 8px;
                    color: #bfcbd9;
                }
            }               
        }
</style>
