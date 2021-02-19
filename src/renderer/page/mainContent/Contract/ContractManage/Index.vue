<template>
    <div class="ContractManage">
        <!-- 头部input搜索 -->
        <div class="Search_Top_Input">
            <div class="input_flex">
                <el-input clearable v-model="searchInput1" placeholder="销售人"></el-input>
			</div>   
            <div class="input_flex">
                <el-input clearable v-model="searchInput2" placeholder="客户名称"></el-input>
			</div>   
            <div class="input_flex">
                <el-input clearable v-model="searchInput3" placeholder="项目号"></el-input>
			</div>   
			<div class="input_flex">
                <el-input clearable v-model="searchInput4" placeholder="合同号"></el-input>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput5" placeholder="阶段">
                    <el-option label="待增" value="待增"></el-option>
					<el-option label="待审核" value="待审核"></el-option>
					<el-option label="进行中" value="进行中"></el-option>
					<el-option label="完成" value="完成"></el-option>
					<el-option label="终止" value="终止"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
				<el-date-picker v-model="searchInput6" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</div>
			<div class="input_flex">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
                <span @click="stop" class="stop"><i class="el-icon-document-delete"></i> 终止</span>
                <span @click="batchCancal" class="delete"><i class="el-icon-delete"></i> 批量删除</span>
                <!-- <span @click="add()"><i class="el-icon-circle-plus-outline"></i> 新建合同</span> -->
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
                <el-button v-if="scope.row.tableNum7 == '待审核'" @click="edit(scope.row)" type="text" size="small">审批</el-button>
            </template>
        </sys-table>
        
        <!-- 新建合同弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '合同'" :visible.sync="addDialog" v-if="addDialog" height="550px">
                <Add ref="add"  slot="content" :titleTxt="title" @addForm="getFormData" ></Add>
                <template slot="bottom">
                    <p class="zll-botton" v-if="title != '查看'" @click="()=>{this.$refs.add.setFormData('addForm')}">确 定</p>
                    <p class="zll-botton" v-else @click="addDialog = false">确 定</p>
                </template>
            </popout>
        </div>
    </div>
</template>

<script>
    import Add from './add'
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
                tableData: [{
                    tableNum1: '销售人',//销售人
                    tableNum2: '项目号',//项目号
                    tableNum3: '客户名称',//客户名称
                    tableNum4: '合同号',//合同号
                    tableNum5: '2016-05-03',//合同日期
                    tableNum6: '合同名称',//合同名称
                    tableNum8: 30000,//合同额
                    tableNum7: '进行中',//阶段
					tableNum9: "已开票", //已开票
					tableNum10: "已回款", //已回款
					tableNum11: "未开票", //未开票
					tableNum12: "未回款", //未回款
                },{
                    tableNum1: '销售人',//销售人
                    tableNum2: '项目号',//项目号
                    tableNum3: '客户名称',//客户名称
                    tableNum4: '合同号',//合同号
                    tableNum5: '2016-05-03',//合同日期
                    tableNum6: '合同名称',//合同名称
                    tableNum8: 2000,//合同额
                    tableNum7: '待增',//阶段
					tableNum9: "已开票", //已开票
					tableNum10: "已回款", //已回款
					tableNum11: "未开票", //未开票
					tableNum12: "未回款", //未回款
                }],
                tableHeader:[],
                addDialog: false, //新建合同弹框
                title: '',
                selectList: [], //批量删除
            }
        },
        methods: {
            getTableList(){//获取表格数据
                this.tableLoading = true;
                setTimeout(()=>{
                    this.tableHeader =  [
                        { columnValue: "tableNum1",  columnName: "销售人"},
                        { columnValue: "tableNum2",  columnName: "项目号"},
                        { columnValue: "tableNum3",  columnName: "客户名称"},
                        { columnValue: "tableNum4",  columnName: "合同号"},
                        { columnValue: "tableNum5",  columnName: "合同日期", isSortable: true, width: 120},
                        { columnValue: "tableNum6",  columnName: "合同名称"},
                        { columnValue: "tableNum8",  columnName: "合同额", isSortable: true, width: 100},
                        { columnValue: "tableNum7",  columnName: "阶段"},
                        { columnValue: "tableNum9", columnName: "已开票" },
                        { columnValue: "tableNum10", columnName: "已回款" },
                        { columnValue: "tableNum11", columnName: "未开票" },
                        { columnValue: "tableNum12", columnName: "未回款" },
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            getFormData(data){ //获取新增表单数据
                this.addDialog = false
            },
            goDetail(row){//查看详情
                this.addDialog = true
                this.title = "查看"
                console.log(row)
            },
            edit(){//审批
                this.addDialog = true
                this.title = "审批"
            },
            stop(){//终止
                if(this.selectList.length  !==  1 ){
                    this.$message.warning("请选择一列数据！");
                }else{
                    for (let j = 0; j < this.selectList.length; j++) {
                        if(this.selectList[j].tableNum7 == '进行中') {
                            this.$confirm('确定终止？', '提示', {
                                distinguishCancelAndClose: true,
                                cancelButtonText: '取消',
                                confirmButtonText: '确定',
                            }).then(() => {
                                for (let i = 0; i < this.tableData.length; i++) {
                                    if( this.tableData[i].index == this.selectList[j].index){
                                        this.tableData[i].tableNum7 = '终止'
                                    }
                                }
                                this.$message.success('已终止');
                                this.getTableList()
                            }).catch(() => {
                                this.$message.info("已取消")             
                            });
                        }else {
                            this.$message.error("仅进行中项目可以终止")  
                        }
                    }
                }
            },
            searchReset() {//重置搜索
                this.searchInput1 = ''
                this.searchInput2 = ''
                this.searchInput3 = ''
                this.searchInput4 = ''
                this.searchInput5 = ''
                this.searchInput6 = ''
                this.getTableList()
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
        },
        mounted(){
            this.getTableList();//显示table
        },
        components: {
            Add,
        }
    }
</script>
<style scoped lang="scss">
    @import "@/assets/style/SearchTop.scss";
</style>
