<template>
    <div class="SetSubject">
        <!-- 头部搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
                <el-select clearable v-model="searchInput1" placeholder="收支" @change="selectChange">
                    <el-option label="收入" value="收入"></el-option>
                    <el-option label="支出" value="支出"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput2" placeholder="类别" v-if="isShow == '收入'">
                    <el-option label="主营" value="主营"></el-option>
                    <el-option label="其它" value="其它"></el-option>
                </el-select>
                <el-select clearable v-model="searchInput2" placeholder="类别" v-else-if="isShow == '支出'">
                    <el-option label="采购" value="采购"></el-option>
                    <el-option label="财务" value="财务"></el-option>
                    <el-option label="报销" value="报销"></el-option>
                    <el-option label="工资" value="工资"></el-option>
                    <el-option label="社保" value="社保"></el-option>
                    <el-option label="固定支出" value="固定支出"></el-option>
                    <el-option label="税费" value="税费"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
                <el-input clearable placeholder="一级科目" v-model="searchInput3"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable placeholder="二级科目" v-model="searchInput4"></el-input>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput5" placeholder="状态">
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="停用" value="停用"></el-option>
                </el-select>
			</div>
			<div class="">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
                <span class="delete" @click="batchCancal"><i class="el-icon-delete"></i> 批量删除</span>
                <span @click="add()"><i class="el-icon-circle-plus-outline"></i> 新建科目</span>
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
                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            </template>
        </sys-table>
        
        <!-- 新建管理角色弹框 -->
        <div class="zll-dialog">
            <popout :title="type + '科目'" :visible.sync="addDialog" v-if="addDialog" height="300px">
                <Add ref="add" slot="content" @addForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
                </template>
            </popout>
        </div>
    </div>
</template>

<script>
import Add from './Add'
export default {
    data(){
        return {
            type: '',
            isShow: '收入',
            tableLoading:true, //table刷新
            searchInput1: '',
            searchInput2: '',
            searchInput3: '',
            searchInput4: '',
            searchInput5: '',
            tableData: [{
                tableNum1: '收入',//收支
                tableNum2: '主营',//收支类别
                tableNum3: '其它',//一级科目
                tableNum4: '利息',//二级科目
                tableNum5: '',//三级科目
                tableNum5: '启用',//状态
            }],
            tableHeader:[],
            addDialog: false, //角色弹框
            selectList: [],
        }
    },
    methods: {
            getTableList(){//获取表格数据
            this.tableLoading = true;
            setTimeout(()=>{
                this.tableHeader =  [
                    {"columnValue": "tableNum1", "columnName": "收支", width: "100"},
                    {"columnValue": "tableNum2", "columnName": "收支类别"},
                    {"columnValue": "tableNum3", "columnName": "一级科目"},
                    {"columnValue": "tableNum4", "columnName": "二级科目"},
                    {"columnValue": "tableNum5", "columnName": "三级科目"},
                    {"columnValue": "tableNum6", "columnName": "状态", width: "100"},
                ]
                this.tableData = JSON.parse(JSON.stringify(this.tableData))
                this.tableLoading = false;
            },500)
        },
        add(){
            this.addDialog = true
            this.type = "新建"
        },
        getFormData(data){
            console.log(data)
            this.addDialog = false
        },
        edit(){ //管理
            this.addDialog = true
            this.type = "编辑"
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
                    this.$message.success("已删除")
                }).catch(() => {
                    this.$message.info("已取消")           
                });
            }
        },
        getSelection(val){
            this.selectList = val;
        },
        searchReset() { //重置搜索
            this.searchInput1 = "";
            this.searchInput2 = "";
            this.searchInput3 = "";
            this.searchInput4 = "";
            this.searchInput5 = "";
            this.getTableList();
        },
        selectChange(val) {
            if(val == '收入') {
                this.isShow = '收入'
            }else if(val == '支出') {
                this.isShow = '支出'
            }
            this.searchInput2 = ''
            this.searchInput3 = ''
            this.searchInput4 = ''
        }
    },
    mounted(){
        this.getTableList();//显示table
    },
    components: {
        Add,
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style/SearchTop.scss";
</style>