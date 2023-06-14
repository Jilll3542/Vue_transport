<template>
    <div>
        我是订单列表页面
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>订单列表</el-breadcrumb-item> -->
        </el-breadcrumb>
        <el-card class="mt">
            <el-row>
                <el-col :span="6">
                    <el-input placeholder="请输入订单号或者客户名称" v-model="params.keyword" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6" :offset="12" class="operate">
                    <el-button type="primary" @click="visible=true">新建订单</el-button>
                    <el-button :disabled="!select.length" @click="operate(1)">审核</el-button>
                    <el-button :disabled="!select.length" @click="operate(2)">修改</el-button>
                    <el-button :disabled="!select.length" @click="operate(3)">作废</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" width="50" label="序号">
                </el-table-column>
                <el-table-column prop="id" label="订单号" width="100" fixed="left"></el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">待审核</span>
                        <span v-else-if="scope.row.status == 2">已审核</span>
                        <span v-else-if="scope.row.status == 3">审核通过</span>
                        <span v-else>审核拒绝</span>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="下单时间" width="180"></el-table-column>
                <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
                <el-table-column prop="start" label="起始城市" width="180"></el-table-column>
                <el-table-column prop="end" label="目的城市" width="180"></el-table-column>
                <el-table-column prop="cargo" label="货物名称" width="180"></el-table-column>
                <el-table-column prop="count" label="件数" width="100"></el-table-column>
                <el-table-column prop="unit" label="单位" width="50"></el-table-column>
                <el-table-column prop="price" label="运费" width="180"></el-table-column>
                <el-table-column prop="from" label="订单来源" width="180"></el-table-column>
                <el-table-column prop="pay" label="是否支付" width="180">
                    <template slot-scope="scope">
                        {{ scope.row.pay == 1 ? "已支付" : "未支付" }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="180">
                    <template slot-scope="scope">
                        <!-- scope是拿到传值的意思 -->
                        <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="deletes(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="params.page" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total" class="mt fr mb">
            </el-pagination>
        </el-card>
        <orders-modal :visible="visible" @hide="visible=false" @reload="loadData"></orders-modal>
    </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb"
import { post } from "@/utils/http";
import OrdersModal from "./OrdersModal.vue";
import { mapMutations } from "vuex"; 
/**你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，
 * 或者使用 mapMutations 辅助函数
 * 将组件中的 methods 
 * 映射为 store.commit 调用（需要在根节点注入 store）。 */

export default {
    //将组件封装起来
    mixins: [breadCrumb],
    //data里的数据如果没有就可以加入，有数据就可以触发
    data() {
        return {
            visible:false,
            loading: true,
            tableData: [],
            total: 0,
            params: {
                page: 1,
                pageSize: 10,
                keyword: ""
            },
            select: [],
        }
    },
    created() {
        //不要在生命周期中写逻辑，要在外面封装好后才能
        this.loadData()
    },
   
    components:{
        OrdersModal
    },
    methods: {
        async loadData() {
            const res = await post("/orderList", this.params)
            this.tableData = res.data.list
            //拿到数据，停止加载
            this.loading = false,
            this.total = res.data.total
        },
        handleSizeChange(pageSize) {
            // 每页条数发生变化
            this.params.pageSize = pageSize;
            this.loadData()
        },
        handleCurrentChange(page) {
            // console.log("当前页码发生变化")
            this.params.page = page;
            this.loadData()
        },
        handleSelectionChange(selection) {
            this.select = selection
        },
        operate(type) {
            console.log(type)
            let nos = this.select.map(item => item.id)
            this.$notify({
                title: '操作成功',
                message: nos,
                type: 'success'
            })
        },
        ...mapMutations(["setRow"]),
        edit(row){
            this.setRow(row)
            this.visible=true
        }
        /*
        deletes(id) {
            post("/delete", { id }).then(() => {
                this.$message({
                    message: '恭喜你，这是一条成功消息',
                    type: 'success'
                });
                //删除数据后需要刷新一下
                this.loadData()
            })
        }
        */
    },
}
</script>

<style lang="less" scoped>
.operate {
    text-align: right;
}
</style>