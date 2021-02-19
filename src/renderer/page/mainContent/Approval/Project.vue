<template>
    <div class="Account">
        <!-- 头部input搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex"></div>
			<div class="addNew">
               <span><i class="el-icon-s-data"></i> 数据统计</span>
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
                <el-button @click="edit(scope.row)" type="text" size="small">审批</el-button>
            </template>
        </sys-table>
        
        <!-- 查看弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '项目'" :visible.sync="detailDialog" v-if="detailDialog">
                <Detail ref="add" slot="content" ></Detail>
                <template slot="bottom">
                    <p class="zll-botton" @click="detailDialog = false">确 定</p>
                </template>
            </popout>
        </div> 
    </div>
</template>

<script>
    import Detail from "./detail"
    export default {
        data(){
            return {
                title: '',
                tableLoading:true, //table刷新
                searchInput1: '',
                searchInput2: '',
                searchInput3: '',
                searchInput4: '',
                tableData: [{
                    tableNum1: '2016-05-03', //报销日期
                    tableNum2: '123',//部门
                    tableNum3: '差旅',//报销人
                    tableNum4: '202001',//年月度
                    tableNum5: '差旅',//科目
                    tableNum6: '222',//金额
                    tableNum7: '通过',//状态
                    tableNum8: '已结算',//结算
                }],
                tableHeader:[],
                detailDialog: false,
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
                        {"columnValue": "tableNum1", "columnName": "报销日期"},
                        {"columnValue": "tableNum2", "columnName": "部门"},
                        {"columnValue": "tableNum3", "columnName": "报销人"},
                        {"columnValue": "tableNum4", "columnName": "年月度"},
                        {"columnValue": "tableNum5", "columnName": "科目"},
                        {"columnValue": "tableNum6", "columnName": "金额"},
                        {"columnValue": "tableNum7", "columnName": "状态"},
                        {"columnValue": "tableNum8", "columnName": "结算"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            goDetail(){
                this.detailDialog = true
                this.title = '查看'
            },
            edit(){
                this.detailDialog = true
                this.title = '审批'
            },
            searchReset() { //重置搜索
                this.searchInput1 = "";
                this.getTableList();
            },
        },
        mounted(){
            this.getTableList();//显示table
        },
        components: {
            Detail,
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/style/SearchTop.scss";
</style>