<template>
	<div class="addProject">
		<div class="addForm zll-form">
			<el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
				<el-row>
					<el-col :span="24">
						<el-form-item class="formList" prop="addFormData1">
							<span class="search_left float">合同类型：</span>
                            <el-radio-group v-model="addForm.addFormData1" @change="radioChange" :disabled="disabled || radioDisabled" style="width: calc(100% - 72px)">
                                <el-radio label="项目">项目</el-radio>
                                <el-radio label="非项">非项</el-radio>
                            </el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item class="formList" prop="addFormData2" label="项目名称：" v-if="show">
							<el-input clearable class="input_right" placeholder="请输入项目名称" v-model="addForm.addFormData2" :disabled="disabled"></el-input>
						</el-form-item>
						<el-form-item class="formList" prop="addFormData3" label="客户名称：">
							<el-input clearable class="input_right" placeholder="请输入客户名称" v-model="addForm.addFormData3" :disabled="disabled"></el-input>
						</el-form-item>
						<el-form-item class="formList" prop="addFormData4" label="合同名称：">
							<el-input clearable class="input_right" placeholder="请输入合同名称" v-model="addForm.addFormData4" :disabled="disabled"></el-input>
						</el-form-item>
						<el-form-item class="formList" prop="addFormData5" label="合同日期：">
							<el-date-picker v-model="addForm.addFormData5" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :disabled="disabled"> </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item class="formList" prop="addFormData6" label="项目号：" v-if="show">
							<el-input clearable class="input_right" placeholder="请输入项目号" v-model="addForm.addFormData6" :disabled="disabled"></el-input>
						</el-form-item>
						<el-form-item class="formList" prop="addFormData7" label="销售人：">
							<el-input clearable class="input_right" placeholder="请输入销售人" v-model="addForm.addFormData7" :disabled="disabled"></el-input>
						</el-form-item>
						<el-form-item class="formList" prop="addFormData8" label="合同号：">
							<el-input clearable class="input_right" placeholder="请输入合同号" v-model="addForm.addFormData8" :disabled="disabled"></el-input>
						</el-form-item>
						<el-form-item class="formList" prop="addFormData9" label="阶段：">
							<el-select clearable v-model="addForm.addFormData9" placeholder="请选择阶段" @change="selectChange" :disabled="disabled">
								<el-option label="待增" value="待增"></el-option>
								<el-option label="待审核" value="待审核"></el-option>
								<el-option label="进行中" value="进行中"></el-option>
								<el-option label="完成" value="完成"></el-option>
								<el-option label="终止" value="终止"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="mine-add" v-show="titleTxt != '查看'">
					<span class="el-icon-circle-plus" @click="addTable"></span>
					<span class="el-icon-remove-outline" @click.stop="deleteTable"></span>
				</div>
				<div class="tableList" v-if="titleTxt == '查看'">
					<table border="1">
						<tr>
							<th width="40"></th><th>品类</th><th>品名型号</th><th>数量</th><th>单价</th><th>总价</th>
						</tr>
						<tr v-for="(item, index) in tableData" :key="index">
							<td><span class="checkStyle"><i class="no-check"></i></span></td>
							<td>{{ item.table1 }}</td>
							<td>{{ item.table2 }}</td>
							<td>{{ item.table3 }}</td>
							<td>{{ item.table4 }}</td>
							<td>{{ item.table5 }}</td>
						</tr>
					</table>
				</div>
				<div class="tableList" v-else>
					<table border="1">
						<tr>
							<th width="40"></th><th>品类</th><th>品名型号</th><th>数量</th><th>单价</th><th>总价</th>
						</tr>
						<tr class="add_Table" v-for="(item, index) in tableData" :key="index">
							<td>
								<span class="checkStyle" @click="checkList(index)">
									<i class="el-icon-check" v-show="item.list"></i>
									<i class="no-check" v-show="!item.list"></i>
								</span>
							</td>
							<td>
								<el-select clearable v-model="item.table1" placeholder="">
									<el-option label="硬件" value="硬件"></el-option>
									<el-option label="软件" value="软件"></el-option>
									<el-option label="服务" value="服务"></el-option>
								</el-select>
							</td>
							<td>
								<el-input clearable v-model="item.table2" placeholder=""></el-input>
							</td>
							<td>
								<el-input clearable v-model="item.table3" placeholder=""></el-input>
							</td>
							<td>
								<el-input clearable v-model="item.table4" placeholder=""></el-input>
							</td>
							<td>
								<el-input clearable v-model="item.table5" placeholder=""></el-input>
							</td>
						</tr>
					</table>
				</div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item class="formList" prop="addFormData10" label="付款方式：">
							<el-input clearable class="input_right" placeholder="请输入付款方式" v-model="addForm.addFormData10" :disabled="disabled"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item class="formList" prop="addFormData11" label="备注：">
							<el-input type="textarea" clearable class="input_right" placeholder="请输入备注" v-model="addForm.addFormData11" :disabled="disabled"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
