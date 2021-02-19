<template>
    <div class="BudgetSearch">
        <!-- 头部input搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
                <el-select clearable v-model="searchInput1" placeholder="收支" @change="selectChange">
                    <el-option label="收" value="收"></el-option>
                    <el-option label="支" value="支"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput2" placeholder="科目" v-if="isShow == '收'">
                    <el-option label="政府补助" value="政府补助"></el-option>
                    <el-option label="利息" value="利息"></el-option>
                    <el-option label="退税" value="退税"></el-option>
                </el-select>
                <el-select clearable v-model="searchInput2" placeholder="科目" v-else-if="isShow == '支'">
                    <el-option label="利息" value="利息"></el-option>
                    <el-option label="手续" value="手续"></el-option>
                    <el-option label="支票" value="支票"></el-option>
                    <el-option label="房租" value="房租"></el-option>
                    <el-option label="物业" value="物业"></el-option>
                    <el-option label="水电" value="水电"></el-option>
                    <el-option label="咨询服务" value="咨询服务"></el-option>
                    <el-option label="增值税" value="增值税"></el-option>
                    <el-option label="教育附加" value="教育附加"></el-option>
                    <el-option label="城建维护" value="城建维护"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput3" placeholder="类别码"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput4" placeholder="单位/个人"></el-input>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput5" placeholder="结算方式">
                    <el-option label="电汇" value="电汇"></el-option>
                    <el-option label="现金" value="现金"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput6" placeholder="结算号"></el-input>
			</div>
			<div class="input_flex">
                <el-date-picker v-model="searchInput7" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</div>
			<div class="">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
                <span class="download"><i class="el-icon-upload"></i> 数据导出</span>
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
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tableLoading:true, //table刷新
                searchInput1: '',
                searchInput2: '',
                searchInput3: '',
                searchInput4: '',
                searchInput5: '',
                searchInput6: '',
                searchInput7: '',
                tableData: [{
                    tabledata1: '',//日期
                    tabledata2: '收',//收支类别
                    tabledata3: '主营',//科目
                    tabledata4: '0000',//类别码
                    tabledata5: '',//个人/单位
                    tabledata6: '',//摘要
                    tabledata7: 33,//金额
                    tabledata8: '现金',//结算方式
                    tabledata9: '',//结算号
                    tabledata10: '',//结算人
                    tabledata11: '',//月核
                }],
                tableHeader:[],
                addDialog: false, //销项开票弹框
                title: '',
                selectList: [],
                isShow: '收'
            }
        },
        methods: {
            getTableList(){//获取表格数据
                this.tableLoading = true;
                setTimeout(()=>{
                    this.tableHeader =  [
                        {"columnValue": "tabledata1", "columnName": "日期"},
                        {"columnValue": "tabledata2", "columnName": "收支"},
                        {"columnValue": "tabledata3", "columnName": "科目"},
                        {"columnValue": "tabledata4", "columnName": "类别码"},
                        {"columnValue": "tabledata5", "columnName": "单位/个人"},
                        {"columnValue": "tabledata6", "columnName": "摘要"},
                        {"columnValue": "tabledata7", "columnName": "金额", isSortable: true },
                        {"columnValue": "tabledata8", "columnName": "结算方式"},
                        {"columnValue": "tabledata9", "columnName": "结算号"},
                        {"columnValue": "tabledata10", "columnName": "结算人"},
                        {"columnValue": "tabledata11", "columnName": "月核"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
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
                this.searchInput4 = "";
                this.searchInput5 = "";
                this.searchInput6 = "";
                this.searchInput7 = "";
                this.getTableList();
            },
            selectChange(val) {
                if(val == '收') {
                    this.isShow = '收'
                }else if(val == '支') {
                    this.isShow = '支'
                }
                this.searchInput2 = ''
            }
        },
        mounted(){
            this.getTableList();//显示table
        },
    }
</script>
<style scoped lang="scss">
    @import "@/assets/style/SearchTop.scss";
</style>
