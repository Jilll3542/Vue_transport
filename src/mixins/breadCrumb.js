export default {
    data() {
        // breadCrumb:this.$route.meta
        return {
            breadList: []
        }

    },
    created() {
        this.getBreadCrumb()
    },
    watch: {
        //监听data，计算属性也可以监听，props也能监听， $route
        $route() {
            this.getBreadCrumb()
        }
    },
    methods: {
        getBreadCrumb() {
            this.breadList = this.$route.meta.bread || []
            //this.$route.meta.bread存在的话，就取前面的，如果前面没值，就取后面的内容
        }
    }
}