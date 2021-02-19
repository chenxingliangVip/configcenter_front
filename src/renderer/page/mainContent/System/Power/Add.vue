<template>
    <div class="addProject UserAdd">
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-form-item class="formList" prop="addFormData1" label="部门：">
                    <el-input clearable class="input_right" placeholder="请输入部门" v-model="addForm.addFormData1" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item class="formList" prop="addFormData2" label="角色：">
                    <el-input clearable class="input_right" placeholder="请输入角色：" v-model="addForm.addFormData2" :disabled="disabled"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="Table_body zll-table powerTable">
            <el-table :data="powerTable"
                      border style="width: 100%"
                      tooltip-effect="light"
                      :span-method="arraySpanMethod"
            >
                <el-table-column prop="index"  label="序号" width="50" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="tableNum1" label="主标题"  width="100"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="tableNum2" label="副标题"  width="150" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="内容" :show-overflow-tooltip="true">
                    <template slot-scope="{row}">
                        <el-checkbox-group v-model="check">
                            <el-checkbox :label="item.value" v-for="(item,index) in row.tableNum3"  :key="index" >{{item.title}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['type'],
        data(){
            return {
                check: [],
                disabled: false,
                addForm:{
                    addFormData1: '',
                    addFormData2: '',
                },
                rules: {
                    addFormData1:[
                        { required: true, message: '请输入部门', trigger: 'blur' },
                    ],
                    addFormData2:[
                        { required: true, message: '请输入角色', trigger: 'blur' },
                    ],
                },
                powerTable:[],
                powerData: [{
                    mainTitle: '首页',
                    children: [{
                        subtitle: '显示统计与内容',
                        content: [{
                            title: '公告',
                            value: '首页公告'
                        }],
                    }]
                    
                },{
                    mainTitle: '项目',
                    children: [{
                        subtitle: '项目管理',
                        content: [{
                            title: '新建',
                            value: '项目管理新建'
                        },{
                            title: '查看',
                            value: '项目管理查看'
                        },{
                            title: '管理',
                            value: '项目管理管理'
                        },{
                            title: '删除',
                            value: '项目管理删除'
                        }],
                    },{
                        subtitle: '合同管理',
                        content: [{
                            title: '新建',
                            value: '合同管理新建'
                        },{
                            title: '查看',
                            value: '合同管理查看'
                        },{
                            title: '编辑',
                            value: '合同管理编辑'
                        },{
                            title: '终止',
                            value: '合同管理终止'
                        }],
                    }] 
                },{
                    mainTitle: '技术',
                    children: [{
                        subtitle: '工时统计',
                        content: [{
                            title: '工作量',
                            value: '工时统计工作量'
                        },{
                            title: '查看',
                            value: '工时统计查看'
                        },{
                            title: '编辑',
                            value: '工时统计编辑'
                        },{
                            title: '审核',
                            value: '工时统计审核'
                        }],
                    }]
                },{
                    mainTitle: '采购',
                    children: [{
                        subtitle: '供应商管理',
                        content: [{
                            title: '新建',
                            value: '供应商管理新建'
                        },{
                            title: '查看',
                            value: '供应商管理查看'
                        },{
                            title: '审批',
                            value: '供应商管理审批'
                        },{
                            title: '禁用',
                            value: '供应商管理禁用'
                        },{
                            title: '删除',
                            value: '供应商管理删除'
                        }],
                    },{
                        subtitle: '采购',
                        content: [{
                            title: '新建',
                            value: '采购新建'
                        },{
                            title: 'S/N登记',
                            value: '采购S/N登记'
                        },{
                            title: '执行',
                            value: '采购执行'
                        },{
                            title: '管理',
                            value: '采购管理'
                        },{
                            title: '查看',
                            value: '采购查看'
                        }],
                    },{
                        subtitle: '出库',
                        content: [{
                            title: '出库',
                            value: '出库'
                        },{
                            title: 'S/N登记',
                            value: '出库S/N登记'
                        },{
                            title: '查看',
                            value: '出库查看'
                        }],
                    }]
                },{
                    mainTitle: '报销',
                    children: [{
                        subtitle: '我的报销',
                        content: [{
                            title: '新建',
                            value: '我的报销新建'
                        },{
                            title: '编辑',
                            value: '我的报销编辑'
                        },{
                            title: '删除',
                            value: '我的报销删除'
                        }],
                    },{
                        subtitle: '收支管理',
                        content: [{
                            title: '查看',
                            value: '收支管理查看'
                        },{
                            title: '管理',
                            value: '收支管理管理'
                        },{
                            title: '下载',
                            value: '收支管理下载'
                        }],
                    }]
                },{
                    mainTitle: '财务',
                    children: [{
                        subtitle: '报销管理',
                        content: [{
                            title: '查看',
                            value: '报销管理查看'
                        },{
                            title: '审核',
                            value: '报销管理审核'
                        },{
                            title: '汇总结算',
                            value: '报销管理汇总结算'
                        }],
                    },{
                       subtitle: '票据管理',
                        content: [{
                            title: '作废',
                            value: '票据管理作废'
                        },{
                            title: '红冲',
                            value: '票据管理红冲'
                        },{
                            title: '下载',
                            value: '票据管理下载'
                        }], 
                    },{
                        subtitle: '薪资管理',
                        content: [{
                            title: '新建薪资',
                            value: '薪资管理新建薪资'
                        },{
                            title: '编辑',
                            value: '薪资管理编辑'
                        },{
                            title: '结算',
                            value: '薪资管理结算'
                        }], 
                    },{
                        content: [{
                            title: '新建福利',
                            value: '薪资管理新建福利'
                        },{
                            title: '编辑',
                            value: '薪资管理编辑福利'
                        }]
                    },{
                        content: [{
                            title: '新建奖金',
                            value: '薪资管理新建奖金'
                        },{
                            title: '编辑',
                            value: '薪资管理编辑奖金'
                        }]
                    },{
                        subtitle: '费用管理',
                        content: [{
                            title: '管理',
                            value: '费用管理'
                        }], 
                    }]
                },{
                    mainTitle: '统计',
                    children: [{
                        subtitle: '统计分析',
                    }]
                },{
                    mainTitle: '系统',
                    children: [{
                        subtitle: '用户管理',
                    },{
                        subtitle: '权限设定',
                    },{
                        subtitle: '税率设置',
                    },{
                        subtitle: '科目管理',
                    },{
                        subtitle: '自主产品',
                    }]
                }],
            }
        },
        methods: {
            tableList(){
                let i = 1;
                for (let _i of this.powerData) {
                    let rowSpan = false;
                    let j = 1;
                    for(let _j of _i.children){
                        let obj ={
                            index: i,
                            tableNum1: _i.mainTitle,
                            tableNum2: _j.subtitle,
                            tableNum3: [],
                            rowSpan: _i.children.length,
                        }
                        if(_j.content){
                            for(let _k of _j.content){
                                let child = {
                                    title: _k.title,
                                    value: _k.value,
                                    rowSpan: _j.content.length,
                                };
                                obj.tableNum3.push(child);
                            }
                        }
                        if(rowSpan){
                            obj.rowSpan = 0;
                        }
                        j++;
                        rowSpan = true;
                        this.powerTable.push(obj);
                    }
                    i++;
                }
            },
            arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex < 2) {
                    if (row.rowSpan === 0) {
                        return [0, 0]
                    } else {
                        return [row.rowSpan, 1]
                    }
                }
            },
            setFormData(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('addForm',this.addForm)
                    }else {
                        return false
                    }
                })
            },
            disabledFun(){
                if(this.type == "新建"){
                    this.disabled = false
                }else{
                    this.disabled = true
                }
            }
        },
        mounted(){
            this.disabledFun()
            this.tableList()
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/dialog.scss";
    .UserAdd {
        .addForm {
            width: 50%;
        }
        .zll-table {
            margin-top: 15px;
        }
    }
    
</style>