<template>
	<div class="addProject">
		<div class="addForm zll-form">
			<el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
				<el-row :gutter="20">
					<el-col :span="9">
						<el-form-item class="formList" prop="addFormData1" label="销售人：">
							<el-input clearable class="input_right" placeholder="请输入销售人" v-model="addForm.addFormData1" :disabled="disabled"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="9">
						<el-form-item class="formList" prop="addFormData2" label="新客户：">
							<el-checkbox label="" v-model="addForm.addFormData2" :disabled="disabled" @change="handleCheck"></el-checkbox>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="18">
						<el-form-item class="formList" prop="addFormData3" label="客户名称：">
							<el-input clearable class="input_right" placeholder="请输入客户名称" v-model="addForm.addFormData3" :disabled="disabled"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<div class="create_project" v-show="titleTxt != '查看'">
							<span class="create">生成合同</span>
						</div>
					</el-col>
				</el-row>
                <div v-if="addForm.addFormData2">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-form-item class="formList" prop="addFormData4" label="地址：">
                                <el-input clearable class="input_right" placeholder="请输入地址" v-model="addForm.addFormData4" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="9">
                            <el-form-item class="formList" prop="addFormData5" label="联系人：">
                                <el-input clearable class="input_right" placeholder="请输入联系人" v-model="addForm.addFormData5" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item class="formList" prop="addFormData6" label="手机号：">
                                <el-input clearable class="input_right" placeholder="请输入手机号" v-model="addForm.addFormData6" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
				<div class="tableList" v-if="titleTxt == '查看'">
					<table border="1">
						<tr>
							<th>建项日期</th><th>项目名称</th><th>项目需求</th><th>预算（万元）</th><th>状态</th><th>项目号</th>
						</tr>
						<tr>
							<td>{{tableData.table1}}</td>
							<td>{{tableData.table2}}</td>
							<td>{{tableData.table3}}</td>
							<td>{{tableData.table4}}</td>
							<td>{{tableData.table5}}</td>
							<td>{{tableData.table6}}</td>
						</tr>
					</table>
				</div>
				<div class="tableList" v-else>
					<table border="1">
						<tr>
							<th>建项日期</th><th>项目名称</th><th>项目需求</th><th>预算（万元）</th><th>状态</th><th>项目号</th>
						</tr>
						<tr class="add_Table">
							<td>
								<el-date-picker clearable v-model="tableData.table1" value-format="yyyy-MM-dd" type="date" placeholder=""> </el-date-picker>
							</td>
							<td>
								<el-input clearable v-model="tableData.table2" placeholder=""></el-input>
							</td>
							<td>
								<el-input clearable v-model="tableData.table3" placeholder=""></el-input>
							</td>
							<td>
								<el-input clearable v-model="tableData.table4" placeholder=""></el-input>
							</td>
							<td>
								<el-select clearable v-model="tableData.table5" placeholder="">
									<el-option label="待审批" value="待审批"></el-option>
									<el-option label="售前" value="售前"></el-option>
									<el-option label="已签实施" value="已签实施"></el-option>
									<el-option label="完成" value="完成"></el-option>
									<el-option label="放弃" value="放弃"></el-option>
								</el-select>
							</td>
							<td>
								<el-input clearable v-model="tableData.table6" placeholder=""></el-input>
							</td>
						</tr>
					</table>
				</div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item class="formList" prop="addFormData7" label="审批人：">
							<el-input clearable class="input_right" placeholder="请输入审批人" v-model="addForm.addFormData7" :disabled="disabled"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item class="formList" prop="addFormData8" label="审批日期：">
							<el-date-picker v-model="addForm.addFormData8" type="date" placeholder="请选择审批日期" value-format="yyyy-MM-dd" :disabled="disabled"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item class="formList" prop="addFormData9" label="审批意见：">
							<el-input type="textarea" class="input_right" placeholder="请输入审批意见" v-model="addForm.addFormData9" :disabled="disabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
import { checkPhone } from '@/assets/js/verify'
export default {
	props: ["titleTxt","detailData"],
	data() {
		let userInfo = JSON.parse(localStorage.getItem("userInfo"));
		return {
			disabled: false,
			tableData: {
                table1: "", //建项日期
                table2: "", //项目名称
                table3: "", //项目需求
                table4: "", //预算（万元）
                table5: "", //状态
                table6: "", //项目号
            },
			addForm: {
				addFormData1: "", //销售人
				addFormData2: false, //新客户
				addFormData3: "", //客户名称
				addFormData4: "", //地址
				addFormData5: "", //联系人
				addFormData6: "", //手机号
				addFormData7: userInfo.name, //审批人
				addFormData8: "", //审批日期
				addFormData9: "", //审批意见
			},
			rules: {
				addFormData1: [
					{ required: true, message: "请输入销售人", trigger: "blur", },
				],
				addFormData3: [
					{ required: true, message: "请输入客户名称", trigger: "blur", },
				],
				addFormData4: [
					{ required: true, message: "请输入地址", trigger: "blur", },
				],
				addFormData5: [
					{ required: true, message: "请输入联系人", trigger: "blur", },
				],
				addFormData6: [
					{ required: true, validator: checkPhone, trigger: "blur", },
				],
				addFormData7: [
					{ required: true, message: "请输入审批人", trigger: "blur", },
				],
				addFormData8: [
					{ required: true, message: "请选择审批日期", trigger: "change", },
				],
			},
		};
	},
	methods: {
		disabledFun() {
			if (this.titleTxt == "查看") {
				this.disabled = true;
			} else {
				this.disabled = false;
			}
        },
        handleCheck(val) {
            if(val) {
                this.addForm.addFormData2 = true
            }
        },
		setFormData(formName) {
            if(this.tableData.table1 == "") {
                this.$message.error('请选择建项日期');
                return false
            }
            if(this.tableData.table2 == "" || this.tableData.table2.length > 16) {
                this.$message.error('项目名称为16字符以内');
                return false
            }
            if(this.tableData.table3 == "" || this.tableData.table3.length > 60) {
                this.$message.error('项目需求为60字符以内');
                return false
            }
            if(!/^[0-9]+$/.test(this.tableData.table4)){
                this.$message.error('预算为数字')
                return false;
            }
            if(this.tableData.table5 == "") {
                this.$message.error('请选择状态');
                return false
            }
            let formdata = {
                ...this.addForm,
                ...this.tableData
            }
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$emit("addForm", formdata);
				} else {
					return false;
				}
			});
		},
	},
	mounted() {
        this.disabledFun();
        console.log(this.detailData)
        if(this.detailData){
            this.addForm.addFormData1 = this.detailData.Sale //销售人
        }
	},
};
</script>

<style scoped lang="scss">
@import "@/assets/style/dialog.scss";
</style>
