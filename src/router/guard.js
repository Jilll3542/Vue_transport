//导航守卫
import router from './index';
import { getToken } from '@/utils/auth';
import asyncRoutes from "./asyncRouterMap";
import store from "@/store"
//@定位到的是src目录开始
//守卫所有页面，只要不登录就无法进页面，全局前置守卫
router.beforeEach(async (to,from,next)=>{
    
    console.log("导航守卫触发了")
    const hasToken=getToken();
    if(hasToken){
        //有token的情况下加路由
        //这个是异步的操作，有可能还没走完这个部分，就已经是走下面的部分了
        await store.dispatch("getRole")
        if(to.path=="/login"){
            next("/")
        }else{
            //去的不是登录页，就要动态添加路由
            //如果希望访问需要权限的路由，再添加路由，不需要都加，只选择性添加需要的部分
            if(to.name==null){
                //先添加路由
                //路由添加，也是一个异步的，如果在后面直接添加next放行
                //则可能会产生路由还没添加完，就被放行的情况
                // router.addRoute({
                //     path:"/attendance",
                //     name:"Attendance",
                //     meta:{auth:["boss","adminstration"]},
                //     component:()=>import("@/views/AuthView/AuthAttendance")
                // })
                //筛选出角色对应所拥有的路由表
                let f = asyncRoutes.filter(item=>item.meta.auth.includes(store.state.role))
                //
                for(let i=0;i<f.length;i++){
                    router.addRoute(f[i])
                }
                //跳转，只要路由没有添加好，就一直向to的位置加载，一旦路由加载成功了，就可以重新跳转
                //to.name有名字了，就会跳转,防止用户撤销
                
                next({...to,replace:true})

            }else{
                next()
            }

        }
    }else{
        if(to.path=="/login"){
            next()
        }else{
            next("/login")
        }
    }
})
