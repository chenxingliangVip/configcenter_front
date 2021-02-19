<template>
    <div class="OutStorage">
        <!-- 头部搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
                <el-input clearable v-model="searchInput1" placeholder="合同号"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput2" placeholder="客户名称"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput3" placeholder="销售人"></el-input>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput4" placeholder="状态">
                    <el-option label="待出库" value="待出库"></el-option>
                    <el-option label="出库中" value="出库中"></el-option>
                    <el-option label="完成" value="完成"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
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
            </template>
        </sys-table>

        <div class="goDetail" v-if="goDetailDialog">
            <div class="addForm zll-form">
                <el-form :model="addForm" ref="addForm" class="demo-ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item class="formList" prop="addFormData1" label="合同号：">
                                <el-input clearable class="input_right" placeholder="请输入合同号" v-model="addForm.addFormData1"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="addFormData2" label="客户名称：">
                                <el-input clearable class="input_right" placeholder="请输入客户名称" v-model="addForm.addFormData2"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="addFormData3" label="销售人：">
                                <el-input clearable class="input_right" placeholder="请输入销售人" v-model="addForm.addFormData3"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="addFormData4" label="状态：">
                                <el-select clearable v-model="addForm.addFormData4" placeholder="请选择状态">
                                    <el-option label="待出库" value="待出库"></el-option>
                                    <el-option label="出库中" value="出库中"></el-option>
                                    <el-option label="完成" value="完成"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="18">
                            <div class="tableList">
                                <table border="1">
                                    <tr>
                                        <th width="10%">品类</th><th width="15%">品名</th><th width="30%">型号</th><th width="15%">应出库</th><th width="15%">已出库</th><th width="15%">未出库</th>
                                    </tr>
                                    <tr class="add_Table" v-for="(item, index) in outStorageData"  :key="index">
                                        <td width="10%">{{ item.addData1 }}</td>
                                        <td width="15%">{{ item.addData2 }}</td>
                                        <td width="30%">{{ item.addData3 }}</td>
                                        <td width="15%">{{ item.addData4 }}</td>
                                        <td width="15%">{{ item.addData5 }}</td>
                                        <td width="15%" :class="{ iscolor: item.addData6 != 0 }">{{ item.addData6 }}</td>
                                    </tr>
                                </table>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="addNew">
                <span @click="addStore(1)"> 软件出库</span>
                <span @click="addStore(2)"> 硬件出库</span>
            </div>
        </div>
        <!-- 出库弹框 -->
        <div class="zll-dialog">
            <popout :title="title" :visible.sync="addDialog" v-if="addDialog">
                <Add ref="add" slot="content" :type="title" @outForm="getFormData" :outStorageData="outStorageData"></Add>
                <template slot="bottom">
                    <p class="zll-botton void"> 出库单.pdf</p>
                    <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('outForm')}">{{ title }}</p>
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
                title: '',
                tableLoading:true, //table刷新
                searchInput1: '',
                searchInput2: '',
                searchInput3: '',
                searchInput4: '',
                tableData: [ {
                    tableNum1: 'hahah',//销售人
                    tableNum2: '合同号',//合同号
                    tableNum3: '客户名称',//客户名称
                    tableNum4: '合同名称',//合同名称
                    tableNum5: '4',//应出库
                    outtableNum6: '0',//未出库
                    tableNum7: '状态',//状态
                }, {
                    tableNum1: 'hahah',//销售人
                    tableNum2: '合同号',//合同号
                    tableNum3: '客户名称',//客户名称
                    tableNum4: '合同名称',//合同名称
                    tableNum5: '4',//应出库
                    outtableNum6: '4',//未出库
                    tableNum7: '状态',//状态
                }],
                tableHeader:[],
                addDialog: false, //出库弹框
                goDetailDialog: false, //查看弹框
                addForm: {//表单
                    addFormData1: "",
                    addFormData2: "",
                    addFormData3: "",
                    addFormData4: "",
                    addFormData5: "",
                },
                outStorageData: [{
                    addData1: "",
                    addData2: "",
                    addData3: "",
                    addData4: "",
                    addData5: "8",
                    addData6: "8",
                }, {
                    addData1: "",
                    addData2: "",
                    addData3: "",
                    addData4: "",
                    addData5: "0",
                    addData6: "0",
                },],
            }
        },
        methods: {
             getTableList(){//获取表格数据
                this.tableLoading = true;
                setTimeout(()=>{
                    for (let i = 0; i < this.tableData.length; i++) {
                        this.tableData[i]['index'] = i +1
                    }
                    this.tableHeader =  [
                        {"columnValue": "index", "columnName": "序号", 'width': '50'},
                        {"columnValue": "tableNum1", "columnName": "销售人", width: "100"},
                        {"columnValue": "tableNum2", "columnName": "合同号"},
                        {"columnValue": "tableNum3", "columnName": "客户名称"},
                        {"columnValue": "tableNum4", "columnName": "合同名称"},
                        {"columnValue": "tableNum5", "columnName": "应出库", width: "100", isSortable: true},
                        {"columnValue": "outtableNum6", "columnName": "未出库", width: "100", isSortable: true},
                        {"columnValue": "tableNum7", "columnName": "状态", width: "100"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            addStore(val){ //出库
                if(val == 1) {
                    this.title = '软件出库'
                }else {
                    this.title = '硬件出库'
                }
                this.addDialog = true
            },
            goDetail(row){ //查看
                // let outStorageData = [row]
                // this.outStorageData = outStorageData
                this.goDetailDialog = true
            },
            searchReset() {//搜索重置
                this.searchInput1 = ''
                this.searchInput2 = ''
                this.searchInput3 = ''
                this.searchInput4 = ''
                this.getTableList()
            },
            getFormData(data){ //获取新增表单数据
                console.log(data)
                this.addDialog = false
                this.goDetailDialog = false
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

<style lang="scss" scoped>
    @import "@/assets/style/SearchTop.scss";
    .goDetail {
        padding: 20px 30px;    
        box-shadow: 0 0 10px #ccc;
        margin-top: 50px;
        .el-date-editor {
            width: 100%
        }
        .zll-form .el-form-item {
            margin-bottom: 10px;
        }
        .tableList {
            margin-top: 20px;
            position: relative;
            table {
                width: 100%;
                border-collapse: collapse;
                border:1px solid #ffffff;
                text-align: center;
                th {
                    background: #a6a6a6;
                    color: #ffffff;
                    padding: 3px;
                    font-weight: normal;
                    height: 26px;
                    line-height: 26px;
                }
                td {
                    background: #F2F2F2;
                    padding: 3px;
                    height: 26px;
                    line-height: 26px;
                }
                .iscolor {
                    color: #f44336;
                }
            }
        }
        .addNew {
            text-align: right;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            span {
                background: #3f9dd3;
                color: #ffffff;
                border-radius: 14px;
                text-align: center;
                display: inline-block;
                padding: 0 10px;
                margin-left: 10px;
                &:hover {
                    opacity: .8;
                    transition: all .3s;
                }
            }
        }
    }
</style>