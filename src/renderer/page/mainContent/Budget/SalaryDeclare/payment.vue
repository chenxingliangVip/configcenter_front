<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form :model="payForm" :rules="rules" ref="payForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item class="formList" prop="addFormData1" label="工资月份：">
                            <el-date-picker v-model="payForm.addFormData1" type="month" placeholder="选择工资月份"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="formList" prop="addFormData2" label="结算方式：">
                            <el-select clearable placeholder="请选择结算方式" v-model="payForm.addFormData2">
                                <el-option label="批量代发" value="批量代发"></el-option>
                                <el-option label="电汇" value="电汇"></el-option>
                                <el-option label="现金" value="现金"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="formList" prop="addFormData3" label="结算日期：">
                            <el-date-picker type="date" placeholder="请选择结算日期" v-model="payForm.addFormData3" value-format="yyyy-MM-dd"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="Table_body zll-table">
                    <el-table border :data="tableData" style="width: 100%"  @selection-change="handleSelect">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="tableInput1" label="部门"></el-table-column>
                        <el-table-column prop="tableInput2" label="姓名"></el-table-column>
                        <el-table-column prop="tableInput3" label="实发工资"></el-table-column>
                    </el-table>
                </div>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item class="formList" label="备注：">
                            <el-input clearable type="textarea" class="input_right" placeholder="请输入备注" v-model="payForm.addFormData4"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            payForm: {
                addFormData1: '',
                addFormData2: '',
                addFormData3: '',
                addFormData4: '',
            },
            rules: {
                addFormData1:[
                    { required: true, message: '请选择工资月份', trigger: 'change' },
                ],
                addFormData2:[
                    { required: true, message: '请选择结算方式', trigger: 'change' },
                ],
                addFormData3:[
                    { required: true, message: '请选择结算日期', trigger: 'change' },
                ],
            }, 
            tableData: [{tableInput1: '22',tableInput2: '22',tableInput3: '1'},{tableInput1: '22',tableInput2: '22',tableInput3: '1'}],
            selectList: [],
        }
    },
    methods: {
        handleSelect(val) {
            this.selectList = val
        },
        setFormData(formName){
            if(this.payForm.addFormData2 == '电汇') {
                if(this.selectList.length !== 1){
                    this.$message.warning("电汇只可结算一列数据！");
                    return false
                }
            }
            let payForm = {
                ...this.payForm,
                'tableData': [...this.tableData]
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('payForm',payForm)
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
    .zll-table {
        margin-top: 20px;
    }
</style>
