<template>
    <div>
       我是详情页面 
        <bread-crumb></bread-crumb>
        <el-card class="card">
            <el-row>
                <el-col :span="12" class="info" style="text-align :left">
                    <span>运单编号：YSJKDHKDHFKAJDHH</span>
                    <span>创建时间：2022-08-24</span>
                    <span>审核员：张三丰</span>
                </el-col>
                <el-col :span="12" style="text-align:right">
                    <el-button type="primary" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
/**
 * include:包含
 * exclude:排除
 * include=“['a','b']” 也可以接受一个数组，两个组件都可以缓存,如果是输入的是数组，include前面需要加冒号
 * <keep-alive include=“组件名” exclude=“组件名”> 
 *      <router-view> </router-view>
 *      <component/>
 * </keep-alive>
 */
import BreadCrumb from '@/components/BreadCrumb.vue';
import { mapMutations } from 'vuex';
    export default {
        components:{
            BreadCrumb
        },
        methods:{
            ...mapMutations(["changeIsFromDetail"]),
            back(){
                this.$router.push("/waybill/list")
            }
        },
        beforeRouteLeave(to, from, next) {
        if (to.path == "/waybill/list") {
            //做一个标记,如果确实来自于详情页
            this.changeIsFromDetail(true)
            // from.meta.keepAlive = true
        } else {
            this.changeIsFromDetail(false)
    //         // from.meta.keepAlive = false
    //         //如果去的不是详情页，就要清除掉缓存
    //         let vnode = this.$vnode
    //         let parentVnode = vnode.parent
    //         if (parentVnode && parentVnode.componentInstance.cache) {
    //             var key = vnode.key == null
    //                 ? vnode.componentOptions.Ctor.cid + (vnode.componentOptions.tag ? `::${vnode.componentOptions.tag}` : '')
    //                 : vnode.key;
    //             var cache = parentVnode.componentInstance.cache;
    //             var keys = parentVnode.componentInstance.keys;

    //             if (cache[key]) {
    //                 this.$destroy()
    //                 // remove key
    //                 if (keys.length) {
    //                     var index = keys.indexOf(key)
    //                     if (index > -1) {
    //                         keys.splice(index, 1)
    //                     }
    //                 }
    //                 cache[key] = null
    //             }
    //         }
        }
        next()
    },
    }
</script>

<style lang="less" scoped>

</style>