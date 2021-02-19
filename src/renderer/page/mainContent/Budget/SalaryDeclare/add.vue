<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item class="formList" prop="addFormData1" label="工资月份：">
                            <el-date-picker v-model="addForm.addFormData1" type="month" placeholder="选择工资月份" :disabled="disabled"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item class="formList" prop="addFormData2" label="人数：">
                            <el-input clearable class="input_right" placeholder="请输入人数" v-model="addForm.addFormData2" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="formList" prop="addFormData3" label="实发总额：">
                            <el-input clearable class="input_right" placeholder="请输入实发总额" v-model="addForm.addFormData3" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="formList" prop="addFormData4" label="状态：">
                            <el-select clearable placeholder="请选择状态" v-model="addForm.addFormData4" :disabled="disabled">
                                <el-option label="待审核" value="待审核"></el-option>
                                <el-option label="结算中" value="结算中"></el-option>
                                <el-option label="已结算" value="已结算"></el-option>
                                <el-option label="驳回" value="驳回"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="mine-add"  v-if="type !== '查看'">
                    <span class="el-icon-circle-plus" @click="addTable"></span>
                    <span class="el-icon-remove-outline" @click="deleteTable"></span>
                </div>
                <div class="tableList">
                    <table border="1">
                        <tr>
                            <th width="40"></th>
                            <th>部门</th><th>姓名</th><th>基本工资</th><th>考勤</th><th>餐补</th><th>代扣个保</th><th>代扣个积</th><th>代扣个税</th><th>实发工资</th>
                        </tr>
                        <tr class="add_Table" v-for="(item, index) in tableData" :key="index">
                            <td>
                                <span class="checkStyle" @click="checkList(index)" v-if="type !== '查看'">
                                    <i class="el-icon-check" v-show="item.list"></i>
                                    <i class="no-check" v-show="!item.list"></i>
                                </span>
                            </td>
                            <td><el-input clearable v-model="item.tableInput1" placeholder="" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.tableInput2" placeholder="" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.tableInput3" placeholder="" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.tableInput4" placeholder="" :disabled="disabled"></el-input> </td>
                            <td><el-input clearable v-model="item.tableInput5" placeholder="" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.tableInput6" placeholder="" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.tableInput7" placeholder="" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.tableInput8" placeholder="" :disabled="disabled"></el-input> </td>
                            <td><el-input clearable v-model="item.tableInput9" placeholder="" :disabled="disabled"></el-input></td>
                        </tr>
                    </table>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addFormData6" label="制表人：">
                            <el-input clearable class="input_right" placeholder="请输入制表人" v-model="addForm.addFormData6" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addFormData7" label="日期：">
                            <el-date-picker type="date" placeholder="请选择日期" v-model="addForm.addFormData7" value-format="yyyy-MM-dd" :disabled="disabled"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    props: ['type'],
    data () {
        return {
            disabled: false,
            addForm: {
                addFormData1: '',
                addFormData2: '',
                addFormData3: '',
                addFormData4: '',
                addFormData6: '',
                addFormData7: '',
            },
            rules: {
                addFormData1:[
                    { required: true, message: '请选择工资月份', trigger: 'change' },
                ],
                addFormData2:[
                    { required: true, message: '请输入人数', trigger: 'blur' },
                ],
                addFormData3:[
                    { required: true, message: '请输入实发总额', trigger: 'blur' },
                ],
                addFormData4:[
                    { required: true, message: '请选择状态', trigger: 'change' },
                ],
                addFormData6:[
                    { required: true, message: '请输入制表人', trigger: 'blur' },
                ],
                addFormData7:[
                    { required: true, message: '请选择日期', trigger: 'change' },
                ],
            },
            tableData: [{list:false,tableInput1: '',tableInput2: '',tableInput3: '',tableInput4: '',tableInput5:'',tableInput6: '',tableInput7: '',tableInput8: '',tableInput9:''}],
        }
    },
    methods: {
        addTable() {//增加table
            this.tableData.push({list:false,tableInput1: '',tableInput2: '',tableInput3: '',tableInput4: '',tableInput5:'',tableInput5:'',tableInput6: '',tableInput7: '',tableInput8:'',tableInput9:''},)
        },
        checkList(index) {
            this.tableData[index].list = !this.tableData[index].list;
        },
        deleteTable() {//删除table
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
            let addForm = {
                ...this.addForm,
                'tableData': [...this.tableData]
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('addForm', addForm)
                }else {
                    return false
                }
            })
        },
    },
    mounted() {
        if(this.type == '查看') {
            this.disabled = true
        }else {
            this.disabled = false
        }
    }
}
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";
</style>
