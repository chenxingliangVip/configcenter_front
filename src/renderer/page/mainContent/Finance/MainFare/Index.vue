<template>
    <div class="MainFare">
        <!-- 头部input搜索 -->
        <div class="Search_Top_Input">
			<div class="input_flex">
                <el-select clearable v-model="searchInput1" placeholder="类别">
                    <el-option label="销售" value="销售"></el-option>
                    <el-option label="采购" value="采购"></el-option>
                </el-select>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput2" placeholder="代号"></el-input>
			</div>
			<div class="input_flex">
                <el-input clearable v-model="searchInput3" placeholder="名称"></el-input>
			</div>
			<div class="input_flex">
                <el-date-picker type="daterange" range-separator="-" v-model="searchInput4" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
			</div>
			<div class="">
				<span class="zll-search">搜索</span>
				<span class="zll-search-reset" @click="searchReset()">重置</span>
			</div>
			<div class="addNew">
                <span class="download"> 统计导出</span>
			</div>
        </div>
        <!-- table -->
        <sys-table  
            :isMultipleSelection="true" 
            :tableData="tableData" 
            :tableLoading="tableLoading" 
            :tableHeader="tableHeader"
            :scopeWidth="150"
            @getSelection="getSelection"
        >
            <template slot-scope="scope" slot="operate">
                <el-button class="windup" @click="windUp(scope.row)" type="text" size="small">结算</el-button>
                <el-button class="bill" @click="Bill(scope.row)" type="text" size="small">发票</el-button>
            </template>
        </sys-table>
        <!-- 结算弹框 -->
        <div class="zll-dialog">
            <popout :title="'新建' + title" :visible.sync="addDialog" v-if="addDialog">
                <Add ref="add" slot="content" :type="title" @addForm="getFormData"></Add>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
                </template>
            </popout>
        </div> 
        <!-- 发票弹框 -->
        <div class="zll-dialog">
            <popout :title="title" :visible.sync="billDialog" v-if="billDialog" class="bigSize">
                <Bill ref="Bill" slot="content" :type="title" @billForm="getBillData"></Bill>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.Bill.setFormData('addForm')}">提 交</p>
                </template>
            </popout>
        </div>
    </div>
</template>

<script>
    import Add from './add'
    import Bill from './MakeOut'
    export default {
        data () {
            return {
                iswindup: false,
                isbill: false,
                title: '',
                tableLoading:true, //table刷新
                searchInput1: '',
                searchInput2: '',
                searchInput3: '',
                searchInput4: '',
                tableData: [{
                    tabledata1: '合同',//日期
                    tabledata2: '销售',//类别
                    tabledata3: '',//代号
                    tabledata4: '收',//名称
                    tabledata5: '11222',//总额
                    tabledata6: '221',//已开票
                    tabledata7: '',//未开票
                    tabledata8: '22',//已支付
                    tabledata9: '',//未支付
                }, {
                    tabledata1: '合同',//日期
                    tabledata2: '采购',//类别
                    tabledata3: '',//代号
                    tabledata4: '收',//名称
                    tabledata5: '11222',//总额
                    tabledata6: '221',//已开票
                    tabledata7: '32',//未开票
                    tabledata8: '22',//已支付
                    tabledata9: '',//未支付
                }],
                tableHeader:[],
                selectList: [],
                addDialog: false,
                billDialog: false,
            }
        },
        methods: {
            getTableList(){//获取表格数据
                this.tableLoading = true;
                setTimeout(()=>{
                    this.tableHeader =  [
                        {"columnValue": "tabledata1", "columnName": "日期"},
                        {"columnValue": "tabledata2", "columnName": "类别"},
                        {"columnValue": "tabledata3", "columnName": "代号"},
                        {"columnValue": "tabledata4", "columnName": "名称"},
                        {"columnValue": "tabledata5", "columnName": "总额", width: "100", isSortable: true },
                        {"columnValue": "tabledata6", "columnName": "已开票"},
                        {"columnValue": "tabledata7", "columnName": "未开票"},
                        {"columnValue": "tabledata8", "columnName": "已支付", width: "100"},
                        {"columnValue": "tabledata9", "columnName": "未支付", width: "100"},
                    ]
                    this.tableData = JSON.parse(JSON.stringify(this.tableData))
                    this.tableLoading = false;
                },500)
            },
            searchReset() { //重置搜索
                this.searchInput1 = "";
                this.searchInput2 = "";
                this.searchInput3 = "";
                this.searchInput4 = "";
                this.getTableList();
            },
            windUp(row) {//结算
                if(row.tabledata9 == '0') {
                    this.$message.error('尚未支付，不可结算！');
                    return false
                }else {
                    let type = row.tabledata2;
                    if(type == '销售'){
                        this.title = '收入'
                    }else if(type == '采购'){
                        this.title = '支出'
                    }
                    this.addDialog = true
                }
            },
            Bill(row) {//发票
                if(row.tabledata7 == '0') {
                    this.$message.error('尚未开票，不可发票！');
                    return false
                }else{
                    let type = row.tabledata2;
                    if(type == '销售'){
                        this.title = '销项开票'
                    }else if(type == '采购'){
                        this.title = '进项收票'
                    }
                    this.billDialog = true
                }
            },
            getFormData(data){//结算弹框数据
                this.addDialog = false
            },
            getBillData(data){//发票弹框数据
                this.billDialog = false
            },
            getSelection(val){ //选中List
                this.selectList = val;
            },
        },
        mounted(){
            this.getTableList();//显示table
        },
        components:{
            Add, Bill
        },
    }
</script>
<style scoped lang="scss">
    @import "@/assets/style/SearchTop.scss";
</style>
