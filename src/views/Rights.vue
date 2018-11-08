<template>
    <div>
        <crumbs level1='权限管理' level2='权限列表'></crumbs>
        <el-table
            class="powerList"
            :data="tableData"
            border
            height='600'
            style="width: 100%">
            <el-table-column
            label="#"
            width="80"
            type='index'>
            </el-table-column>
            <el-table-column
            prop="authName"
            label="权限名称"
            width="120">
            </el-table-column>
            <el-table-column
            prop="path"
            label="路径"
            width="120">
            </el-table-column>
            <el-table-column
            label="层级">
            
                <template slot-scope="scope">
                    <span v-if="scope.row.level === '0'">一级</span>
                    <span v-else-if="scope.row.level === '1'">二级</span>
                    <span v-if="scope.row.level === '2'">三级</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [] 
        }
    },
    async beforeMount() {
        const res = await this.$http.get('rights/list')
        this.tableData = res.data.data
        console.log(res);
    },
    mounted () {

    }
}
</script>

<style>
.powerList {
    margin-top: 20px;
}
.el-table__header td,.el-table__header th{
    line-height: 30px;
}
</style>
