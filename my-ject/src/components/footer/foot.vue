<template>
    <div>
        <!-- router-link是跳页面的 -->
        <ul>
            <router-link tag="li" :to="'/take/'+this.geohash"><i class="fa fa-fw fa-snowflake-o"></i><span>外卖</span></router-link>
            <router-link tag="li" :to="'/search/'+this.geohash"><i class="fa fa-fw fa-eercast"></i><span>搜索</span></router-link>
            <router-link tag="li" to="/indent"><i class="fa fa-fw fa-file-o"></i><span>订单</span></router-link>
            <router-link tag="li" to="/user"><i class="fa fa-fw fa-user-o"></i><span>我的</span></router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            geohash:''
        }
    },
    mounted(){
        this.geohash = this.$route.params.geohash;
        // console.log(this.geohash)
    }
}
</script>

<style lang="scss" scoped>
    ul{
        list-style: none;
        width: 100%;
        height: 1rem;
        display: flex;
        border-top: 1px solid #eee;
        padding: 0 0.1rem;
        background: #fff;
    }
    li{
        flex: 1;
        text-align: center;
        font-size: 0.25rem;
        margin-top: 0.15rem;
        i{
            font-size: 0.35rem;
        }
        span{
            padding-top: 0.1rem;
            display: block;
        }
        &:hover{
            color:#2D84FF;
        }
    }

</style>
