<template>
    <el-card class="box-card">
        <crumbs level1='商品管理' level2='商品列表'></crumbs>
        <template>
            <el-steps :space="300" :active="active" finish-status="success" :align-center='true'>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
            </el-steps>
            <el-tabs v-model="activeName" @tab-click="handleClick" tab-position='left' class="elTabs"> 

                <el-tab-pane label="基本信息" name="1">

                    <el-form label-position="top" label-width="80px" :model="form">
                        <el-form-item label="商品名称">
                            <el-input v-model="form.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <el-input v-model="form.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量">
                            <el-input v-model="form.goods_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量">
                            <el-input v-model="form.goods_number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                              <el-cascader
                                :options="cateList"
                                v-model="selectedCate"
                                @change="cateChange"
                                :props='defaultProps'
                                expand-trigger='hover'
                                filterable
                                >
                                
                            </el-cascader>
                        </el-form-item>
                    </el-form>

                </el-tab-pane>

                <el-tab-pane label="商品参数" name="2">
                    <div v-for="(item, index) in dtParams" :key="index">
                        <p>{{item.attr_name}}</p>
                        <el-checkbox-group v-model="dtParamsChange">
                            <el-checkbox 
                            :label="item2" 
                            border 
                            size="medium" 
                            checked 
                            @change="changeDtParams"
                            v-for="(item2, index) in item.attr_vals" :key="index"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                    
                </el-tab-pane>
                <el-tab-pane label="商品属性" name="3">
                    <el-form label-position="top" label-width="80px">
                        <el-form-item :label="item.attr_name" v-for="(item, index) in staticParams" :key="index">
                            <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="商品图片" name="4">
                    <el-upload
                        class="upload-demo"
                        action="http://localhost:8888/api/private/v1/upload"
                        :headers="headers"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :on-preview="handlePreview"
                        :on-success="handleSuccess"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-tab-pane>
                <el-tab-pane label="商品内容" name="5">
                    <el-button type="primary"
                        @click="addGoods()"
                        >添加商品</el-button>
                    <!-- 富文本编辑器 -->
                    <quill-editor
                        class="quill"
                        v-model="form.goods_introduce">
                    </quill-editor>
                </el-tab-pane>
            </el-tabs>
        </template>
    </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
    components: {
        quillEditor
    },
    data () {
        return {
            form: {
                goods_name: '',
                goods_price: '',
                goods_weight: '',
                goods_number: '',
                goods_introduce: '',
                // 以为','分割的分类列表
                goods_cat: '',
                // 上传的图片临时路径（对象）	{pic:图片的临时路径}
                pics: [],
                // attrs 是商品的动态参数和静态参数
                attrs: []
            },
            // 基本信息数据
            activeName: '1',
            active: 1,
            goodsForm: {},
            cateList: [],
            selectedCate: [],
            defaultProps: {
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            // 商品参数
            dtParams: [],
            cateId: 0,
            staticParams: [],
            dtParamsChange: [],
            // 上传图片
            fileList: [],
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        }
    },
    methods: {
        // 添加商品
        async addGoods() {
            this.form.goods_cat = this.selectedCate.join(',')
            this.form.attrs = [...this.dtParams,...this.staticParams]
            const res = await this.$http.post('goods', this.form)
            if(res.data.meta.status === 201) {
                this.$message.success('添加商品成功')
                this.$router.push('goods')
            }
        },
        // 图片上传
        handleSuccess (val) {
            this.form.pics.push({
                pic: val.data.tmp_path
            })
        },
        handlePreview () {

        },
        handleRemove (val) {
            
            const index = this.form.pics.findIndex(item => {
                return item.pic === val.response.data.tmp_path
            })
            this.form.pics.splice(index, 1)
        },
        changeDtParams () {
        },
        // 步骤改变
        async handleClick () {
            this.active = parseInt(this.activeName)
            if(this.active === 2 || this.active === 3) {
                if(this.selectedCate.length === 0) this.$message.error('请选择三级分类')
            }
            this.cateId = this.selectedCate[2]
            const sel = this.active === 2 ? 'many' : 'only'
            const res = await this.$http.get(`categories/${this.cateId}/attributes?sel=${sel}`)
            if(this.active === 2) {
                this.dtParams = res.data.data || []
                this.dtParams.map( e => { e.attr_vals = e.attr_vals.split(',') || [] } ) 
            }else {
                this.staticParams = res.data.data
            }
            
        },
        // 分类级联选择器改变
        cateChange () {

        }
    },
    async beforeMount () {
        const res = await this.$http.get('categories')
        this.cateList = res.data.data
    },
}
</script>

<style>
.el-main {
    line-height: 1;
    text-align: left;
}
.el-steps--horizontal {
    margin-top: 20px;

}
.el-step__title {
    font-size: 12px;
}
.elTabs {
    height: 480px;
    overflow: auto;
}
.ql-editor {
  min-height: 200px;
}
</style>
