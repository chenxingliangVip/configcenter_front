<template>
    <div class="SalaryDeclare">
        <!-- 头部input搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
                <el-input clearable v-model="searchInput1" placeholder="姓名"></el-input>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput2" placeholder="状态">
                    <el-option label="待审核" value="待审核"></el-option>
                    <el-option label="结算中" value="结算中"></el-option>
                    <el-option label="已结算" value="已结算"></el-option>
                    <el-option label="驳回" value="驳回"></el-option>
                </el-select>
			</div>
			<div class="">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
                <span class="download" @click="payment()"><i class="el-icon-money"></i> 结算</span>
                <span class="delete" @click="batchCancal"><i class="el-icon-delete"></i> 批量删除</span>
                <span @click="add()"><i class="el-icon-circle-plus-outline"></i> 新建工资</span>
			</div>
        </div>
        <!-- table -->
        <sys-table :isMultipleSelection="true" 
            :tableData="tableData" 
            :tableLoading="tableLoading" 
            :tableHeader="tableHeader"
            @getSelection="getSelection"
            :scopeWidth="120">
            <template slot-scope="scope" slot="operate">
                <el-button @click="edit(scope.row, '查看')" type="text" size="small">查看</el-button>
                <el-button @click="edit(scope.row, '编辑')" type="text" size="small">编辑</el-button>
            </template>
        </sys-table>

        <!-- 结算弹框 -->
        <div class="zll-dialog">
            <popout title="工资结算" :visible.sync="payDialog" v-if="payDialog">
                <Payment ref="pay" slot="content" @payForm="getPayForm"></Payment>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.pay.setFormData('payForm')}">结 算</p>
                </template>
            </popout>
        </div>
        <!-- 新建编辑弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '工资申报'" :visible.sync="addDialog" v-if="addDialog">
                <Add ref="add" slot="content" :type="title" @addForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton" v-if="title !== '查看'" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
                    <p class="zll-botton" v-else @click="addDialog = false">确 定</p>
                </template>
            </popout>
        </div> 
    </div>
</template>

<script>
    import Add from "./add"
    import Payment from "./payment"
    export default {
        data () {
            return {
                title: '',
                tableLoading:true, //table刷新
                searchInput1: '',
                searchInput2: '',
                tableData: [{
                    tabledata1: '2020-01',//所属年月
                    tabledata2: '人数',//人数
                    tabledata3: 2000,//实发工资
                    tabledata4: '制表',//制表
                    tabledata5: '审核',//审核
                    tabledata6: '0.00',//发放金额
                    tabledata7: '发放日期',//发放日期
                    tabledata8: '状态',//状态
                }],
                tableHeader:[],
                addDialog: false, //新增弹框
                payDialog: false,//结算弹框
                selectList: [],
            }
        },
        methods: {
            getTableList(){//获取表格数据
                this.tableLoading = true;
                setTimeout(()=>{
                    this.tableHeader =  [
                        {"columnValue": "tabledata1", "columnName": "所属年月", isSortable: true },
                        {"columnValue": "tabledata2", "columnName": "人数", width: "100"},
                        {"columnValue": "tabledata3", "columnName": "实发工资", isSortable: true },
                        {"columnValue": "tabledata4", "columnName": "制表"},
                        {"columnValue": "tabledata5", "columnName": "审核", width: "100"},
                        {"columnValue": "tabledata6", "columnName": "发放金额"},
                        {"columnValue": "tabledata7", "columnName": "发放日期"},
                        {"columnValue": "tabledata8", "columnName": "状态", width: "100"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            getFormData(data){ 
                console.log(data)
                this.addDialog = false
            },
            payment() {//结算
                if(this.selectList.length !== 1 ){
                    this.$message.warning("请选择一列数据！");
                }else{
                    this.payDialog = true
                }
            },
            add() {//新建
                this.addDialog = true
                this.title = '新建'
            },
            getPayForm(data) {
                this.payDialog = false
            },
            edit(row, title) { //编辑
                this.detailData = row
                this.addDialog = true
                this.title = title
            },
            batchCancal(){//批量删除
                if(this.selectList.length <1 ){
                    this.$message.warning("至少选择一列数据！");
                }else{
                    this.$confirm('确定删除？', '提示', {       
                        distinguishCancelAndClose: true,
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                    }).then(() => {
                        for (let i = 0; i < this.tableData.length; i++) {
                            for (let j = 0; j < this.selectList.length; j++) {
                                if( this.tableData[i].index == this.selectList[j].index){
                                    this.tableData.splice(i,1)
                                }
                            }
                        }
                        this.$message.success("已删除")
                        this.getTableList()

                    }).catch(() => {
                        this.$message.info("已取消")          
                    });
                }
            },
            getSelection(val){ //选中List
                this.selectList = val;
            },
            searchReset() { //重置搜索
                this.searchInput1 = "";
                this.searchInput2 = "";
                this.getTableList();
            },
        },
        mounted(){
            this.getTableList();//显示table
        },
        components:{
           Add, Payment
        },
    }
</script>
<style scoped lang="scss">
    @import "@/assets/style/SearchTop.scss";
</style>
