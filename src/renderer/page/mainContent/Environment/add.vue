<template>
	<div class="addProject Config">
        <h1>配置管理{{ titleTxt }}</h1>
		<div class="addForm zll-form">
			<el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-form-item class="formList" prop="addFormData1" label="配置项：">
                    <el-input clearable class="input_right" placeholder="请输入配置项" v-model="addForm.addFormData1" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item class="formList" prop="addFormData1" label="配置值：">
                    <el-input clearable type="textarea" rows="6" class="input_right" placeholder="请输入配置值" v-model="addForm.addFormData1" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item class="formList" prop="addFormData1" label="备注：">
                    <el-input clearable type="textarea" rows="6" class="input_right" placeholder="请输入备注" v-model="addForm.addFormData1" :disabled="disabled"></el-input>
                </el-form-item>
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
			addForm: {
				addFormData1: "",
				addFormData2: false, 
				addFormData3: "", 
			},
			rules: {
				addFormData1: [
					{ required: true, message: "请输入配置项", trigger: "blur", },
				],
				addFormData3: [
					{ required: true, message: "请输入配置值", trigger: "blur", },
				],
				addFormData4: [
					{ required: true, message: "请输入备注", trigger: "blur", },
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
		setFormData(formName) {
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
	},
};
</script>

<style scoped lang="scss">
@import "@/assets/style/dialog.scss";
.addProject {
    width: 600px;
    margin: 0 auto;
    h1 {
        text-align: center;
        font-size: 20px;
        font-weight: normal;
        color: #3a8ee6;
        margin: 20px 0;
    }
    .zll-form {
        border: 1px solid #3a8ee6;
        border-radius: 10px;
        padding: 0 60px 40px;
    }
    .formList {
        margin-top: 25px;
    }
}
</style>
