<template>
    <el-card class="box-card">
        <crumbs level1='订单管理' level2='订单列表'></crumbs>
        <el-table
            :data="tableData"
            style="width: 100%"
            border>
            <el-table-column
                label="#"
                type='index'
                width="40">
            </el-table-column>
            <el-table-column
                prop="order_number"
                label="订单编号"
                width="250">
            </el-table-column>
            <el-table-column
                prop="order_price"
                label="订单价格"
                width="80">
            </el-table-column>
            <el-table-column
                prop="order_pay"
                label="是否付款"
                width="80">
                <template slot-scope="scope">
                    <span class="el-tag el-tag--danger" v-if="scope.row.order_pay === '0'">未付款</span>
                    <span class="el-tag el-tag--success" v-else>已付款</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="is_send"
                label="是否发货">
            </el-table-column>
            <el-table-column
                label="下单时间">
                <template slot-scope="scope">
                    {{scope.row.update_time | fmtDate}}
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                        <el-button plain size="mini" type="primary" icon="el-icon-edit" slot="reference"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </el-card>
</template>

<script>
export default {
    methods: {
        handleSizeChange (val) {
            this.pagesize = val
            this.loadPage()
        },
        handleCurrentChange (val) {
            this.pagenum = val
            this.loadPage()
        },
        async loadPage () {
            const res = await this.$http.get(`orders?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            this.tableData = res.data.data.goods
            this.total = res.data.data.total
        }
    },
    data () {
        return {
            tableData: [],
            pagenum: 1,
            pagesize: 5,
            total: 0
        }
    },
    async beforeMount() {
        this.loadPage()
    },
}
</script>

<style>

</style>
