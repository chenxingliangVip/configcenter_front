<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addFormData1" label="类别：">
                            <el-select clearable placeholder="请输入类别" v-model="addForm.addFormData1" :disabled="disabled">
                                <el-option label="硬件" value="硬件"></el-option>
                                <el-option label="软件" value="软件"></el-option>
                                <el-option label="服务" value="服务"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData2" label="品名：">
                            <el-input clearable class="input_right" placeholder="请输入品名" v-model="addForm.addFormData2" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData3" label="型号：">
                            <el-input clearable class="input_right" placeholder="请输入型号" v-model="addForm.addFormData3" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addFormData4" label="产品码：">
                            <el-input clearable class="input_right" placeholder="请输入产品码" v-model="addForm.addFormData4" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData5" label="日期：">
							<el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="addForm.addFormData5" :disabled="disabled"></el-date-picker>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData6" label="状态：">
                            <el-select clearable class="input_right" v-model="addForm.addFormData6" placeholder="请选择" :disabled="disabled">
                                <el-option label="启用" value="启用"></el-option>
                                <el-option label="停用" value="停用"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    props: ['titleTxt'],
    data(){
        return {
            disabled: false,
            addForm:{
                addFormData1: '',//类别
                addFormData2: '',//品名
                addFormData3: '',//型号
                addFormData4: '',//产品码
                addFormData5: '',//日期
                addFormData6: '',//状态
            },
            rules: {
                addFormData1:[
                    { required: true, message: '请选择类别', change: 'change' },
                ],
                addFormData2:[
                    { required: true, message: '请输入品名', trigger: 'blur' },
                ],
                addFormData3:[
                    { required: true, message: '请输入型号', trigger: 'blur' },
                ],
                addFormData4:[
                    { required: true, message: '请输入产品码', change: 'blur' },
                ],
                addFormData5:[
                    { required: true, message: '请选择日期', change: 'change' },
                ],
                addFormData6: [
                    { required: true, message: '请选择状态', change: 'change' },
                ],
            }
        }
    },
    methods: {
        setFormData(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('addForm',this.addForm)
                }else {
                    return false
                }
            })
        },
        disabledFun(){
            if(this.titleTxt == "查看"){
                this.disabled = true
            }else{
                this.disabled = false
            }
        }
    },
    mounted(){
        this.disabledFun()
    }
}
</script>
<style lang="scss" scoped>
    @import "@/assets/style/dialog.scss";
</style>