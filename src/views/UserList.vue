<template>
    <div>
        <!-- <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb> -->
        <crumbs level1='用户管理' level2='用户列表'></crumbs>
        <el-input placeholder="请输入内容" class="input-with-select searchUsername" v-model="searchName">
            <el-button slot="append" icon="el-icon-search" @click="loadUserList(true,searchName)"></el-button>
        </el-input>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <!-- 添加用户 -->
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
        </el-dialog>
        <!-- 修改用户 -->
        <el-dialog title="修改用户" :visible.sync="dialogFormEditUser">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.prevent="dialogFormEditUser=false">取 消</el-button>
            <el-button type="primary" @click="editUser">确 定</el-button>
        </div>
        </el-dialog>
        <!-- 分配角色 -->
        <el-dialog title="分配角色" :visible.sync="dialogFormRole">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                {{formData.username}}
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="roles">
                <el-option label="请选择" :value="-1" disabled></el-option>
                <el-option :label="item.roleName" v-for="(item, index) in rolesArr" :key="index" :value="item.id">{{item.roleName}}</el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUserRole">确 定</el-button>
        </div>
        </el-dialog>
        <el-button type="success" class="el-add-button" @click="dialogFormVisible = true">添加用户</el-button>
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                class="userTable">
                <el-table-column
                    type='index'
                    label="#"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="姓名"
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
                    label="创建时间"
                    width='150'>
                    <template slot-scope="scope">
                        {{scope.row.mg_time | fmtDate}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态"
                    width='80'>
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.mg_state"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="changeStatus(scope.row.id,scope.row.mg_state)"
                            >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button plain size="mini" type="primary" icon="el-icon-edit" circle slot="reference" @click='toEditUserPage(scope.row)'></el-button>
                        <el-button plain size="mini" type="danger" icon="el-icon-delete" circle slot="reference" @click='delUser(scope.row.id)'></el-button>
                        <el-button plain size="mini" type="success" icon="el-icon-check" circle slot="reference" @click='allotRole(scope.row)'></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagenum"
                :page-sizes="[2, 4, 6, 8]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            // 分页相关
            pagenum: 1,
            pagesize: 2,
            total: 0,
            // 添加页面
            dialogFormVisible: false,
            form: {},
            formLabelWidth: '120px',
            // 搜索
            searchName: '',
            // 修改用户
            dialogFormEditUser: false,
            currentUserId: -1,
            // 分配角色
            dialogFormRole: false,
            formData: {},
            rolesArr: [],
            roles: -1
            
        };
    },
    async beforeMount() {
        this.loadUserList();
    },
    methods: {
        async editUserRole () {
            const res = await this.$http.put(`users/${this.formData.id}/role`, {rid: this.roles});
            this.loadUserList();
            this.dialogFormRole = false;
        },
        async allotRole (val) {
            this.dialogFormRole = true;
            this.formData = JSON.parse(JSON.stringify(val));
            const res = await this.$http.get('roles')
            this.rolesArr = res.data.data
            const thisUserRole = await this.$http.get('users/' + this.formData.id);
            this.roles = thisUserRole.data.data.rid;

        },
        async delUser(userId) {
            const res = await this.$http.delete(`users/${userId}`);
            this.loadUserList();
            if (res.status === 200) {
                this.pagenum = 1
                this.$message.success(res.data.meta.msg)
            }else {
                this.$message.error(res.data.meta.msg)
            }
        },
        changeStatus (id, status) {
            this.$http.put(`users/${id}/state/${status}`).then(res => {this.$message.success('状态修改成功')})
        },
        toEditUserPage (val) {
            this.form = JSON.parse(JSON.stringify(val));
            this.currentUserId = val.id;
            this.dialogFormEditUser = true;
        },
        handleSizeChange (val) {
            this.pagesize = val;
        },
        handleCurrentChange(val) {
            this.pagenum = val;
        },
        async editUser() {
            const res = await this.$http.put(`users/${this.currentUserId}`, this.form);
            if (res.data.meta.status === 200) {
                this.loadUserList();
                this.dialogFormEditUser = false
                this.$message.success(res.data.meta.msg)
            }else {
                this.$message.error(res.data.meta.msg)
            }
            
        },
        async loadUserList (flag,searchName) {
            if(flag) this.pagenum = 1
            
            this.$http.defaults.headers.common['Authorization'] = window.sessionStorage.getItem("token")
            const res = await this.$http.get("users", {
                params: {
                    pagenum: this.pagenum,
                    pagesize: this.pagesize,
                    query: searchName
                }
                });
                const { data } = res.data;
                this.total = data.total
                this.tableData = data.users;
        },
        async addUser () {
            const res = await this.$http.post('users',this.form)
            this.dialogFormVisible = false
            this.loadUserList()
        }
    },
    watch: {
        pagenum () {
            this.loadUserList();
        },
        pagesize () {
            this.loadUserList();
        },
        dialogFormVisible (newVal) {
            if(!newVal) this.form = {}
        },
        dialogFormEditUser (newVal) {
            if(!newVal) this.form = {}
        }
    }
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
.searchUsername > .el-input__inner {
  float: left;
  width: 500px;
}
.el-add-button {
  position: relative;
  top: -70px;
  left: -20px;
}
.el-table.userTable {
  top: -65px;
}
.has-gutter {
  line-height: 20px;
}
</style>
