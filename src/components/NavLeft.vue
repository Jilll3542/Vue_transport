<template>
    <div>
        <h1 class="title">邦达国际物流平台</h1>
        <el-menu 
            :router="true"
            background-color="#001529"
            text-color="#fff"
        >
            <!-- 使用递归思想 -->
            <menus-vue v-for="(item,index) in menuData" :menu="item" :key="index"></menus-vue>
            <!-- 上一行的menu属性是随便叫的，叫什么名字都行，如果选定了一个属性名，就需要在MenusVue中再加这个原封不动的属性名 -->
        </el-menu>
    </div>
</template>

<script>
import { get } from "@/utils/http"
import MenusVue from "./MenusVue.vue"
export default {
    data() {
        return {
            menuData: []
        }
    },
    created() {
        this.getMenu()
    },
    methods: {
        //获取菜单项
        async getMenu() {
            let { data } = await get("/menu");
            this.menuData = data
        }
    },
    components:{
        MenusVue
    }
}
</script>

<style scoped>
.title{
    line-height: 50px;
    color: #fff;
    text-align: center;
}
</style>