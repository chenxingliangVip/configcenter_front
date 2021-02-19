<template>
    <div class="CashOnHand">
        <!-- 头部input搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
                <el-input clearable v-model="searchInput1" placeholder="单位/个人"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput2" placeholder="结算号"></el-input>
			</div>
			<div class="input_flex">
                <el-date-picker v-model="searchInput3" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</div>
			<div class="">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
                <span class="yuehe"><i class="el-icon-coordinate"></i> 月核</span>
                <span class="void" @click="edit()"><i class="el-icon-edit-outline"></i> 修改</span>
                <span class="delete" @click="batchCancal"><i class="el-icon-delete"></i> 批量删除</span>
			</div>
        </div>
        <!-- table -->
        <sys-table :isMultipleSelection="true" 
            :tableData="tableData" 
            :tableLoading="tableLoading" 
            :tableHeader="tableHeader"
            @getSelection="getSelection"
            :scopeWidth="120"
            :isOperate="false">
        </sys-table>

        <!-- 新建编辑弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '库存现金'" :visible.sync="addDialog" v-if="addDialog">
                <Add ref="add" slot="content" @addForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
                </template>
            </popout>
        </div> 
    </div>
</template>

<script>
    import Add from "./add"
    export default {
        data () {
            return {
                tableLoading:true, //table刷新
                searchInput1: '',
                searchInput2: '',
                searchInput3: '',
                tableData: [{
                    tabledata1: '',//交易日期
                    tabledata2: '单位/个人',//单位/个人
                    tabledata3: '',//借
                    tabledata4: '',//贷
                    tabledata5: '',//余额
                    tabledata6: '',//说明
                    tabledata7: '',//结算号
                }],
                tableHeader:[],
                addDialog: false, //销项开票弹框
                title: '',
                selectList: [],
            }
        },
        methods: {
            getTableList(){//获取表格数据
                this.tableLoading = true;
                setTimeout(()=>{
                    this.tableHeader =  [
                        {"columnValue": "tabledata1", "columnName": "日期"},
                        {"columnValue": "tabledata2", "columnName": "单位/个人"},
                        {"columnValue": "tabledata3", "columnName": "借", width: "100", isSortable: true },
                        {"columnValue": "tabledata4", "columnName": "贷", width: "100", isSortable: true },
                        {"columnValue": "tabledata5", "columnName": "余额", width: "100", isSortable: true },
                        {"columnValue": "tabledata6", "columnName": "说明"},
                        {"columnValue": "tabledata7", "columnName": "结算号"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            getFormData(){ 
                this.addDialog = false
            },
            edit() { //修改
                if(this.selectList.length !== 1 ){
                    this.$message.warning("请选择一列数据！");
                }else {
                    this.detailData = this.selectList[0]
                    this.addDialog = true
                    this.title = "修改"
                }
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
                this.searchInput3 = "";
                this.getTableList();
            },
        },
        mounted(){
            this.getTableList();//显示table
        },
        components:{
           Add
        },
    }
</script>
<style scoped lang="scss">
    @import "@/assets/style/SearchTop.scss";
</style>
