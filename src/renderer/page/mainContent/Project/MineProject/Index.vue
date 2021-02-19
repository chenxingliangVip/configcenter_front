<template>
	<div class="MineProject">
		<!-- 头部input搜索 -->
		<div class="Search_Top_Input">
			<div class="input_flex">
				<el-input clearable v-model="searchData1" placeholder="客户名称"></el-input>
			</div>
			<div class="input_flex">
				<el-input clearable v-model="searchData2" placeholder="项目号"></el-input>
			</div>
			<div class="input_flex">
				<el-input clearable v-model="searchData3" placeholder="销售人"></el-input>
			</div>
			<div class="input_flex">
				<el-select clearable v-model="searchData4" placeholder="阶段">
					<el-option label="待审批" value="待审批"></el-option>
					<el-option label="售前" value="售前"></el-option>
					<el-option label="已签实施" value="已签实施"></el-option>
					<el-option label="完成" value="完成"></el-option>
					<el-option label="放弃" value="放弃"></el-option>
				</el-select>
			</div>
			<div class="">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
				<span @click="add()"><i class="el-icon-circle-plus-outline"></i> 新建项目</span>
			</div>
		</div>
		<!-- table -->
		<sys-table
			:isMultipleSelection="false"
			:tableData="tableData"
			:tableLoading="tableLoading"
			:tableHeader="tableHeader"
			:scopeWidth="200"
		>
			<template slot-scope="scope" slot="operate">
				<el-button @click="goDetail(scope.row)" type="text" size="small">查看</el-button>
				<el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
				<el-button type="text" size="small">周报</el-button>
				<el-button @click="order(scope.row)" type="text" size="small">下单</el-button>
			</template>
		</sys-table>

		<!-- 新建项目弹框 -->
		<div class="zll-dialog">
			<popout :title="title + '项目'" :visible.sync="addDialog" v-if="addDialog">
				<Add ref="add" slot="content" :titleTxt="title" @addForm="getFormData" :detailData="detailData"></Add>
				<template slot="bottom">
					<p class="zll-botton" v-if="title != '查看'" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
					<p class="zll-botton" v-else @click="addDialog = false">确 定</p>
				</template>
			</popout>
		</div>
	</div>
</template>

<script>
import Add from "./add";
export default {
	data() {
		return {
			title: "",
			searchData1: "",
			searchData2: "",
			searchData3: "",
			searchData4: "",
			tableData: [
				{
					buildDate: "2016-05-03", //建项日期
					projectNum: "111", //项目号
					Sale: "Sale", //销售人
					customer: "王小虎 1518 弄", //客户名称
					projectName: "projectName", //项目名称
					budget: 12, //预算
					stage: "待审批", //阶段
				},{
					buildDate: "2016-05-05", //建项日期
					projectNum: "111", //项目号
					Sale: "Sale", //销售人
					customer: "王小虎 1518 弄", //客户名称
					projectName: "projectName", //项目名称
					budget: 189, //预算
					stage: "待审批", //阶段
				},
			],
			tableHeader: [],
			tableLoading: true, //table刷新
			addDialog: false, //新建项目弹框
			detailData: {},
		};
	},
	methods: {
		getTableList() {
			//获取表格数据
			this.tableLoading = true;
			setTimeout(() => {
				for (let i = 0; i < this.tableData.length; i++) {
					this.tableData[i]["index"] = i + 1;
				}
				this.tableHeader = [
					{ columnValue: "index", columnName: "序号", width: "50" },
					{ columnValue: "buildDate", columnName: "建项日期", isSortable: true },
					{ columnValue: "projectNum", columnName: "项目号" },
					{ columnValue: "Sale", columnName: "销售人", width: "100" },
					{ columnValue: "customer", columnName: "客户名称" },
					{ columnValue: "projectName", columnName: "项目名称" },
					{ columnValue: "budget", columnName: "预算（万元）", width: "120", isSortable: true},
					{ columnValue: "stage", columnName: "阶段", width: "100" },
				];
				this.tableData = JSON.parse(JSON.stringify(this.tableData));
				this.tableLoading = false;
			}, 500);
		},
		getFormData(data) {
			//获取新增表单数据
			console.log(data);
			this.addDialog = false;
			this.tableData.push({
				buildDate: data.table1, //建项日期
				projectNum: data.table6, //项目号
				Sale: data.addFormData1, //销售人
				customer: data.addFormData3, //客户名称
				projectName: data.table2, //项目名称
				budget: data.table4, //预算
				stage: data.table5, //阶段
			});
			this.getTableList();
		},
		add() {
			//新建
			this.addDialog = true;
			this.title = "新建";
		},
		goDetail(row) {
			this.detailData = row;
			this.addDialog = true;
			this.title = "查看";
		},
		edit(row) {
			this.detailData = row;
			this.addDialog = true;
			this.title = "编辑";
		},
		order(row) {
			this.$confirm('确定下单？', '提示', {
				distinguishCancelAndClose: true,
				cancelButtonText: '取消',
				confirmButtonText: '确定',
			}).then(() => {
				this.$message.success("下单成功")

			}).catch(() => {
				this.$message.info("已取消")
			});
		},
		searchReset() {
			//重置搜索
			this.searchData1 = "";
			this.searchData2 = "";
			this.searchData3 = "";
			this.searchData4 = "";
			this.getTableList();
		},
	},
	mounted() {
		this.getTableList(); //显示table
	},
	components: {
		Add,
	},
};
</script>
<style scoped lang="scss">
@import "@/assets/style/SearchTop.scss";
</style>
