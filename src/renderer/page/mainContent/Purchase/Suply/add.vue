<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addFormData1" label="供应商：">
                            <el-input clearable class="input_right" placeholder="请输入供应商" v-model="addForm.addFormData1" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData2" label="税号：">
                            <el-input clearable class="input_right" placeholder="请输入税号" v-model="addForm.addFormData2" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData3" label="地址：">
                            <el-input clearable class="input_right" placeholder="请输入地址" v-model="addForm.addFormData3" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData4" label="电话：">
                            <el-input clearable class="input_right" placeholder="请输入电话" v-model="addForm.addFormData4" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData5" label="开户行：">
                            <el-input clearable class="input_right" placeholder="请输入开户行" v-model="addForm.addFormData5" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData6" label="联行号：">
                            <el-input clearable class="input_right" placeholder="请输入联行号" v-model="addForm.addFormData6" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData7" label="账号：">
                            <el-input clearable class="input_right" placeholder="请输入账号" v-model="addForm.addFormData7" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addFormData8" label="联系人：">
                            <el-input clearable class="input_right" placeholder="请输入联系人" v-model="addForm.addFormData8" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData9" label="手机号：">
                            <el-input clearable class="input_right" placeholder="请输入手机号" v-model="addForm.addFormData9" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData10" label="邮箱：">
                            <el-input clearable class="input_right" placeholder="请输入邮箱" v-model="addForm.addFormData10" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item class="formList"></el-form-item>
                        <el-form-item class="formList" prop="addFormData11" label="建档人：">
                            <el-input clearable class="input_right" placeholder="请输入建档人" v-model="addForm.addFormData11" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData12" label="日期：">
							<el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="addForm.addFormData12" :disabled="disabled"></el-date-picker>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData13" label="状态：">
                            <el-select clearable class="input_right" v-model="addForm.addFormData13" placeholder="请选择" :disabled="disabled">
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
import { supplier, hutchet, checkPhone, checkTel, bank, Email, bankNum, Account, linkMan } from '@/assets/js/verify'
export default {
    props: ['titleTxt'],
    data(){
        return {
            disabled: false,
            addForm:{
                addFormData1: '',//供应商
                addFormData2: '',//税号
                addFormData3: '',//地址
                addFormData4: '',//电话
                addFormData5: '',//开户行
                addFormData6: '',//联行号
                addFormData7: '',//账号
                addFormData8: '',//联系人
                addFormData9: '',//手机号
                addFormData10: '',//邮箱
                addFormData11: '',//建档人
                addFormData12: '',//日期
                addFormData13: '',//状态
            },
            rules: {
                addFormData1:[
                    { required: true, validator: supplier, trigger: 'blur' },
                ],
                addFormData2:[
                    { required: true, validator: hutchet, trigger: 'blur' },
                ],
                addFormData3:[
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ],
                addFormData4:[
                    { required: true, validator: checkTel, trigger: 'blur' },
                ],
                addFormData5:[
                    { required: true, validator: bank, trigger: 'blur' },
                ],
                addFormData6:[
                    { required: true, validator: bankNum, trigger: 'blur' },
                ],
                addFormData7:[
                    { required: true, validator: Account, trigger: 'blur' },
                ],
                addFormData8:[
                    { required: true, validator: linkMan, trigger: 'blur' },
                ],
                addFormData9:[
                    { required: true, validator: checkPhone, trigger: 'blur' },
                ],
                addFormData10:[
                    { required: true, validator: Email, trigger: 'blur' },
                ],
                addFormData11:[
                    { required: true, message: '请输入建档人', change: 'blur' },
                ],
                addFormData12:[
                    { required: true, message: '请选择日期', change: 'change' },
                ],
                addFormData13:[
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