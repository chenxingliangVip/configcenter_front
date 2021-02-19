<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item class="formList" label="采购人：" prop="addFormData1">
                            <el-input clearable class="input_right" v-model="addForm.addFormData1" placeholder="请输入采购人"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" label="采购号：" prop="addFormData2">
                            <el-input clearable class="input_right" v-model="addForm.addFormData2" placeholder="请输入采购号"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" label="联系人：" prop="addFormData3">
                            <el-input clearable class="input_right" v-model="addForm.addFormData3" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="formList" label="供应商：" prop="addFormData4">
                            <el-input clearable class="input_right" v-model="addForm.addFormData4" placeholder="请输入供应商"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" label="采购名称：" prop="addFormData5">
                            <el-input clearable class="input_right" v-model="addForm.addFormData5" placeholder="请输入采购名称"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" label="日期：" prop="addFormData6">
							<el-date-picker type="date" placeholder="请选择日期" v-model="addForm.addFormData6" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="formList" label="入库人：" prop="addFormData7">
                            <el-input clearable class="input_right" v-model="addForm.addFormData7" placeholder="请输入入库人"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" label="入库号：" prop="addFormData8">
                            <el-input clearable class="input_right" v-model="addForm.addFormData8" placeholder="请输入入库号"></el-input>
                        </el-form-item>
						<el-form-item class="formList" prop="addFormData9" label="状态：">
							<el-select clearable v-model="addForm.addFormData9" placeholder="请选择状态">
                                <el-option label="待审核" value="待审核"></el-option>
                                <el-option label="执行中" value="执行中"></el-option>
                                <el-option label="已完成" value="已完成"></el-option>
							</el-select>
						</el-form-item>
                    </el-col>
                </el-row>
                <div class="mine-add">
                    <span class="el-icon-circle-plus" @click="addTable"></span>
                    <span class="el-icon-remove-outline" @click.stop="deleteTable"></span>
                </div>
                <div class="tableList">
                    <table border="1">
                        <tr>
                            <th width="50">序号</th><th>类别</th><th>品名</th><th>型号</th><th>数量</th><th>单价</th><th>总价</th><th>税率</th><th>质保期</th><th>合同号</th>
                        </tr>
                        <tr class="add_Table" v-for="(item, index) in tableData"  :key="index">
                            <td>
                                <span class="checkStyle" @click="checkList(index)">
                                    <i class="el-icon-check" v-show="item.list"></i>
                                    <i class="no-check" v-show="!item.list"></i>
                                </span>
                            </td>
                            <td>
                                <el-select clearable v-model="item.table1" placeholder="" @change="typeChange"> 
                                    <el-option label="硬件" value="硬件"></el-option>
                                    <el-option label="软件" value="软件"></el-option>
                                    <el-option label="服务" value="服务"></el-option>
                                </el-select>
                            </td>
                            <td><el-input clearable v-model="item.table2" placeholder=""></el-input> </td>
                            <td><el-input clearable v-model="item.table3" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="item.table4" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="item.table5" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="item.table6" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="item.table7" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="item.table8" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="item.table9" placeholder="" :disabled="disabled"></el-input></td>
                        </tr>
                        <tr >
                            <td colspan="10" style="text-align: right;padding-right: 30px">合计含税总价：<span> 111</span></td>
                        </tr>
                    </table>
                </div>
                <el-row :gutter="20">
					<el-col :span="12">
						<el-form-item class="formList" prop="addFormData10" label="付款方式：">
							<el-input clearable class="input_right" placeholder="请输入付款方式" v-model="addForm.addFormData10"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item class="formList" label="备注：">
							<el-input type="textarea" clearable class="input_right" placeholder="请输入备注" v-model="addForm.addFormData11"></el-input>
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
		let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        return {
            disabled: false,
            addForm: {
                addFormData1: "", //采购人
				addFormData2: "", //采购号
				addFormData3: "", //联系人
				addFormData4: "", //供应商
				addFormData5: "", //采购名称
				addFormData6: "", //日期
				addFormData7: userInfo.name, //入库人
				addFormData8: "", //入库号
                addFormData9: "", //状态
                addFormData10: "", //付款方式
                addFormData11: "", //备注
            },
            rules: {
				addFormData1: [
					{ required: true, message: "请输入采购人", trigger: "blur", },
				],
				addFormData2: [
					{ required: true, message: "请输入采购号", trigger: "blur", },
				],
				addFormData3: [
					{ required: true, message: "请输入联系人", trigger: "blur",},
				],
				addFormData4: [
					{ required: true, message: "请输入供应商", trigger: "blur", },
				],
				addFormData5: [
					{ required: true, message: "请输入采购名称", trigger: "blur" },
				],
				addFormData6: [
					{ required: true, message: "请选择日期", trigger: "change", },
				],
				addFormData7: [
					{ required: true, message: "请输入入库人", trigger: "blur", },
				],
				addFormData8: [
					{ required: true, message: "请输入入库号", trigger: "blur" },
				],
				addFormData9: [
					{ required: true, message: "请选择状态", trigger: "change", },
				],
				addFormData10: [
					{ required: true, message: "请输入付款方式", trigger: "blur" },
				],
            },
            tableData:[
                { list:false,table1: '',table2: '',table3:'',table4: '',table5: '',table6:'',table7:'',table8:'',table9: '' },
            ],
        }
    },
    methods: {
        addTable(){//增加table
            this.tableData.push({ list:false,table1: '',table2: '',table3:'',table4: '',table5: '',table6:'',table7:'',table8:'',table9: '' })
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
        typeChange(val) {
            if( val !== '服务' ){
                this.disabled = true
            }else {
                this.disabled = false
            }
        },
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
