<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item class="formList" :label="type == '收入' ? '销售人：' : '采购人：'" prop="addFormData1">
                            <el-input clearable class="input_right" v-model="addForm.addFormData1" :placeholder="type == '收入' ? '请输入销售人' : '请输入采购人'"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" :label="type == '收入' ? '客户名称：' : '供应商：'" prop="addFormData2">
                            <el-input clearable class="input_right" v-model="addForm.addFormData2" :placeholder="type == '收入' ? '请输入客户名称' : '请输入供应商'"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" :label="type == '收入' ? '合同号：' : '采购号：'" prop="addFormData3">
                            <el-input clearable class="input_right" v-model="addForm.addFormData3" :placeholder="type == '收入' ? '请输入合同号' : '请输入采购号'"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" :label="type == '收入' ? '合同名称：' : '采购名称：'" prop="addFormData4">
                            <el-input clearable class="input_right" v-model="addForm.addFormData4" :placeholder="type == '收入' ? '请输入合同名称' : '请输入采购名称'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="formList"></el-form-item>
                        <el-form-item class="formList" :label="type == '收入' ? '合同额：' : '采购额：'" prop="addFormData5">
                            <el-input clearable class="input_right" v-model="addForm.addFormData5" :placeholder="type == '收入' ? '请输入合同额' : '请输入采购额'"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" :label="type == '收入' ? '已回款：' : '已付款：'" prop="addFormData6">
                            <el-input clearable class="input_right" v-model="addForm.addFormData6" :placeholder="type == '收入' ? '请输入已回款' : '请输入已付款'"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" :label="type == '收入' ? '未回款：' : '未付款：'" prop="addFormData7">
                            <el-input clearable class="input_right" v-model="addForm.addFormData7" :placeholder="type == '收入' ? '请输入未回款' : '请输入未付款'"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="tableList">
                <table border="1">
                    <tr>
                        <th width="50">序号</th><th>品类</th><th>品目</th><th>品牌型号</th><th>数量</th><th>结算日期</th><th>结算方式</th><th>金额</th><th>结算号</th><th>备注</th>
                    </tr>
                    <tr class="add_Table" v-for="(item, index) in tableData"  :key="index">
                        <td>{{ index + 1 }} </td>
                        <td>
                            <el-select clearable v-model="item.table1" placeholder="">
                                <el-option label="硬件" value="硬件"></el-option>
                                <el-option label="软件" value="软件"></el-option>
                                <el-option label="服务" value="服务"></el-option>
                            </el-select>
                        </td>
                        <td><el-input clearable v-model="item.table2" placeholder=""></el-input> </td>
                        <td><el-input clearable v-model="item.table3" placeholder=""></el-input></td>
                        <td><el-input clearable v-model="item.table4" placeholder=""></el-input></td>
                        <td>
                            <el-date-picker clearable type="date" v-model="item.table5"></el-date-picker>
                        </td>
                        <td>
                            <el-select clearable v-model="item.table6" placeholder="">
                                <el-option label="现金" value="现金"></el-option>
                                <el-option label="电汇" value="电汇"></el-option>
                            </el-select>
                        </td>
                        <td><el-input clearable v-model="item.table7" placeholder=""></el-input></td>
                        <td><el-input clearable v-model="item.table8" placeholder=""></el-input></td>
                        <td><el-input clearable v-model="item.table9" placeholder=""></el-input></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { number} from '@/assets/js/verify'
export default {
    props: ['type'],
    data () {
        return {
            addForm: {
                addFormData1: "", //采购人
				addFormData2: "", //供应商
				addFormData3: "", //采购号
				addFormData4: "", //采购名称
				addFormData5: "", //采购额
				addFormData6: "", //已付款
				addFormData7: "", //未付款
            },
            rules: {
				addFormData1: [
					{ required: true, message: this.type == '收入' ? '请输入销售人' : '请输入采购人', trigger: "blur", },
				],
				addFormData2: [
					{ required: true, message: this.type == '收入' ? '请输入客户名称' : '请输入供应商', trigger: "blur", },
				],
				addFormData3: [
					{ required: true, message: this.type == '收入' ? '请输入合同号' : '请输入采购号', trigger: "blur",},
				],
				addFormData4: [
					{ required: true, message: this.type == '收入' ? '请输入合同名称' : '请输入采购名称', trigger: "blur", },
				],
				addFormData5: [
                    { required: true, message: this.type == '收入' ? '请输入合同额' : '请输入采购额', trigger: "blur" },
                    { validator: number, }
				],
				addFormData6: [
					{ required: true, message: this.type == '收入' ? '请输入已回款' : '请输入已付款', trigger: "blur", },
                    { validator: number, }
				],
				addFormData7: [
					{ required: true, message: this.type == '收入' ? '请输入未回款' : '请输入未付款', trigger: "blur", },
                    { validator: number, }
                ],
            },
            tableData:[
                { list:false,table1: '',table2: '',table3:'',table4: '',table5: '',table6:'',table7:'',table8:'',table9: '' },
            ],
        }
    },
    methods: {
        setFormData(formName){
            let formdata = {
                ...this.addForm,
                'tableData': [...this.tableData]
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('addForm',formdata)
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
