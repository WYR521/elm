<template>
    <div class="box">
        <header>
            <a href="#"><img src="../../image/img/111.png" alt=""></a>
            <span>搜索</span>
        </header>
        <div class="search">
            <input type="text" placeholder="牛肉">
            <img src="../../image/img/333.png" alt="">
            <input type="button" value="提交">
        </div>
        <div class="center">
            <p>商家</p>
            <ul>
                <li>
                    <div><img src="../../image/img/16.png" alt=""></div>
                    <div>
                        <p>我的牛肉面</p>
                        <p>月售601单</p>
                        <p>5元起送/距离2159.2公里</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .box{
        width: 100%;
        header{
            width: 100%;
            height:0.8rem;
            background-color:#3792E5;
            position: relative;
            a{
                img{
                    width: 0.21rem;
                    position: absolute;
                    top: 0.2rem;
                    left: 0.2rem;
                }
            }
            span{
                display: block;
                text-align: center;
                font-size: 0.4rem;
                color: #fff;
                padding-top: 0.15rem;
            }
        }
        .search{
            width: 100%;
            height:0.65rem;
            position: relative;
            input:nth-of-type(1){
                width: 4.92rem;
                height: 0.64rem;
                position: absolute;
                top: 0.2rem;
                left: 0.2rem;
                background-color:#F2F2F2;
                border: 1px solid #E4E4E4;
                color: #fff;
                border-radius: 4px;
                outline: none;
                &::placeholder{
                    font-size: 0.3rem;
                    font-weight: bold;
                    color:#757575;
                    padding-left: 0.2rem;
                }
            }
            img{
                width:0.2rem;
                position:absolute;
                top:0.4rem;
                right: 1.8rem;
            }
            input:nth-of-type(2){
                width: 1.42rem;
                height: 0.64rem;
                position: absolute;
                top: 0.2rem;
                right: 0.2rem;
                background-color:#3792E5;
                color: #fff;
                border: none;
                border-radius: 4px;
                outline: none;
                font-size: 0.3rem;
                font-weight: bold;
            }

        }
        .center{
            width: 100%;
            &>p{
                widows: 100%;
                height:0.8rem;
                font-size: 0.3rem;
                color: #666;
                padding-left: 0.2rem;
                line-height: 0.8rem;
                background: #F5F5F5;
                margin-top: 0.4rem;
                font-weight: bold;
            }
            ul{
                width: 100%;
                li{
                    width: 100%;
                    display: flex;
                    padding: 0.2rem;
                    border-bottom: 1px solid #E4E4E4;
                    div:nth-of-type(1){
                        width: 22%;
                        img{
                            width: 1.2rem;;
                        }
                    }
                    div:nth-of-type(2){
                        border-bottom: 1px solid #E4E4E4;
                        flex: 1;
                        p{
                            font-size: 0.22rem;
                            padding-top: 0.1rem;
                        }
                        p:nth-of-type(1){
                            padding-top: 0.15rem;
                        }
                    }
                }
            }
        }
    }
</style>
