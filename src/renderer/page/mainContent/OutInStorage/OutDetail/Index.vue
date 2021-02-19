<template>
    <div class="OutStorage">
        <!-- 头部搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
                <el-input clearable v-model="searchInput1" placeholder="出库号"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput2" placeholder="客户名称"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput3" placeholder="合同号"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput4" placeholder="出库人"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput5" placeholder="领送人"></el-input>
			</div>
			<div class="input_flex">
                <el-date-picker v-model="searchInput6" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</div>
			<div class="input_flex">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
        </div>
        <!-- table -->
        <sys-table  
            :isMultipleSelection="false" 
            :tableData="tableData" 
            :tableLoading="tableLoading" 
            :tableHeader="tableHeader"
            :scopeWidth="120"
        >
            <template slot-scope="scope" slot="operate">
                <el-button @click="goDetail(scope.row)" type="text" size="small">查看</el-button>
            </template>
        </sys-table>

        <!-- 查看弹框 -->
        <div class="zll-dialog">
            <popout :title="'查看' + title" :visible.sync="addDialog" v-if="addDialog">
                <Add ref="add" slot="content" :type="title"></Add>
                <template slot="bottom">
                    <p class="zll-botton" @click="addDialog = false"> 确 定</p>
                </template>
            </popout>
        </div>
    </div>
</template>

<script>
    import Add from './add'
    export default {
        data(){
            return {
                title: '',
                tableLoading:true, //table刷新
                searchInput1: '',
                searchInput2: '',
                searchInput3: '',
                searchInput4: '',
                searchInput5: '',
                searchInput6: '',
                tableData: [{
                    tableNum1: '出库日期',//出库日期
                    tableNum2: '合同号',//出库号
                    tableNum3: '客户名称',//客户名称
                    tableNum4: '合同号',//合同号
                    tableNum5: '合同名称',//合同名称
                    tableNum6: '出库数',//出库数
                    tableNum7: '出库人',//出库人
                    tableNum8: '领送人',//领送人
                    type: '软件出库',
                }, {
                    tableNum1: '出库日期',//出库日期
                    tableNum2: '合同号',//出库号
                    tableNum3: '客户名称',//客户名称
                    tableNum4: '合同号',//合同号
                    tableNum5: '合同名称',//合同名称
                    tableNum6: '出库数',//出库数
                    tableNum7: '出库人',//出库人
                    tableNum8: '领送人',//领送人
                    type: '硬件出库',
                }],
                tableHeader:[],
                addDialog: false, //查看弹框
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
                        {"columnValue": "tableNum1", "columnName": "出库日期", isSortable: true},
                        {"columnValue": "tableNum2", "columnName": "出库号"},
                        {"columnValue": "tableNum3", "columnName": "客户名称"},
                        {"columnValue": "tableNum4", "columnName": "合同号"},
                        {"columnValue": "tableNum5", "columnName": "合同名称"},
                        {"columnValue": "tableNum6", "columnName": "出库数", width: "100", isSortable: true},
                        {"columnValue": "tableNum7", "columnName": "出库人", width: "100"},
                        {"columnValue": "tableNum8", "columnName": "领送人", width: "100"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            goDetail(row){ //查看
                if(row.type == '硬件出库') {
                    this.title = '硬件出库'
                }else {
                    this.title = '软件出库'
                }
                this.addDialog = true
            },
            searchReset() {//搜索重置
                this.searchInput1 = ''
                this.searchInput2 = ''
                this.searchInput3 = ''
                this.searchInput4 = ''
                this.searchInput5 = ''
                this.searchInput6 = ''
                this.getTableList()
            },
        },
        mounted(){
            this.getTableList();//显示table
        },
        components: {
            Add,
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/style/SearchTop.scss";
    .goDetail {
        padding: 20px 30px;    
        box-shadow: 0 0 10px #ccc;
        margin-top: 50px;
        .el-date-editor {
            width: 100%
        }
        .zll-form .el-form-item {
            margin-bottom: 10px;
        }
        .tableList {
            margin-top: 20px;
            position: relative;
            table {
                width: 100%;
                border-collapse: collapse;
                border:1px solid #ffffff;
                text-align: center;
                th {
                    background: #a6a6a6;
                    color: #ffffff;
                    padding: 3px;
                    font-weight: normal;
                    height: 26px;
                    line-height: 26px;
                }
                td {
                    background: #F2F2F2;
                    padding: 3px;
                    height: 26px;
                    line-height: 26px;
                }
                .iscolor {
                    color: #f44336;
                }
            }
        }
        .addNew {
            text-align: right;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            span {
                background: #3f9dd3;
                color: #ffffff;
                border-radius: 14px;
                text-align: center;
                display: inline-block;
                padding: 0 10px;
                margin-left: 10px;
                &:hover {
                    opacity: .8;
                    transition: all .3s;
                }
            }
        }
    }
</style>