<template>
    <el-card class="box-card">
        <crumbs level1='商品管理' level2='商品分类'></crumbs>
        <el-button type="success" plain class="addCate" @click="addCate">添加分类</el-button>
        <el-dialog title="添加商品分类" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="form.cat_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类" :label-width="formLabelWidth">
                     <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        v-model="selectedOptions"
                        :props="defaultProp"
                        change-on-select>
                    </el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="subCate">确 定</el-button>
            </div>
        </el-dialog>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-tree-grid 
                prop="cat_name" 
                label="分类名称" 
                width="180" 
                treeKey="cat_id" 
                parentKey="cat_pid" 
                levelKey="cat_level" 
                childKey="children">
            </el-tree-grid>
            <el-table-column
                label="级别"
                width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.cat_level === 0">一级</span>
                    <span v-else-if="scope.row.cat_level === 1">二级</span>
                    <span v-if="scope.row.cat_level === 2">三级</span>
                </template>
            </el-table-column>
            <el-table-column
                label="是否有效">
                <template slot-scope="scope">
                    <span v-if="scope.row.cat_deleted">无效</span>
                    <span v-else>有效</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
            <template slot-scope="scope">
                <el-button plain size="mini" type="primary" icon="el-icon-edit" circle slot="reference" @click="toEditCatePage(scope.row)"></el-button>
                <el-button plain size="mini" type="danger" icon="el-icon-delete" circle slot="reference" @click="delCate(scope.row)"></el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 修改分类页 -->
        <el-dialog title="修改商品分类" :visible.sync="dialogFormEdit">
        <el-form :model="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="cat_name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormEdit = false">取 消</el-button>
            <el-button type="primary" @click="editCate">确 定</el-button>
        </div>
        </el-dialog>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </el-card>
</template>

<script>
const ElTreeGrid = require('element-tree-grid')
export default {
    components: {
        ElTreeGrid
    },
    data () {
        return {
            tableData: [],
            pagenum: 1,
            pagesize: 5,
            total: 0,
            // 添加分类相关
            dialogFormVisible: false,
            formLabelWidth: '150px',
            form: {
                cat_pid: -1,
                cat_name: '',
                cat_level: -1
            },
            options: [],
            selectedOptions: [],
            defaultProp: {
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            // 修改分类
            dialogFormEdit: false,
            cat_name: ''
        }
    },
    
    beforeMount() {
        this.loadPage()
    },
    methods: {
        async loadPage () {
            const res = await this.$http.get(`categories/?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            this.tableData = res.data.data.result
            this.total = res.data.data.total
        },
        handleSizeChange (val) {
            this.pagesize = val
            this.loadPage()
        },
        handleCurrentChange (val) {
            this.pagenum = val
            this.loadPage()
        },
        // 去添加分类页
        async addCate () {
            this.dialogFormVisible = true
            const res = await this.$http.get('categories/?type=2')
            this.options = res.data.data
        },
        // 提交添加的分类
        async subCate () {
            const arr = this.selectedOptions
            if(arr.length === 0) {
                this.form.cat_pid = 0;
            }else if (arr.length === 1) {
                this.form.cat_pid = arr[0]
            }else {
                this.form.cat_pid = arr[1]
            }
            this.form.cat_level = arr.length
            const res = await this.$http.post('categories', this.form)
            if(res.data.meta.status === 201) {
                this.dialogFormVisible = false
                this.loadPage()
                this.form.cat_name = ''
            }

        },
        // 显示修改页面
        toEditCatePage (scope) {
            this.dialogFormEdit = true
            this.form = scope
            this.cat_name = this.form.cat_name
        },
        // 修改
        async editCate () {
            const res = await this.$http.put(`categories/${this.form.cat_id}`, {cat_name: this.cat_name})
            if(res.data.meta.status === 200) {
                this.$message.success('修改成功')
                this.dialogFormEdit = false
                this.loadPage()
            }
        },
        delCate (scope) {
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`categories/${scope.cat_id}`)
                    if(res.data.meta.status === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                            
                        });
                    }
                    this.loadPage()
                    
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
        }
    },
    watch: {
        dialogFormEdit (newVal) {
            if(newVal === false) this.form = {cat_pid: -1,cat_name: '',cat_level: -1}
        },
        dialogFormVisible (newVal) {
            if(newVal === false) this.form = {cat_pid: -1,cat_name: '',cat_level: -1}
        }
    }

}
</script>

<style>
.addCate {
    float: left;
    margin-top: 15px;
}
.el-table__header td,.el-table__header th{
    line-height: 30px;
}
</style>