export default {
	props: ["titleTxt"],
	data() {
		return {
            disabled: false,
            radioDisabled: false,
            show: true,
			tableData: [
				{
					list: false,
					table1: "",
					table2: "",
					table3: "",
					table4: "",
					table5: "",
				},
			],
			addForm: {
				addFormData1: "项目", //合同类型
				addFormData2: "", //项目名称
				addFormData3: "", //客户名称
				addFormData4: "", //合同名称
				addFormData5: "", //合同日期
				addFormData6: "", //项目号
				addFormData7: "", //销售人
				addFormData8: "", //合同号
                addFormData9: "", //阶段
                addFormData10: "", //付款方式
                addFormData11: "", //备注
			},
			rules: {
				addFormData1: [
					{ required: true, message: "合同类型", trigger: "blur", },
				],
				addFormData2: [
					{ required: true, message: "请输入项目名称", trigger: "blur", },
				],
				addFormData3: [
					{ required: true, message: "请输入客户名称", trigger: "blur",},
				],
				addFormData4: [
					{ required: true, message: "请输入合同名称", trigger: "blur", },
				],
				addFormData5: [
					{ required: true, message: "请选择日期", trigger: "change" },
				],
				addFormData6: [
					{ required: true, message: "请输入项目号", trigger: "blur", },
				],
				addFormData7: [
					{ required: true, message: "请输入销售人", trigger: "blur", },
				],
				addFormData8: [
					{ required: true, message: "请输入合同号", trigger: "blur" },
				],
				addFormData9: [
					{ required: true, message: "请选择阶段", trigger: "change", },
				],
				addFormData10: [
					{ required: true, message: "请输入付款方式", trigger: "blur" },
				],
				addFormData11: [
					{ required: true, message: "请输入备注", trigger: "blur", },
				],
			},
		};
	},
	methods: {
		checkList(index) {
			this.tableData[index].list = !this.tableData[index].list;
		},
		addTable() {
			//增加table
			this.tableData.push({
				list: false,
				table1: "",
                table2: "",
                table3: "",
                table4: "",
                table5: "",
			});
		},
		deleteTable() {
			//删除table
			if (this.tableData.length == 1) {
				this.$message.warning("不能少于一列!");
				return false;
			} else {
				this.tableData = this.tableData.filter(e => {
                    return !e.list
                })
			}
		},
		setFormData(formName) {
            for (let i = 0; i < this.tableData.length; i++) {
                let tableData = this.tableData[i];
                if(tableData.table1 == "") {
                    this.$message.error('请选择品类');
                    return false
                }
                if(tableData.table2 == "") {
                    this.$message.error('请输入品名型号');
                    return false
                }
                if(!/^[0-9]+$/.test(tableData.table3)){
                    this.$message.error('数量为数字')
                    return false;
                }
                if(tableData.table4 == "") {
                    this.$message.error('请输入单价');
                    return false
                }
                if(tableData.table5 == "") {
                    this.$message.error('请输入总价');
                    return false
                }
            }
            let formdata = {
                ...this.addForm,
                'tableData': [...this.tableData]
            }
            console.log(formdata)
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$emit("addForm", formdata);
				} else {
					return false;
				}
			});
        },
        radioChange(val) {
            if(val == "非项") {
                this.show = false
            }else {
                this.show = true
            }
        },
        selectChange(val){
            if(val == "待增"){
                this.radioDisabled = true
            }else {
                this.radioDisabled = false
            }
        },
		disabledFun() {
			if (this.titleTxt == "查看") {
				this.disabled = true;
			} else {
				this.disabled = false;
			}
		},
	},
	mounted() {
		this.disabledFun();
	},
};
</script>

<style scoped lang="scss">
@import "@/assets/style/dialog.scss";
</style>
