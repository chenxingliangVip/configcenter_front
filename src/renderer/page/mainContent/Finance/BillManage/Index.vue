<template>
    <div class="BillManage">
        <!-- 头部input搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
                <el-select clearable v-model="searchInput1" placeholder="类别">
                    <el-option label="销项" value="销项"></el-option>
                    <el-option label="进项" value="进项"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput2" placeholder="对象"></el-input>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput3" placeholder="品类">
                    <el-option label="硬件" value="硬件"></el-option>
                    <el-option label="软件" value="软件"></el-option>
                    <el-option label="服务" value="服务"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput4" placeholder="票号"></el-input>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput5" placeholder="票态">
                    <el-option label="正常" value="正常"></el-option>
                    <el-option label="红冲" value="红冲"></el-option>
                    <el-option label="作废" value="作废"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput6" placeholder="开票人"></el-input>
			</div>
			<div class="input_flex">
                <el-date-picker v-model="searchInput7" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</div>
			<div class="">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
                <span class="download"><i class="el-icon-upload"></i> 导出</span>
                <span class="void"><i class="el-icon-edit"></i> 红冲</span>
                <span class="stop" @click="stop()"><i class="el-icon-document-delete"></i> 作废</span>
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
                    tabledata1: '',//开票日期
                    tabledata2: '销项',//类别
                    tabledata3: '0000',//类别代号
                    tabledata4: '0000',//个人/单位
                    tabledata5: '硬件',//品类
                    tabledata6: '专',//票类
                    tabledata7: '32',//票号
                    tabledata8: '0',//开票额
                    tabledata9: '0',//税率
                    tabledata10: '1',//税额
                    tabledata11: '1',//附加税
                    tabledata12: '1',//可抵
                    tabledata13: '1',//退税
                    tabledata14: '正常',//票态
                    tabledata15: '11',//开票人
                }],
                tableHeader:[],
                title: '',
                selectList: []
            }
        },
        methods: {
            getTableList(){//获取表格数据
                this.tableLoading = true;
                setTimeout(()=>{
                    this.tableHeader =  [
                        {"columnValue": "tabledata1", "columnName": "开票日期"},
                        {"columnValue": "tabledata2", "columnName": "类别"},
                        {"columnValue": "tabledata3", "columnName": "类别代号"},
                        {"columnValue": "tabledata4", "columnName": "单位/个人"},
                        {"columnValue": "tabledata5", "columnName": "品类"},
                        {"columnValue": "tabledata6", "columnName": "票类"},
                        {"columnValue": "tabledata7", "columnName": "票号"},
                        {"columnValue": "tabledata8", "columnName": "开票额", isSortable: true, width: 100 },
                        {"columnValue": "tabledata9", "columnName": "税率"},
                        {"columnValue": "tabledata10", "columnName": "税额"},
                        {"columnValue": "tabledata11", "columnName": "附加税"},
                        {"columnValue": "tabledata12", "columnName": "可抵"},
                        {"columnValue": "tabledata13", "columnName": "退税"},
                        {"columnValue": "tabledata14", "columnName": "票态"},
                        {"columnValue": "tabledata15", "columnName": "开票人"},
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
            stop(){//作废
                if(this.selectList.length <1 ){
                    this.$message.warning("至少选择一列数据！");
                }else{
                    this.$confirm('确定作废？', '提示', {
                        distinguishCancelAndClose: true,
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                    }).then(() => {
                        for (let i = 0; i < this.tableData.length; i++) {
                            for (let j = 0; j < this.selectList.length; j++) {
                                if( this.tableData[i].index == this.selectList[j].index){
                                    this.tableData[i].tableNum7 = '终止'
                                }
                            }
                        }
                        this.$message.success('已作废');
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
        },
        mounted(){
            this.getTableList();//显示table
        },
    }
</script>
<style scoped lang="scss">
    @import "@/assets/style/SearchTop.scss";
</style>
