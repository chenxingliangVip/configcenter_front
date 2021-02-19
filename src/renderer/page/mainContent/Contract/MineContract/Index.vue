<template>
	<div class="MineContract">
		<!-- 头部input搜索 -->
		<div class="Search_Top_Input">
			<div class="input_flex">
				<el-input clearable v-model="searchInput1" placeholder="项目号"></el-input>
			</div>
			<div class="input_flex">
				<el-input clearable v-model="searchInput2" placeholder="合同号"></el-input>
			</div>
			<div class="input_flex">
				<el-input clearable v-model="searchInput3" placeholder="客户名称"></el-input>
			</div>
			<div class="input_flex">
				<el-select clearable v-model="searchInput4" placeholder="阶段">
					<el-option label="待增" value="待增"></el-option>
					<el-option label="待审核" value="待审核"></el-option>
					<el-option label="进行中" value="进行中"></el-option>
					<el-option label="完成" value="完成"></el-option>
					<el-option label="终止" value="终止"></el-option>
				</el-select>
			</div>
			<div class="input_flex">
				<el-date-picker v-model="searchInput5" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</div>
			<div class="input_flex">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
				<span @click="add()"><i class="el-icon-circle-plus-outline"></i> 新建合同</span>
			</div>
		</div>
		<!-- table -->
		<sys-table :isMultipleSelection="false" 
			:tableData="tableData" 
			:tableLoading="tableLoading" 
			:tableHeader="tableHeader" 
			:scopeWidth="150"
		>
			<template slot-scope="scope" slot="operate">
				<el-button @click="goDetail(scope.row)" type="text" size="small">查看</el-button>
				<el-button @click="edit(scope.row)" type="text" size="small">待增</el-button>
			</template>
		</sys-table>

		<!-- 新建合同弹框 -->
		<div class="zll-dialog">
			<popout :title="title + '合同'" :visible.sync="addDialog" v-if="addDialog" height="550px">
				<Add ref="add" slot="content" :titleTxt="title" @addForm="getFormData"></Add>
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
			tableLoading: true, //table刷新
			searchInput1: "",
			searchInput2: "",
			searchInput3: "",
			searchInput4: "",
			searchInput5: "",
			tableData: [
				{
					tableNum1: "项目号", //项目号
					tableNum2: "客户名称", //客户名称
					tableNum3: "合同号", //合同号
					tableNum4: "2016-05-03", //合同日期
					tableNum5: "合同名称", //合同名称
					tableNum6: 1000, //合同额
					tableNum7: "待审核", //阶段
					tableNum8: "1000", //已开票
					tableNum9: "0", //已回款
					tableNum10: "0", //未开票
					tableNum11: "1000", //未回款
				}, {
					tableNum1: "项目号", //项目号
					tableNum2: "客户名称", //客户名称
					tableNum3: "合同号", //合同号
					tableNum4: "2016-05-01", //合同日期
					tableNum5: "合同名称", //合同名称
					tableNum6: 20000, //合同额
					tableNum7: "待增", //阶段
					tableNum8: "25000", //已开票
					tableNum9: "25000", //已回款
					tableNum10: "0", //未开票
					tableNum11: "0", //未回款
				},
			],
			tableHeader: [],
			addDialog: false, //新建合同弹框
			title: "",
		};
	},
	methods: {
		getTableList() { //获取表格数据
			this.tableLoading = true;
			for (let i = 0; i < this.tableData.length; i++) {
				this.tableData[i]['index'] = i +1
			}
			setTimeout(() => {
				this.tableHeader = [
					{ columnValue: "index", columnName: "序号", width: "50" },
					{ columnValue: "tableNum1", columnName: "项目号" },
					{ columnValue: "tableNum2", columnName: "客户名称" },
					{ columnValue: "tableNum3", columnName: "合同号" },
					{ columnValue: "tableNum4", columnName: "合同日期",width: 120, isSortable: true },
					{ columnValue: "tableNum5", columnName: "合同名称" },
					{ columnValue: "tableNum6", columnName: "合同额", isSortable: true },
					{ columnValue: "tableNum7", columnName: "阶段" },
					{ columnValue: "tableNum8", columnName: "已开票" },
					{ columnValue: "tableNum9", columnName: "已回款" },
					{ columnValue: "tableNum10", columnName: "未开票" },
					{ columnValue: "tableNum11", columnName: "未回款" },
				];
				this.tableData = JSON.parse(JSON.stringify(this.tableData));
				this.tableLoading = false;
			}, 500);
		},
		getFormData(data) { //获取新增表单数据
			this.addDialog = false;
		},
		goDetail(row) { //查看详情
			this.addDialog = true;
			this.title = "查看";
			console.log(row);
		},
		add() { //新建
			this.addDialog = true;
			this.title = "新建";
		},
		edit() { //待增
			this.addDialog = true;
			this.title = "待增";
		},
		searchReset() { //重置搜索
			this.searchInput1 = "";
			this.searchInput2 = "";
			this.searchInput3 = "";
			this.searchInput4 = "";
			this.searchInput5 = "";
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
