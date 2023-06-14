<template>
    <div>
        <input v-model="type" :type="getType(type)">
    </div>
</template>

<script>
    export default {
        data(){
            return{
                type:""
            }
        },
        methods:{
            getType(time){
                if(typeof(time)=='object'){
                    let stringDate=`${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()}`
                    console.log(stringDate)
                }else if(typeof(time)=='string'){
                    let objDate=new Date(time.replace(/-/g, ":"))
                    console.log(objDate)
                }
            }
           


        }
    }
</script>

<style scoped>

</style>