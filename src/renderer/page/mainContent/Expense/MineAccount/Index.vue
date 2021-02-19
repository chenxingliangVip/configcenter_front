<template>
    <div class="MineAccount">
        <!-- 头部input搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
				<el-input clearable v-model="searchInput1" placeholder="报销号"></el-input>
			</div>
			<div class="input_flex">
                <el-cascader  v-model="searchInput2" :options="options" placeholder="类别" class="Account_cascader"></el-cascader>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput3" placeholder="状态">
                    <el-option label="待提交" value="待提交"></el-option>
                    <el-option label="驳回" value="驳回"></el-option>
                    <el-option label="待审批" value="待审批"></el-option>
                    <el-option label="待结算" value="待结算"></el-option>
                    <el-option label="已结算" value="已结算"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
                <el-date-picker type="daterange" range-separator="-" v-model="searchInput4"  start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</div>
			<div class="">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
                <span @click="add()"><i class="el-icon-circle-plus-outline"></i> 新建报销</span>
			</div>
        </div>
        <!-- table -->
        <sys-table  
            :isMultipleSelection="true" 
            :tableData="tableData" 
            :tableLoading="tableLoading" 
            :tableHeader="tableHeader"
            :scopeWidth="120"
            @getSelection="getSelection"
        >
            <template slot-scope="scope" slot="operate">
                <div v-if="scope.row.tableNum5 == '待提交' || scope.row.tableNum5 == '驳回' ">
                    <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="cancal(scope.$index, tableData)" type="text" size="small">删除</el-button>
                </div>
                <div v-else>
                    <el-button @click="goDetail(scope.row)" type="text" size="small">查看</el-button>
                </div>
            </template>
        </sys-table>

        <!-- 新建报销弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '报销'" :visible.sync="addDialog" v-if="addDialog">
                <Add ref="add" slot="content" :titleTxt="title" @addForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton save" v-if="title !== '查看'" @click="()=>{this.$refs.add.setFormData('addForm')}">暂 存</p>
                    <p class="zll-botton" v-if="title !== '查看'" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
                    <p class="zll-botton" v-else @click="addDialog = false">确 定</p>
                </template>
            </popout>
        </div>
    </div>
</template>

<script>
    import Add from "./add"
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
                    tableNum2: '123',//报销号
                    tableNum3: '差旅',//类别
                    tableNum4: 22,//总金额
                    tableNum5: '待提交',//状态
                }, {
                    tableNum1: '2016-05-03', //报销日期
                    tableNum2: '123',//报销号
                    tableNum3: '差旅',//类别
                    tableNum4: 11,//总金额
                    tableNum5: '待结算',//状态
                }],
                tableHeader:[],
                selectList: [],//批量删除
                addDialog: false,
                options: [{ //科目
                    value: 'value1',
                    label: '差旅',
                    children: [{
                        value: 'value1-1',
                        label: '车船',
                    }, {
                        value: 'value1-2',
                        label: '住宿',
                    }, {
                        value: 'value1-3',
                        label: '市内',
                    }]
                },{
                    value: 'value2',
                    label: '招待',
                },{
                    value: 'value3',
                    label: '汽车',
                    children: [{
                        value: 'value3-1',
                        label: '汽油费',
                    },{
                        value: 'value3-2',
                        label: '过路费',
                    },{
                        value: 'value3-3',
                        label: '停车费',
                    },{
                        value: 'value3-4',
                        label: '燃油费',
                    }]
                },{
                    value: 'value4',
                    label: '邮递',
                },{
                    value: 'value5',
                    label: '办公',
                    children: [{
                        value: 'value5-1',
                        label: '办公用品',
                    },{
                        value: 'value5-2',
                        label: '日用品',
                    },{
                        value: 'value5-3',
                        label: '运输快递',
                    },{
                        value: 'value5-4',
                        label: '维修安装',
                    }]
                },{
                    value: 'value6',
                    label: '福利',
                }],
            }
        },
        methods: {
            getTableList(){//获取表格数据
                this.tableLoading = true;
                setTimeout(()=>{
                    this.tableHeader =  [
                        {"columnValue": "tableNum1", "columnName": "报销日期", isSortable: true},
                        {"columnValue": "tableNum2", "columnName": "报销号"},
                        {"columnValue": "tableNum3", "columnName": "类别"},
                        {"columnValue": "tableNum4", "columnName": "总金额", isSortable: true},
                        {"columnValue": "tableNum5", "columnName": "状态", width: "100"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            add(){
                this.addDialog = true
                this.title = '新建'
            },
            goDetail(row){//查看
                this.addDialog = true
                this.title = '查看'
            },
            edit(row){//编辑
                this.addDialog = true
                this.title = '编辑'
            },
            getFormData(data){
                this.addDialog = false
            },
            cancal(index,row){//删除
                this.$confirm('确定删除？', '提示', {
                    distinguishCancelAndClose: true,
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                }).then(() => {
                    if(row){
                        row.splice(index, 1);
                        this.$message.success("删除成功");
                    }
                }).catch(() => {
                    this.$message.info("已取消")             
                });
            },
            batchCancal(){
                if(this.selectList.length <1 ){
                    this.$message.warning("至少选择一列数据！");
                }else{
                    console.log(this.selectList)
                    this.$confirm('确定删除？', '提示', {       
                        distinguishCancelAndClose: true,
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                    }).then(() => {
                        this.$message.success("已删除")
                    }).catch(() => {
                        this.$message.info("已取消")          
                    });
                }
            },
            getSelection(val){
                this.selectList = val;
            },
            searchReset() {//搜索重置
                this.searchInput1 = ''
                this.searchInput2 = ''
                this.searchInput3 = ''
                this.searchInput4 = ''
                this.getTableList()
            },
        },
        mounted(){
            this.getTableList();//显示table
        },
        components: {
            Add
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/style/SearchTop.scss";
</style>