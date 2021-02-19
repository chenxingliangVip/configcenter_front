<template>
    <div class="WorkManage">
        <!-- 头部input搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
                <el-date-picker v-model="searchInput1" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput2" placeholder="姓名"></el-input>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput3" placeholder="状态">
                    <el-option label="未报" value="未报"></el-option>
                    <el-option label="驳回" value="驳回"></el-option>
                    <el-option label="待核" value="待核"></el-option>
                    <el-option label="通过" value="通过"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
                <span @click="batchCancal" class="delete"><i class="el-icon-delete"></i> 批量删除</span>
                <span @click="search()"> 工作量查询</span>
			</div>
        </div>
        <!-- table -->
        <sys-table  
            :isMultipleSelection="true" 
            :tableData="tableData" 
            :tableLoading="tableLoading" 
            :tableHeader="tableHeader"
            :scopeWidth="150"
            @getSelection="getSelection"
        >
            <template slot-scope="scope" slot="operate">
                <el-button @click="goDetail(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="edit(scope.row)" type="text" size="small">审核</el-button>
                <!-- <el-button @click="cancal(scope.$index, tableData)" type="text" size="small">删除</el-button> -->
            </template>
        </sys-table>

        <!-- 新建审核工作量申报弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '工作'" :visible.sync="addDialog" v-if="addDialog">
                <Add ref="add" slot="content" @addForm="getFormData" :detailData="detailData"></Add>
                <template slot="bottom">
                    <p class="zll-botton reject" @click="()=>{this.$refs.add.setFormData('addForm')}">驳 回</p>
                    <p class="zll-botton"  @click="()=>{this.$refs.add.setFormData('addForm')}">通 过</p>
                </template>
            </popout>
        </div>

        <!-- 查看弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '工作'" :visible.sync="goDetailDialog" v-if="goDetailDialog">
                <Detail ref="detail" :titleTxt="title" slot="content" :detailData="detailData"></Detail>
                <template slot="bottom">
                    <p class="zll-botton" @click="goDetailDialog = false">确 定</p>
                </template>
            </popout>
        </div>
        <!-- 工作量查询弹框 -->
        <div class="zll-dialog">
            <popout title="工作量查询" :visible.sync="searchDialog" v-if="searchDialog">
                <Search ref="search" slot="content"></Search>
                <template slot="bottom">
                    <p class="zll-botton" @click="searchDialog = false">确 定</p>
                </template>
            </popout>
        </div>
    </div>
</template>

<script>
    import Add from './add'
    import Detail from './detail'
    import Search from './search'
    export default {
        data() {
            return {
                tableLoading: true, //table刷新
                searchInput1: '',
                searchInput2: '',
                searchInput3: '',
                tableData: [{
                    startTime: '2016-05-03',
                    endTime: '2016-05-04',
                    name: '张三',
                    work: 22,
                    state: '通过',
                }, {
                    startTime: '2016-05-03',
                    endTime: '2016-05-04',
                    name: '张三',
                    work: 11,
                    state: '驳回',
                }],
                tableHeader:[],
                addDialog: false, //新建工作量申报弹框
                goDetailDialog: false, //查看审核弹框
                searchDialog: false, //工作量查询
                title: '',
                selectList: [], //批量删除
                detailData: [],
            }
        },
        methods: {
            getTableList() { //获取表格数据
                this.tableLoading = true;
                setTimeout(() => {
                    this.tableHeader =  [
                        {"columnValue": "startTime", "columnName": "开始日期"},
                        {"columnValue": "endTime", "columnName": "结束日期"},
                        {"columnValue": "name", "columnName": "姓名", width: "100"},
                        {"columnValue": "work", "columnName": "工作量", isSortable: true},
                        {"columnValue": "state", "columnName": "状态", width: "100"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                }, 500)
            },
            getFormData(data) {
                console.log(data)
                this.addDialog = false
            },
            goDetail(row) { //查看
                this.detailData = row
                this.goDetailDialog = true
                this.title = "查看"
            },
            edit(row) { //审核
                this.detailData = row
                this.addDialog = true
                this.title = "审核"
            },
            search() { //工作量查询
                this.searchDialog = true
            },
            searchReset() { //重置搜索
                this.searchInput1 = "";
                this.searchInput2 = "";
                this.searchInput3 = "";
                this.getTableList();
            },
            getSelection(val){ //选中List
                this.selectList = val;
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
        },
        mounted() {
            this.getTableList(); //显示table
        },
        components: {
            Add,
            Detail,
            Search
        },
    }

</script>
<style scoped lang="scss">
    @import "@/assets/style/SearchTop.scss";
</style>
