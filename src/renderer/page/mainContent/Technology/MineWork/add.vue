<template>
    <div class="addProject">
        <div class="Search_Top_Input">
			<div class="input_flex">
                <el-input clearable v-model="searchInput1" placeholder="客户名称"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput2" placeholder="项目号"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput3" placeholder="项目名称"></el-input>
			</div>
			<div class="input_flex">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
        </div>
		<div class="addForm zll-form mineWork">
			<el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item class="formList" prop="addFormData1" label="申报人：">
                            <el-input clearable class="input_right" placeholder="请输入申报人" v-model="addForm.addFormData1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="formList" prop="addFormData2" label="申报日期：">
							<el-date-picker v-model="addForm.addFormData2" type="date" placeholder="请选择申报日期" value-format="yyyy-MM-dd"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="formList" prop="addFormData3" label="状态：">
                            <el-select clearable v-model="addForm.addFormData3" placeholder="请选择状态">
                                <el-option label="未报" value="未报"></el-option>
                                <el-option label="驳回" value="驳回"></el-option>
                                <el-option label="待核" value="待核"></el-option>
                                <el-option label="通过" value="通过"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="tableList week">
                    <table border="1">
                        <tr>
                            <th colspan="2" width="20%">日期</th><th width="20%">项目号</th><th width="60%">工作内容</th>
                        <tr>
                            <td rowspan="2" width="15%">07-11</td>
                            <td width="5%">AM</td>
                            <td width="20%">222</td>
                            <td width="60%">
                                222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
                            </td>
                        </tr>
                        <tr>
                            <td>PM</td>
                            <td>222</td>
                            <td>222</td>
                        </tr>
                    </table>
                </div>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item class="formList" prop="addFormData4" label="审批人：">
                            <el-input clearable class="input_right" placeholder="请输入审批人" v-model="addForm.addFormData4"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="formList" prop="addFormData5" label="审批日期：">
							<el-date-picker v-model="addForm.addFormData5" type="date" placeholder="请选择审批日期" value-format="yyyy-MM-dd"> </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="formList" prop="addFormData6" label="备注：">
                            <el-input type="textarea" clearable class="input_right" placeholder="请输入备注" v-model="addForm.addFormData6"></el-input>
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
            searchInput1: '',
            searchInput2: '',
            searchInput3: '',
			addForm: {
				addFormData1: "", //申报人
				addFormData2: "", //申报日期
				addFormData3: "", //状态
				addFormData4: userInfo.name, //审批人
				addFormData5: "", //审批日期
				addFormData6: "", //备注
			},
			rules: {
				addFormData1: [
					{ required: true, message: "请输入申报人", trigger: "blur", },
				],
				addFormData2: [
					{ required: true, message: "请选择申报日期", trigger: "change", },
				],
				addFormData3: [
					{ required: true, message: "请选择状态", trigger: "change",},
				],
				addFormData4: [
					{ required: true, message: "请输入审批人", trigger: "blur", },
				],
				addFormData5: [
					{ required: true, message: "请选择审批日期", trigger: "change",},
				],
			},
        }
    },
    methods: {
        searchReset() { //重置搜索
            this.searchInput1 = "";
            this.searchInput2 = "";
            this.searchInput3 = "";
            this.getTableList();
        },
    }
}
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";
</style>
