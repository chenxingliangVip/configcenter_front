<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addformdata1" label="单位/个人：">
                            <el-input clearable class="input_right" placeholder="请输入单位/个人" v-model="addForm.addformdata1"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata2" label="交易日期：">
                            <el-date-picker clearable type="date" placeholder="请选择交易日期" v-model="addForm.addformdata2"> </el-date-picker>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata3" label="说明：">
                            <el-input clearable class="input_right" placeholder="请输入说明" v-model="addForm.addformdata3"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addformdata4" label="借：">
                            <el-input clearable class="input_right" placeholder="请输入借" v-model="addForm.addformdata4"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata5" label="贷：">
                            <el-input clearable class="input_right" placeholder="请输入贷" v-model="addForm.addformdata5"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata6" label="余额：">
                            <el-input clearable class="input_right" placeholder="请输入余额" v-model="addForm.addformdata6"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import { number} from '@/assets/js/verify'
export default {
    data () {
        return {
            addForm: {
                addformdata1: '',
                addformdata2: '',
                addformdata3: '',
                addformdata4: '',
                addformdata5: '',
                addformdata6: '',
            },
            rules: {
                addformdata1:[
                    { required: true, message: '请输入单位', trigger: 'blur' },
                ],
                addformdata2:[
                    { required: true, message: '请选择交易日期', trigger: 'change' },
                ],
                addformdata3:[
                    { required: true, message: '请输入说明', trigger: 'blur' },
                ],
                addformdata4:[
                    { required: true, message: '请输入借', trigger: 'blur' },
                    { validator: number, }
                ],
                addformdata5:[
                    { required: true, message: '请输入贷', trigger: 'blur' },
                    { validator: number, }
                ],
                addformdata6:[
                    { required: true, message: '请输入余额', trigger: 'blur' },
                    { validator: number, }
                ],
            },
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
    },
}
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";
</style>
