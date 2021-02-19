<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                        <el-form-item class="formList" prop="addFormdata1" :label="type == '销项开票' ? '销售人：' : '采购人：'">
                            <el-input clearable class="input_right" :placeholder="type == '销项开票' ? '请输入销售人' : '请输入采购人'" v-model="addForm.addFormdata1"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormdata2" :label="type == '销项开票' ? '客户名称：' : '供应商：'">
                            <el-input clearable class="input_right" :placeholder="type == '销项开票' ? '请输入客户名称' : '请输入供应商'" v-model="addForm.addFormdata2"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormdata3" :label="type == '销项开票' ? '合同号：' : '采购号：'">
                            <el-input clearable class="input_right" :placeholder="type == '销项开票' ? '请输入合同号' : '请输入采购号'" v-model="addForm.addFormdata3"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormdata4" :label="type == '销项开票' ? '合同名称：' : '采购名称：'">
                            <el-input clearable class="input_right" :placeholder="type == '销项开票' ? '请输入合同名称' : '请输入采购名称'" v-model="addForm.addFormdata4"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormdata5" label="总票额：">
                            <el-input clearable class="input_right" placeholder="请输入总票额" v-model="addForm.addFormdata5"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormdata6" label="已开票：">
                            <el-input clearable class="input_right" placeholder="请输入已开票" v-model="addForm.addFormdata6"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormdata7" label="未开票：">
                            <el-input clearable class="input_right" placeholder="请输入未开票" v-model="addForm.addFormdata7"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="18">
                    <div class="tableList">
                        <table border="1">
                            <tr>
                                <th width="40">序号</th><th>品类</th><th>品目</th><th>品牌型号</th><th>数量</th><th>单价</th><th>合计</th>
                            </tr>
                            <tr class="add_Table">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                    <div class="tableList">
                        <table border="1">
                            <tr>
                                <th>开票日期</th><th>票类</th><th>票号</th><th>品类</th><th>开票金额</th><th>税率</th><th v-if="type == '销项开票'">票态</th><th>录入</th>
                            </tr>
                            <tr class="add_Table">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td v-if="type == '销项开票'"></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </el-col>
            </el-row>
            <div class="tablebody">
                <span class="type_span">{{ type }} —— {{ type == '销项开票' ? '填开' : '接收'}}</span>
                <div class="mine-add">
                    <span class="el-icon-circle-plus" @click="addTable"></span>
                    <span class="el-icon-remove-outline" @click="deleteTable"></span>
                </div>
                <div class="tableList">
                    <table border="1">
                        <tr>
                            <th width="40"></th>
                            <th>开票日期</th><th>票类</th><th>票号</th><th>品类</th><th>开票金额</th><th>税率</th><th>税额</th><th v-if="type == '销项开票'">退税</th>
                        </tr>
                        <tr class="add_Table" v-for="(item, index) in tableData" :key="index">
                            <td>
                                <span class="checkStyle" @click="checkList(index)">
                                    <i class="el-icon-check" v-show="item.list"></i>
                                    <i class="no-check" v-show="!item.list"></i>
                                </span>
                            </td>
                            <td><el-date-picker clearable v-model="item.tableInput1" type="date" value-format="yyyy-MM-dd" placeholder=""></el-date-picker></td>
                            <td>
                                <el-select clearable v-model="item.tableInput2" placeholder="">
                                    <el-option label="专票" value="专票"></el-option>
                                    <el-option label="普票" value="普票"></el-option>
                                </el-select>
                            </td>
                            <td><el-input clearable v-model="item.tableInput3" placeholder=""></el-input></td>
                            <td>
                                <el-select clearable v-model="item.tableInput4" placeholder="">
                                    <el-option label="硬件" value="硬件"></el-option>
                                    <el-option label="软件" value="软件"></el-option>
                                    <el-option label="服务" value="服务"></el-option>
                                </el-select>
                            </td>
                            <td><el-input clearable v-model="item.tableInput5" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="item.tableInput6" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="item.tableInput7" placeholder=""></el-input></td>
                            <td v-if="type == '销项开票'"><el-input clearable v-model="item.tableInput8" placeholder=""></el-input></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['type'],
    data () {
        return {
            tableData: [{list:false,tableInput1: '',tableInput2: '',tableInput3: '',tableInput4: '',tableInput5:'',tableInput6: '',tableInput7:'',tableInput8:''}],
            addForm: {
                addFormdata1: '',
                addFormdata2: '',
                addFormdata3: '',
                addFormdata4: '',
                addFormdata5: '',
                addFormdata6: '',
                addFormdata7: '',
            },
            rules: {
                addFormdata1:[
                    { required: true, message: this.type == '销项开票' ? '请输入销售人' : '请输入采购人', trigger: 'blur' },
                ],
                addFormdata2:[
                    { required: true, message: this.type == '销项开票' ? '请输入客户名称' : '请输入供应商', trigger: 'blur' },
                ],
                addFormdata3:[
                    { required: true, message: this.type == '销项开票' ? '请输入合同号' : '请输入采购号', trigger: 'blur' },
                ],
                addFormdata4:[
                    { required: true, message: this.type == '销项开票' ? '请输入合同名称' : '请输入采购名称', trigger: 'blur' },
                ],
                addFormdata5:[
                    { required: true, message: '请输入总票额', trigger: 'blur' },
                ],
                addFormdata6:[
                    { required: true, message: '请输入已开票', trigger: 'blur' },
                ],
                addFormdata7:[
                    { required: true, message: '请输入未开票', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        addTable(){//增加table
            this.tableData.push({list:false,tableInput1: '',tableInput2: '',tableInput3: '',tableInput4: '',tableInput5:'',tableInput6: '',tableInput7:'',tableInput8:''},)
        },
        checkList(index){
            this.tableData[index].list = !this.tableData[index].list;
        },
        deleteTable(){//删除table
            if(this.tableData.length == 1){
                this.$message.warning('不能少于一列!');
                return false
            }else{
                this.tableData = this.tableData.filter(e => {
                    return !e.list
                })
            }
        },
        setFormData(formName){
            let formdata = {
                ...this.addForm,
                'tableData': [...this.tableData]
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('billForm',formdata)
                }else {
                    return false
                }
            })
        },
    },
}
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";
    .tableList {
        min-height: 120px;
    }
    .tablebody {
        margin-top: 30px;
        box-shadow: 0 0 10px #ccc;
        padding: 15px;
        position: relative;
        .type_span {
            color: #E6A23C;
            font-size: 14px;
        }
        .mine-add {
            margin: 0 !important;
            span {
                color: #E6A23C;
            }
        }
        table {
            th {
                background: #E6A23C !important;
            }
        }
    }
</style>
