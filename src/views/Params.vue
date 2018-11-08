<template>
    <el-card class="box-card">
         <crumbs level1='商品管理' level2='分类参数'></crumbs>
         <el-alert
            title="注意:只允许为第三级分类设置参数"
            type="warning"
            show-icon
            class="tishi">
        </el-alert>
        <div class="fenlei">
            <span>请选择商品分类</span>
            <el-cascader
                :options="cateList"
                :show-all-levels="true"
                :props='defaultProps'
                expand-trigger='hover'
                :change-on-select='false'
                v-model="selectedCate"
                >
            </el-cascader>
        </div>
        <el-tabs v-model="activeName" class="peizhi" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="1">
                <el-button type="success">添加参数名称</el-button>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-tag
                            :key="index"
                            v-for="(tag,index) in props.row.attr_vals"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="inputVisible = true">+ New Tag</el-button>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="#"
                    type='index'>
                    </el-table-column>
                    <el-table-column
                    label="属性名称"
                    prop="attr_name">
                    </el-table-column>
                    <el-table-column
                    label="操作">
                        <template slot-scope="scope">
                            <el-button plain size="mini" type="primary" icon="el-icon-edit" circle slot="reference"></el-button>
                            <el-button plain size="mini" type="danger" icon="el-icon-delete" circle slot="reference"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="2">
                <el-button type="success">添加参数</el-button>
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                    label="#"
                    type='index'
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="attr_name"
                    label="属性名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="attr_vals"
                    label="属性值">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button plain size="mini" type="primary" icon="el-icon-edit" circle slot="reference"></el-button>
                        <el-button plain size="mini" type="danger" icon="el-icon-delete" circle slot="reference"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
export default {
    data () {
        return {
            tableData: [],
            cateList: [],
            activeName: '1',
            defaultProps: {
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            selectedCate: [],
            isSelected: false,
            paramsList: [],
            inputVisible: false,
            inputValue: ''
        }
    },
    methods: {
        handleInputConfirm () {
            this.inputVisible = false
        },
        async handleClick () {
            const sel = this.activeName === '1' ? 'many' : 'only'
            if(this.isSelected) {
                const res = await this.$http.get(`categories/${this.selectedCate[this.selectedCate.length-1]}/attributes?sel=${sel}`)
                this.tableData = res.data.data
                if (this.activeName === '1') {
                    this.tableData.map( e => { e.attr_vals = e.attr_vals.split(',') || [] } ) 
                }
                console.log(this.tableData);
            }else {
                this.$message.error('请选择三级分类')
            }
        },
        handleClose () {
            
        },
        
    },
    async beforeMount () {
        const res = await this.$http.get('categories')
        this.cateList = res.data.data
    },
    updated() {
        if(this.selectedCate.length) this.isSelected = true
    },
    
}
</script>

<style>
.tishi {
    margin-top: 20px;
    line-height: 1;
}
.fenlei {
    margin-top: 10px;
    line-height: 1;
    text-align: left;
    /* float: left; */
}
.el-main {
    line-height: 1;
}
div {
    text-align: left;
}
</style>
