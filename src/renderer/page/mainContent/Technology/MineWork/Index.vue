<template>
    <div class="MineWork">
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
               <span @click="add()"><i class="el-icon-circle-plus-outline"></i> 工作申报</span>
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
                <el-button v-if="scope.row.state == '未报' || scope.row.state == '驳回'" @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            </template>
        </sys-table>

        <!-- 新建编辑工作量申报弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '工作'" :visible.sync="addDialog" v-if="addDialog">
                <Add ref="add" slot="content" @addForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton" @click="addDialog = false">提 交</p>
                </template>
            </popout>
        </div>

        <!-- 查看弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '工作'" :visible.sync="goDetailDialog" v-if="goDetailDialog">
                <Detail ref="detail" :titleTxt="title" slot="content"></Detail>
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
                    work: 2,
                    state: '驳回',
                }],
                tableHeader:[],
                addDialog: false, //新建工作量申报弹框
                goDetailDialog: false, //查看编辑弹框
                title: '',
            }
        },
        methods: {
            getTableList() { //获取表格数据
                this.tableLoading = true;
                setTimeout(() => {
                    for (let i = 0; i < this.tableData.length; i++) {
                        this.tableData[i]['index'] = i +1
                    }
                    this.tableHeader =  [
                        {"columnValue": "index", "columnName": "序号", 'width': '50'},
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
            getFormData() {
                this.addDialog = false
            },
            add() {
                this.addDialog = true
                this.title = "申报"
            },
            goDetail(row) { //查看
                this.goDetailDialog = true
                this.title = "查看"
            },
            edit() { //编辑
                this.addDialog = true
                this.title = "编辑"
            },
            searchReset() { //重置搜索
                this.searchInput1 = "";
                this.searchInput2 = "";
                this.searchInput3 = "";
                this.getTableList();
            },
        },
        mounted() {
            this.getTableList(); //显示table
        },
        components: {
            Add,
            Detail
        },
    }

</script>
<style scoped lang="scss">
    @import "@/assets/style/SearchTop.scss";
</style>
