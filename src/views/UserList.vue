<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" class="el-add-button">添加用户</el-button>
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
                        prop="username"
                        label="姓名"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="role_name"
                        label="角色名称"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱"
                        width='150'>
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="电话"
                        width='150'>
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态"
                        width='80'>
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
    async beforeMount() {
        const res = await this.$http.get('users', {
            headers: {
                Authorization: window.sessionStorage.getItem('token')
            },
            params: {
                pagenum: 1,
                pagesize: 100
            }
        });
        
        const { data } = res.data
        console.log(data);
        this.tableData = data.users
    },
};
</script>

<style>
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
