<template>
    <el-card class="box-card">
        <crumbs level1='商品管理' level2='商品列表'></crumbs>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="searchGoods" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" plain class="addBtn" @click="addGoodBtn">添加商品</el-button>
        </div>
         <el-table
            :data="tableData"
            height="500"
            border
            style="width: 100%">
            <el-table-column
            label="#"
            type='index'
            width="80">
            </el-table-column>
            <el-table-column
            prop="goods_name"
            label="商品名称"
            width="700">
            </el-table-column>
            <el-table-column
            prop="goods_price"
            label="商品价格（元）">
            </el-table-column>
            <el-table-column
            prop="goods_weight"
            label="商品重量">
            </el-table-column>
            <el-table-column
            label="创建日期">
                <template slot-scope="scope">
                    {{scope.row.add_time | fmtDate}}
                </template>
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button plain size="mini" type="primary" icon="el-icon-edit" circle slot="reference"></el-button>
                <el-button plain size="mini" type="danger" icon="el-icon-delete" circle slot="reference" @click='delGood(scope.row)'></el-button>
            </template>
            </el-table-column>
        </el-table>
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </el-card>
</template>

<script>
export default {
    data () {
        return {
            searchGoods: '',
            tableData: [],
            pagenum: 1,
            pagesize: 10,
            total: 0
        }
    },
    beforeMount () {
        this.loadPage();
    },
    methods: {
        delGood (goods) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`goods/${goods.goods_id}`)
                    if (res.data.meta.status !== 200) return
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.loadPage();
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
        },
        addGoodBtn () {
            this.$router.push('/goodsadd')
        },
        handleSizeChange (val) {
            this.pagesize = val
            this.loadPage()
        },
        handleCurrentChange (val) {
            this.pagenum = val
            this.loadPage()
        },
        async loadPage () {
            const res = await this.$http.get(`goods/?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            this.tableData = res.data.data.goods
            const data = res.data.data
            this.total = data.total
        }
    }
}
</script>

<style>
.input-with-select {
    float: left;
    width: 500px;
}
.el-table__header td,.el-table__header th{
    line-height: 30px;
}
.el-main {
    line-height: 0;
}
.addBtn {
    float: left;
    margin-left: 10px;
}
</style>
