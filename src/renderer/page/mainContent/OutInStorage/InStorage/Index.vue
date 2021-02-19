<template>
    <div class="InStorage">
        <!-- 头部搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
                <el-input clearable v-model="searchInput1" placeholder="采购号"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput2" placeholder="供应商"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput3" placeholder="采购人"></el-input>
			</div>
			<div class="input_flex">
                <el-date-picker v-model="searchInput4" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</div>
			<div class="input_flex">
                <el-select clearable v-model="searchInput5" placeholder="状态">
                    <el-option label="待入" value="待入"></el-option>
                    <el-option label="入库中" value="入库中"></el-option>
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
                            <el-form-item class="formList" prop="addFormData1" label="采购号：">
                                <el-input clearable class="input_right" placeholder="请输入采购号" v-model="addForm.addFormData1"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="addFormData2" label="采购名称：">
                                <el-input clearable class="input_right" placeholder="请输入采购名称" v-model="addForm.addFormData2"></el-input>
                            </el-form-item>
                            <el-form-item class="formList" prop="addFormData3" label="采购人：">
                                <el-input clearable class="input_right" placeholder="请输入采购人" v-model="addForm.addFormData3"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="18">
                            <div class="tableList">
                                <table border="1">
                                    <tr>
                                        <th width="10%">品类</th><th width="15%">品名</th><th width="30%">型号</th><th width="15%">应入库</th><th width="15%">已入库</th><th width="15%">未入库</th>
                                    </tr>
                                    <tr class="add_Table" v-for="(item, index) in inStorageData"  :key="index">
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
                <span @click="addStore(1)"> 软件入库</span>
                <span @click="addStore(2)"> 硬件入库</span>
            </div>
        </div>
        <!-- 入库弹框 -->
        <div class="zll-dialog">
            <popout :title="title" :visible.sync="addDialog" v-if="addDialog">
                <Add ref="add" slot="content" :type="title" @inForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('inForm')}">{{ title }}</p>
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
                searchInput5: '',
                tableData: [{
                    tableNum1: '2020-01-11',//采购日期
                    tableNum2: '采购号',//采购号
                    tableNum3: '采购人',//采购人
                    tableNum4: '采购名称',//采购名称
                    tableNum5: '供应商',//供应商
                    tableNum6: '5',//应入库
                    intableNum7: '4',//未入库
                    tableNum8: '状态',//状态
                }, {
                    tableNum1: '2020-01-31',//采购日期
                    tableNum2: '采购号',//采购号
                    tableNum3: '采购人',//采购人
                    tableNum4: '采购名称',//采购名称
                    tableNum5: '供应商',//供应商
                    tableNum6: '5',//应入库
                    intableNum7: '0',//未入库
                    tableNum8: '状态',//状态
                }],
                tableHeader:[],
                addDialog: false, //入库弹框
                goDetailDialog: false, //查看弹框
                addForm: {//表单
                    addFormData1: "",
                    addFormData2: "",
                    addFormData3: "",
                },
                inStorageData: [{
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
                },]
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
                        {"columnValue": "tableNum1", "columnName": "采购日期", isSortable: true },
                        {"columnValue": "tableNum2", "columnName": "采购号"},
                        {"columnValue": "tableNum3", "columnName": "采购人", width: "100"},
                        {"columnValue": "tableNum4", "columnName": "采购名称"},
                        {"columnValue": "tableNum5", "columnName": "供应商"},
                        {"columnValue": "tableNum6", "columnName": "应入库", width: "100", isSortable: true },
                        {"columnValue": "intableNum7", "columnName": "未入库", width: "100", isSortable: true },
                        {"columnValue": "tableNum8", "columnName": "状态", width: "100"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            addStore(val){ //入库
                if(val == 1) {
                    this.title = '软件入库'
                }else {
                    this.title = '硬件入库'
                }
                this.addDialog = true
            },
            goDetail(row){ //查看
                // let inStorageData = [row]
                // this.inStorageData = inStorageData
                this.goDetailDialog = true
            },
            searchReset() {//搜索重置
                this.searchInput1 = ''
                this.searchInput2 = ''
                this.searchInput3 = ''
                this.searchInput4 = ''
                this.searchInput5 = ''
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