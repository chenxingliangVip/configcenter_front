<template>
    <div class="addProject">
        <div class="addForm zll-form">
             <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addformdata1" label="收支：">
                            <el-radio-group v-model="addForm.addformdata1" @change="radioChange" style="width: calc(100% - 72px)">
                                <el-radio label="收入">收入</el-radio>
                                <el-radio label="支出">支出</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item class="formList" prop="addformdata2" label="类别：">
                            <el-select clearable v-model="addForm.addformdata2" placeholder="请选择类别" v-if="type == '收入'" @change="selectChange">
                                <el-option label="其他" value="其他"></el-option>
                            </el-select>
                            <el-select clearable v-model="addForm.addformdata2" placeholder="请选择类别" v-else @change="selectChange2">
                                <el-option label="财务" value="财务"></el-option>
                                <el-option label="固定支出" value="固定支出"></el-option>
                                <el-option label="税费" value="税费"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="formList"></el-form-item>
                        <el-form-item class="formList" prop="addformdata3" label="结算人：">
                            <el-input clearable class="input_right" placeholder="请输入结算人" v-model="addForm.addformdata3"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="mine-add">
                    <span class="el-icon-circle-plus" @click="addTable"></span>
                    <span class="el-icon-remove-outline" @click="deleteTable"></span>
                </div>
                <div class="tableList">
                    <table border="1">
                        <tr>
                            <th width="40"></th>
                            <th>科目</th><th>摘要</th><th>金额</th><th>单位/个人</th><th>结算方式</th><th>日期</th><th>结算号</th>
                        </tr>
                        <tr class="add_Table" v-for="(item, index) in tableData" :key="index">
                            <td>
                                <span class="checkStyle" @click="checkList(index)">
                                    <i class="el-icon-check" v-show="item.list"></i>
                                    <i class="no-check" v-show="!item.list"></i>
                                </span>
                            </td>
                            <td>
								<el-select clearable v-model="item.tableInput1" placeholder="" v-if="type == '收入' || type2 == '其他'">
									<el-option label="政府补助" value="政府补助"></el-option>
									<el-option label="利息" value="利息"></el-option>
									<el-option label="退税" value="退税"></el-option>
								</el-select>
								<el-select clearable v-model="item.tableInput1" placeholder="" v-else-if=" type2 == '财务'">
									<el-option label="利息" value="利息"></el-option>
									<el-option label="手续" value="手续"></el-option>
									<el-option label="支票" value="支票"></el-option>
								</el-select>
								<el-select clearable v-model="item.tableInput1" placeholder="" v-else-if="type2 == '固定支出'">
									<el-option label="房租" value="房租"></el-option>
									<el-option label="物业" value="物业"></el-option>
									<el-option label="水电" value="水电"></el-option>
									<el-option label="咨询服务" value="咨询服务"></el-option>
								</el-select>
								<el-select clearable v-model="item.tableInput1" placeholder="" v-else-if="type2 == '税费'">
									<el-option label="增值税" value="增值税"></el-option>
									<el-option label="教育附加" value="教育附加"></el-option>
									<el-option label="城建维护" value="城建维护"></el-option>
								</el-select>
                            </td>
                            <td><el-input clearable v-model="item.tableInput2" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="item.tableInput3" placeholder=""></el-input></td>
                            <td><el-input clearable v-model="item.tableInput4" placeholder=""></el-input></td>
                            <td>
								<el-select clearable v-model="item.tableInput5" placeholder="">
									<el-option label="电汇" value="电汇"></el-option>
									<el-option label="现金" value="现金"></el-option>
								</el-select>
                            </td>
                            <td>
                                <el-date-picker clearable v-model="item.tableInput6" type="date" > </el-date-picker>
                            </td>
                            <td><el-input clearable v-model="item.tableInput7" placeholder=""></el-input></td>
                        </tr>
                    </table>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tableData: [{list:false,tableInput1: '',tableInput2: '',tableInput3: '',tableInput4: '',tableInput5:'',tableInput6: '',tableInput7:''}],
            addForm: {
                addformdata1: '收入',
                addformdata2: '',
                addformdata3: '',
            },
            rules: {
                addformdata1:[
                    { required: true, message: '请选择收支', trigger: 'change' },
                ],
                addformdata2:[
                    { required: true, message: '请选择类别', trigger: 'change' },
                ],
                addformdata3:[
                    { required: true, message: '请输入结算人', trigger: 'blur' },
                ],
            },
            type: '收入',
            type2: '其他'
        }
    },
    methods: {
        radioChange(val) {
            this.type = val
            this.addForm.addformdata2 = ''
            if(val == '支出'){
                this.type2 = '财务'
            }
        },
        selectChange(val) {
            this.type2 = val
            for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].tableInput1 = ''
            }
        },
        selectChange2(val) {
            this.type2 = val
            for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].tableInput1 = ''
            }
        },
        addTable() {//增加table
            this.tableData.push({list:false,tableInput1: '',tableInput2: '',tableInput3: '',tableInput4: '',tableInput5:'',tableInput6: '',tableInput7:''},)
        },
        checkList(index) {
            this.tableData[index].list = !this.tableData[index].list;
        },
        deleteTable() {//删除table
            if(this.tableData.length == 1){
                this.$message.warning('不能少于一列!');
                return false
            }else{
                this.tableData = this.tableData.filter(e => {
                    return !e.list
                })
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
    .tablebody {
        margin-top: 50px;
        border: 1px solid #ccc;
        // border-radius: 5px;
        padding: 15px;
        position: relative;

        .table_top {
            position:absolute;
            top: -32px;
            width: 60%;
            background: #fff;
            z-index: 111;
        }
    }
</style>
