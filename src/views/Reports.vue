<template>
    <el-card class="box-card">
        <crumbs level1='数据统计' level2='数据报表'></crumbs>
        <div ref="main" style="width: 600px;height:400px;"></div>
    </el-card>
</template>

<script>
import Echarts from 'echarts'
export default {
    async mounted () {
        var myChart = Echarts.init(this.$refs.main)
        const res = await this.$http.get('reports/type/1')
        const obj = {
            title: {
                text: ''
            }, 
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
        }
        this.option = {...obj, ...res.data.data}
        myChart.setOption(this.option);
    },
    data () {
        return {
            option: {
                
            }
        }
    }
}
</script>

<style>

</style>
