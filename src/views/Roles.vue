<template>
    <div>
        <crumbs level1='权限管理' level2='角色列表'></crumbs>
        <el-button type="warning" class="addRoles">添加角色</el-button>
        <template>
            <el-table
                :data="tableData"
                style="width: 100%">
                <!-- 展开列 -->
                <el-table-column type="expand">
                <template slot-scope="props" v-if="props.row.children">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-row
                            v-for="item1 in props.row.children"
                            :key="item1.id">
                            <el-col :span="4">
                                <div class="grid-content bg-purple">
                                    <el-tag
                                        closable
                                        type="success"
                                        tag-position="left"
                                        @close='closeTag(props.row, item1.id)'>
                                        {{item1.authName}}
                                    </el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </div>
                            </el-col>
                            <el-col :span="20">
                                <div class="grid-content bg-purple-light">
                                    <el-row v-for="item2 in item1.children" :key="item2.id">
                                        <el-col :span='4'>
                                            <el-tag
                                                closable
                                                type="error"
                                                tag-position="left"
                                                 @close='closeTag(props.row, item2.id)'>
                                                {{item2.authName}}
                                            </el-tag>
                                            <i class="el-icon-arrow-right"></i>
                                        </el-col>
                                        <el-col :span='20'>
                                            <el-tag
                                                v-for="item3 in item2.children"
                                                :key="item3.id"
                                                closable
                                                type="danger"
                                                tag-position="left"
                                                @close='closeTag(props.row,item3.id)'>
                                                {{item3.authName}}
                                            </el-tag>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row v-if="props.row.children.length == '0'">
                            <el-col :span="24" style="text-align: center">未分配权限</el-col>
                        </el-row>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column
                    label="#"
                    type='index'>
                </el-table-column>
                <el-table-column
                label="角色名称"
                prop="roleName"
                width='180'>
                </el-table-column>
                <el-table-column
                label="角色描述"
                prop="roleDesc"
                width='180'>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button plain size="mini" type="primary" icon="el-icon-edit" circle slot="reference"></el-button>
                        <el-button plain size="mini" type="danger" icon="el-icon-delete" circle slot="reference"></el-button>
                        <el-button plain size="mini" type="success" icon="el-icon-check" circle slot="reference" @click="showRoleList(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
                <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                    <el-tree
                        ref="tree"
                        :data="rolesList"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="expandArr"
                        :default-checked-keys="checkArr"
                        :props="defaultProps"
                        default-expand-all>
                    </el-tree>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editRolePower">确 定</el-button>
                    </span>
                </el-dialog>
        </template>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [],
            dialogVisible: false,
            // 树形结构数据
            expandArr: [],
            checkArr: [],
            rolesList: [],
            defaultProps: {
                children: 'children',
                label: 'authName'
            },
            currentRoleId: -1
        }
    },
    async beforeMount () {
        this.loadPage();
    },
    methods: {
        async loadPage () {
            const res = await this.$http.get('roles',{
             headers: {
                    Authorization: window.sessionStorage.getItem('token')
                }
            });
            this.tableData = res.data.data
        },
        async closeTag (role,roleId) {
            const res = await this.$http.delete(`roles/${role.id}/rights/${roleId}`)
            const {meta: {msg, status}} = res.data
            if (status === 200) {
                role.children = res.data.data
            }
        },
        async showRoleList (role) {
            this.currentRoleId = role.id
            // 打开角色分配弹窗
            this.dialogVisible = true
            // 获取所有权限列表
            const rolesList = await this.$http.get('rights/tree')
            this.rolesList = rolesList.data.data
            const arr = []
            // 获取当前角色的权限
            role.children.forEach(item1 => {
                item1.children.forEach(item2 => {
                    item2.children.forEach(item3 => {
                        arr.push(item3.id)
                    })
                })
            });
            this.checkArr = arr
            const res = await this.$http.get(`roles/${role.id}`)
        },
        async editRolePower () {
            // 获取已被选择的权限
            const arr1 = this.$refs.tree.getCheckedKeys()
            const arr2 = this.$refs.tree.getHalfCheckedKeys()
            let arr = []
            arr = [...arr1, ...arr2]
            const res = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
                rids: arr.join()
            })
            // console.log(res.status);
            if(res.status === 200) {
                this.$message.success('角色权限更新成功')
                this.dialogVisible = false
                this.loadPage()
            }
        }
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
.el-table.rolesTable {
    top: 10px;
}
.has-gutter {
    line-height: 20px;
}
</style>
