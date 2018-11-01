<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="warning" class="addRoles">添加角色</el-button>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="id"
                label="#"
                width="60">
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="角色名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="roleDesc"
                label="描述"
                width='150'>
            </el-table-column>
            <el-table-column
                label="操作">
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
    async beforeMount () {
        const res = await this.$http.get('roles',{
             headers: {
                Authorization: window.sessionStorage.getItem('token')
            }
        });
        this.tableData = res.data.data
        console.log(res);
    }
};
</script>

<style>
.addRoles {
  float: left;
  margin-top: 10px;
}
.el-main {
  line-height: 70px;
}
.el-input-group--append {
  margin-top: 10px;
}
.el-input-group__append {
  display: inline-block;
  height: 38px;
  line-height: 38px;
  display: flex;
  justify-content: center;
}
.el-input__inner {
  float: left;
  width: 500px;
}
.el-add-button {
  position: relative;
  top: -70px;
  left: -20px;
}
.el-table {
  top: -50px;
}
.has-gutter {
    line-height: 20px;
}
</style>
