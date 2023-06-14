<template>
    <div>
        <el-container>
            <el-aside width="200px" class="aside">
                <nav-left></nav-left>
            </el-aside>
            <el-container>
                <el-header class="head">
                    <top-header></top-header>
                </el-header>
                <el-main class="main">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </el-main>
                <el-footer class="foot">
                    京ICP备888888888888号 京公安网备案88828289283号
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import NavLeft from '@/components/NavLeft.vue';
import TopHeader from '@/components/TopHeader.vue';
import { RouterView } from 'vue-router';
export default {
    components:{
    NavLeft,
    TopHeader,
    RouterView
}
}
</script>

<style lang="less" scoped>
.head{
    background-color:#ffffff;
    line-height: 60px;
    box-shadow: 0 5px 4px rgba(0,21,41,0.3);
}
.aside{
    background: #001529;
    height: 100vh;
}
.main{
    height: 70vh;
    background-color: #e9eef3;
}
.foot{
    text-align: center;
    color:#999;
    font-size: 12px;
    line-height: 72px;
    background-color: #e9eef3;
}
</style>