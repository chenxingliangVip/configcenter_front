<template>
    <div class="BuyTask">
        <!-- 头部搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
				<el-input clearable v-model="searchInput1" placeholder="采购号"></el-input>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput2" placeholder="类别">
                    <el-option label="硬件" value="硬件"></el-option>
                    <el-option label="软件" value="软件"></el-option>
                    <el-option label="服务" value="服务"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput3" placeholder="供应商"></el-input>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput4" placeholder="状态">
                    <el-option label="待审核" value="待审核"></el-option>
                    <el-option label="执行中" value="执行中"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
				<el-date-picker v-model="searchInput5" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</div>
			<div class="">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
                <span @click="add()"><i class="el-icon-circle-plus-outline"></i> 新建采购</span>
			</div>
        </div>

        <!-- table -->
        <sys-table  
            :isMultipleSelection="false" 
            :tableData="tableData" 
            :tableLoading="tableLoading" 
            :tableHeader="tableHeader"
            :scopeWidth="150"
        >
            <template slot-scope="scope" slot="operate">
                <el-button @click="goDetail(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            </template>
        </sys-table>

        <!-- 新建采购弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '采购'" :visible.sync="addDialog" v-if="addDialog">
                <Add ref="add" slot="content" @addForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
                </template>
            </popout>
        </div>
        <!-- 查看弹框 -->
        <div class="zll-dialog">
            <popout title="查看采购" :visible.sync="goDetailDialog" v-if="goDetailDialog">
                <Detail ref="add" slot="content"></Detail>
                <template slot="bottom">
                    <p class="zll-botton" @click="goDetailDialog = false">确 定</p>
                </template>
            </popout>
        </div>
    </div>
</template>
<script>
    import Add from './add'
    import Detail from './detail'
    export default {
        data(){
            return {
                title: '',
                tableLoading:true, //table刷新
                searchInput1: '',//采购号
                searchInput2: '',//类别
                searchInput3: '',//供应商
                searchInput4: '',//状态
                searchInput5: '',//日期

                addDialog: false, //新建采购弹框
                goDetailDialog: false, //查看弹框
                tableData: [{//表格数据
                    tableData1: '2016-05-03',//采购日期
                    tableData2: '采购号',//采购号
                    tableData3: '供应商',//供应商
                    tableData4: '采购名称',//采购名称
                    tableData5: 111,//总额
                    tableData6: '交货',//交货
                    tableData7: '未开票',//未开票
                    tableData8: '待付款',//待付款
                    tableData9: '执行中',//状态
                }],
                tableHeader:[],
            }
        },
        methods: {
            getTableList(){//获取表格数据
                this.tableLoading = true;
                setTimeout(()=>{
                    for (let i = 0; i < this.tableData.length; i++) {
                        this.tableData[i]['index'] = i +1
                    }
                    this.tableHeader =  [
                        {"columnValue": "index", "columnName": "序号", 'width': '50'},
                        {"columnValue": "tableData1", "columnName": "采购日期", isSortable: true },
                        {"columnValue": "tableData2", "columnName": "采购号"},
                        {"columnValue": "tableData3", "columnName": "供应商"},
                        {"columnValue": "tableData4", "columnName": "采购名称"},
                        {"columnValue": "tableData5", "columnName": "总额", isSortable: true },
                        {"columnValue": "tableData6", "columnName": "交货"},
                        {"columnValue": "tableData7", "columnName": "未开票"},
                        {"columnValue": "tableData8", "columnName": "待付款"},
                        {"columnValue": "tableData9", "columnName": "状态"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            goDetail(){
                this.goDetailDialog = true
            },
            add() {
                this.title = '新建'
                this.addDialog = true
            },
            edit() {
                this.title = '编辑'
                this.addDialog = true
            },
            getFormData(data) {
                console.log(data)
                this.addDialog = false
            },
            searchReset() { //搜索重置
                this.searchInput1 = ''
                this.searchInput2 = ''
                this.searchInput3 = ''
                this.searchInput4 = ''
                this.searchInput5 = ''
                this.getTableList()
            },
        },
        mounted(){
            this.getTableList();//显示table
        },
        components:{
            Add,
            Detail
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/SearchTop.scss";
</style>