<template>
    <div class="AccountManage">
        <!-- 头部input搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
				<el-input clearable v-model="searchInput1" placeholder="报销号"></el-input>
			</div>
			<div class="input_flex">
				<el-input clearable v-model="searchInput2" placeholder="姓名"></el-input>
			</div>
			<div class="input_flex">
                <el-cascader  v-model="searchInput3" :options="options" class="Account_cascader" placeholder="类别"></el-cascader>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput4" placeholder="状态">
                    <el-option label="驳回" value="驳回"></el-option>
                    <el-option label="待审批" value="待审批"></el-option>
                    <el-option label="待结算" value="待结算"></el-option>
                    <el-option label="已结算" value="已结算"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
                <el-date-picker type="daterange" range-separator="-" v-model="searchInput5"  start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</div>
			<div class="">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
                <span class="download"><i class="el-icon-download"></i> 数据下载</span>
                <span @click="settle()"><i class="el-icon-money"></i> 结算</span>
                <span @click="batchCancal" class="delete"><i class="el-icon-delete"></i> 批量删除</span>
			</div>
        </div>
        <!-- table -->
        <sys-table  
            :isMultipleSelection="true" 
            :tableData="tableData" 
            :tableLoading="tableLoading" 
            :tableHeader="tableHeader"
            :scopeWidth="150" :showSummary="true"
            @getSelection="getSelection"
        >
            <template slot-scope="scope" slot="operate">
                <el-button @click="goDetail(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="add(scope.row)" type="text" size="small">审批</el-button>
            </template>
        </sys-table>

        <!-- 报销弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '报销'" :visible.sync="addDialog" v-if="addDialog">
                <Add ref="add" slot="content" :titleTxt="title" @addForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton reject" v-if="title !== '查看'" @click="()=>{this.$refs.add.setFormData('addForm')}">驳 回</p>
                    <p class="zll-botton" v-if="title !== '查看'" @click="()=>{this.$refs.add.setFormData('addForm')}">通 过</p>
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
                searchInput5: '',
                tableData: [{
                    tableNum1: '2016-05-03', //报销日期
                    tableNum2: '123',//报销号
                    tableNum3: '张三',//姓名
                    tableNum4: '差旅',//类别
                    tableNum5: 22,//总金额
                    tableNum6: '待审批',//状态
                }, {
                    tableNum1: '2016-05-03', //报销日期
                    tableNum2: '123',//报销号
                    tableNum3: '张三',//姓名
                    tableNum4: '差旅',//类别
                    tableNum5: 33,//总金额
                    tableNum6: '待结算',//状态
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
                        {"columnValue": "tableNum3", "columnName": "姓名", width: "100"},
                        {"columnValue": "tableNum4", "columnName": "类别"},
                        {"columnValue": "tableNum5", "columnName": "总金额", isSortable: true},
                        {"columnValue": "tableNum6", "columnName": "状态", width: "100"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            add(row){//审批
                this.addDialog = true
                this.title = '审批'
            },
            goDetail(row){//查看
                this.addDialog = true
                this.title = '查看'
            },
            settle(){//结算
                if(this.selectList.length !== 1 ){
                    this.$message.warning("请选择一列数据！");
                }else{
                    for (let j = 0; j < this.selectList.length; j++) {
                        if( this.selectList[j].tableNum6 == '待结算'){
                            this.$confirm('确定结算？', '提示', {       
                                distinguishCancelAndClose: true,
                                cancelButtonText: '取消',
                                confirmButtonText: '确定',
                            }).then(() => {
                                this.$message.success("已结算")
                                this.getTableList()
                            }).catch(() => {
                                this.$message.info("已取消")          
                            });
                        }else {
                            this.$message.error("仅待结算报销可以结算")   
                        }
                    }
                }
            },
            getFormData(data){
                this.addDialog = false
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
            getSelection(val){
                this.selectList = val;
            },
            searchReset() {//搜索重置
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
        components: {
            Add
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/style/SearchTop.scss";
</style>