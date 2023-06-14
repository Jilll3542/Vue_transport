import axios from "axios";
import { Message } from 'element-ui';
import { getToken } from "./auth";
// import config from "vue/types/umd";
const service = axios.create({
    baseURL:"http://localhost:8080",
    timeout:5000
})
//请求拦截器

service.interceptors.request.use(
    (config)=>{
        //请求成功的函数
        if(getToken()){
            config.headers.token = getToken()
        }
        //加到请求头里面
        return config
    },
    ()=>{
        //请求失败的函数
        Message({
            type:"error",
            message:"请求错误"
        })
        return Promise.reject(new Error("请求错误"))
    }
)

//响应拦截器
service.interceptors.response.use(
    //这个部分函数是请求在物理层面是跑通了的
    (res)=>{
        console.log(this)
        const result=res.data;
        if(result.success){
            Message({
                type:"success",
                message:result.message
            })
            return result;
        }else{
            Message({
                type:"error",
                message:result.message||"请求错误"
            })
            return Promise.reject(new Error(result.message||"请求错误"))
        }
    },
    //第二个函数里面代表请求都没通过，没有result
    ()=>{
        Message({
            type:"error",
            message:"请求错误"
        })
        return Promise.reject(new Error("请求错误"))
    }
)




//导出
export default service