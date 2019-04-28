<template>
    <div class="fillcontain">
        <div class="explain_text">node-elm后台管理系统</div>
        <div class="explain_text">第一次登录的用户自动注册成为普通管理员</div>
        <div class="explain_text">普通管理员可以添加，修改信息</div>
        <div class="explain_text">超级管理员可以删除信息</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .fillcontain{
        height: 100%;
        width: 100%;
        .explain_text{
            margin-top: 20px;
            text-align: center;
            font-size: 20px;
            color: #333;
        }
    }

</style>
