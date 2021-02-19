<template>
    <div class="Suply">
        <!-- 头部搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
				<el-input clearable v-model="inputData1" placeholder="供应商"></el-input>
			</div>
			<div class="input_flex">
                <el-select clearable  v-model="inputData2" placeholder="状态">
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="停用" value="停用"></el-option>
                </el-select>
			</div>
			<div class="">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
                <span @click="batchCancal" class="delete"><i class="el-icon-delete"></i> 批量删除</span>
                <span @click="add()"><i class="el-icon-circle-plus-outline"></i> 供应商</span>
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
                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            </template>
        </sys-table>

        <!-- 新建供应商弹框 -->
        <div class="zll-dialog">
            <popout :title="title + '供应商'" :visible.sync="addDialog" v-if="addDialog">
                <Add ref="add" slot="content" :titleTxt="title" @addForm="getFormData" ></Add>
                <template slot="bottom">
                    <p class="zll-botton" v-if="title != '查看'" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
                    <p class="zll-botton" v-else @click="addDialog = false">确 定</p>
                </template>
            </popout>
        </div>
    </div>
</template>
<script>
    import Add from './add'
    export default {
        data(){
            return {
                tableLoading:true, //table刷新
                inputData1: '',
                inputData2: '',
                tableData: [{//表格数据
                    tableData1: '121212',//税号
                    tableData2: '南京康码科技有限公司',//供应商名称
                    tableData3: '张三',//联系人
                    tableData4: '18212121212',//手机号
                    tableData5: '张三',//准入人
                    tableData6: '2016-05-03',//准入日期
                    tableData7: '合格',//状态
                }],
                tableHeader:[],
                selectList: [],//批量删除数据
                addDialog: false, //新建供应商弹框
                title: '',
            }
        },
        methods: {
            getTableList(){//获取表格数据
                this.tableLoading = true;
                setTimeout(()=>{
                    this.tableHeader =  [
                        {"columnValue": "tableData1", "columnName": "税号"},
                        {"columnValue": "tableData2", "columnName": "供应商名称"},
                        {"columnValue": "tableData3", "columnName": "联系人", width: "100"},
                        {"columnValue": "tableData4", "columnName": "手机号"},
                        {"columnValue": "tableData5", "columnName": "准入人", width: "100"},
                        {"columnValue": "tableData6", "columnName": "准入日期", isSortable: true },
                        {"columnValue": "tableData7", "columnName": "状态", width: "100"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            getFormData(data){
                console.log(data)
                this.addDialog = false
            },
            add(){
                this.addDialog = true
                this.title = "新建"
            },
            goDetail(){//查看
                this.addDialog = true
                this.title = "查看"
            },
            edit(){//编辑
                this.addDialog = true
                this.title = "编辑"
            },
            getSelection(val){//选中数据
                this.selectList = val
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
            searchReset() {//搜索重置
                this.inputData1 = ''
                this.inputData2 = ''
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