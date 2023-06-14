<template>
    <div>
        账号：admin 密码：123456
        <el-row type="flex" justify="center" >
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2>邦达物流后台管理系统</h2>
                </div>
                <div>
                    <el-form 
                        :model="ruleForm" 
                        :rules="rules" 
                        ref="ruleForm" 
                        label-width="80px" 
                        class="demo-ruleForm">
                         <!-- ref在查找dom元素时性能会高很多，可以通过this.$refs.ruleForm来拿到该元素 ,ref属性不是element UI独有的-->
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model.trim="ruleForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model.trim="ruleForm.password" type="password" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button 
                                type="primary" 
                                style="width:100%" 
                                @click="login"
                                :loading="loading"
                                >登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
// import axios from "axios"
import { post } from '@/utils/http'
import {setToken} from '@/utils/auth'
import { mapMutations } from 'vuex'
    export default {
        data() {
            return {
                loading:false,
                ruleForm: {
                    username: "",
                    password:""
                },
                rules: {
                    username: [
                        //prop的规则，是数组的形式，传入渲染的标签
                        {   
                            required: true,
                            pattern: /^\w{4,8}$/, 
                            message: '用户名要求是4-8位数字字母组合', 
                            trigger: 'blur' 
                        },
                        { 
                           required:true,
                           //必填项的规则
                           message:'用户名不能为空',
                           trigger:'blur'
                        }
                    ],
                    password:[
                        { 
                           required:true,
                           //必填项的规则
                           message:'密码不能为空',
                           trigger:'blur'
                        },
                        {   
                            required: true,
                            pattern: /^\d{6}$/, 
                            message: '密码要求是6位纯数字', 
                            trigger: 'blur' 
                        }
                    ]
            },
        }
    },
    methods: {
     ...mapMutations(["setRole"]),
      login(){
        //防止有人拼命点，不停操作不停向服务器请求，在没有响应时，按钮无法点击
        this.$refs.ruleForm.validate((valid)=>{
            if(valid){
                this.loading=true
                //在表单校验通过之后开始loading
                //登录逻辑
                post("/login",this.ruleForm).then((res)=>{
                    //动态增加路由表,动态增加路由表，刷新就丢失
                    //每次刷新就添加路由表，在刷新的方法里添加，在导航守卫触发时一定会执行的办法
                    this.loading=false
                    //走这个then是在物理层面上走通了，并没有确定逻辑层面，请求是否成功
                    setToken(res.token)
                    this.setRole(res.role)
                    console.log("role",this.$store.state.role)
                    sessionStorage.setItem("nickname",res.nickname)
                    this.$router.push("/")
                    console.log(res)
                }).catch((error)=>{
                    this.loading=false
                    console.log(error)
                })
                // axios({
                //     url:"http://localhost:8080/login",
                //     method:"post",
                    /*
                    data:{
                        username:this.ruleForm.name,
                        password:this.ruleForm.password
                    }*/
                    // data:this.ruleForm
                    //data需要取到一个对象，ruleForm刚好是之前确定下来的对象
                
            }
        })
      },
    }
}
</script>

<style lang="less" scoped>
//mock 模拟数据生成接口 模拟一些假接口，先得到它的格式，等后端出了接口后，只需要将请求地址换掉就可以直接使用了
//帮助前端做调试使用







//less 加强版的css less不是合法的 需要编译成css才能使用 必须规定lang="less"
//less也有结构内容，子父级选择器在内部也可以进行说明
//less 也可以定义变量，使用@符号声明
@bgColor:#5696ff;
.box-card{
    width: 500px;
    margin-top: 200px;
    .clearfix{
        h2{
            //代表box-card clearfix里面的h2
            text-align: center;
            color: @bgColor;
        }
    }
    
}


</style>