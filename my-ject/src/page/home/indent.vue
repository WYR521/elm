<template>
    <div class="indent">
        <head-top :goback="true" class="header2">
            <span slot="user">订单</span>
            <span slot="aa"></span>
        </head-top>
        <div class="content"></div>
        <foot></foot>
    </div>
</template>

<script>
import foot from '../../components/footer/foot'
import headTop from '../../components/header/head'
export default {
    components:{
        headTop,
        foot
    },
}
</script>

<style lang='scss' scoped>
    .indent{
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
        .content{
            width: 100%;
            flex: 1;
            overflow: auto;
        }
    }
</style>
