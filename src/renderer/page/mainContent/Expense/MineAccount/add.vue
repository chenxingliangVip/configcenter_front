<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-row :gutter="20">
					<el-col :span="24">
						<el-form-item class="formList" prop="addFormData1" label="类别：">
                            <el-select clearable class="top_select" placeholder="" @change="typeChange" v-model="addForm.addFormData1" :disabled="disabled">
                                <el-option label="差旅" value="差旅"></el-option>
                                <el-option label="招待" value="招待"></el-option>
                                <el-option label="汽车" value="汽车"></el-option>
                                <el-option label="邮递" value="邮递"></el-option>
                                <el-option label="办公" value="办公"></el-option>
                                <el-option label="福利" value="福利"></el-option>
                            </el-select>
						</el-form-item>
					</el-col>
				</el-row>
                <el-row :gutter="20">
					<el-col :span="8">
						<el-form-item class="formList" prop="addFormData2" label="报销人：">
							<el-input clearable class="input_right" placeholder="请输入报销人" v-model="addForm.addFormData2" :disabled="disabled"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item class="formList" prop="addFormData3" label="报销日期：">
							<el-date-picker type="date" placeholder="请选择报销日期" value-format="yyyy-MM-dd" v-model="addForm.addFormData3" :disabled="disabled"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
                        <div class="formList">
                            <div class="click_icon" v-if="titleTxt != '查看'">
                                <span class="el-icon-circle-plus" @click="addTable"></span>
                                <span class="el-icon-remove-outline" @click="deleteTable"></span>
                            </div>
                        </div>
					</el-col>
				</el-row>
                <!-- 差旅 -->
                <div class="tableList" v-if="expenseType=='差旅'">
                    <table border="1">
                        <tr>
                            <th width="40"></th>
                            <th>发生时间</th><th>结束时间</th><th>地点</th><th>项目号</th><th>科目</th><th>金额</th><th>票据数</th><th>备注</th></tr>
                        <tr class="add_Table" v-for="(item, index) in tableData"  :key="index">
                            <td>
                                <span class="checkStyle" @click="checkList(index)">
                                    <i class="el-icon-check" v-show="item.list"></i>
                                    <i class="no-check" v-show="!item.list"></i>
                                </span>
                            </td>
                            <td><el-date-picker v-model="item.startTime" type="date" :disabled="disabled"></el-date-picker></td>
                            <td><el-date-picker v-model="item.endTime" type="date" :disabled="disabled"></el-date-picker></td>
                            <td><el-input clearable v-model="item.space" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.num" :disabled="disabled"></el-input></td>
                            <td>
                                <el-select clearable v-model="item.type" :disabled="disabled" placeholder="">
                                    <el-option label="车船" value="车船"></el-option>
                                    <el-option label="住宿" value="住宿"></el-option>
                                    <el-option label="市内" value="市内"></el-option>
                                </el-select>
                            </td>
                            <td><el-input clearable v-model="item.money" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.paper" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.bz" :disabled="disabled"></el-input></td>
                        </tr>
                        <tr class="trBottom">
                            <td colspan="6" >合计：</td>
                            <td>11</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <!-- 福利 -->
                <div class="tableList" v-else-if="expenseType=='福利'">
                    <table border="1">
                        <tr>
                            <th width="40"></th>
                            <th>发生时间</th><th>科目</th><th>金额</th><th>票据数</th><th>备注</th></tr>
                        <tr class="add_Table" v-for="(item, index) in tableData"  :key="index">
                            <td>
                                <span class="checkStyle" @click="checkList(index)">
                                        <i class="el-icon-check" v-show="item.list"></i>
                                        <i class="no-check" v-show="!item.list"></i>
                                </span>
                            </td>
                            <td><el-date-picker v-model="item.startTime" type="date" :disabled="disabled"></el-date-picker></td>
                            <td>
                                <el-select clearable v-model="item.type" :disabled="disabled" placeholder="">
                                    <el-option label="福利" value="福利" selected></el-option>
                                </el-select>
                            </td>
                            <td><el-input clearable v-model="item.money" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.paper" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.bz" :disabled="disabled"></el-input></td>
                        </tr>
                        <tr class="trBottom">
                            <td colspan="3" >合计：</td>
                            <td >11</td>
                            <td ></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <!-- 招待汽车邮递办公 -->
                <div class="tableList" v-else>
                    <table border="1">
                        <tr>
                            <th width="40"></th>
                            <th>发生时间</th><th>地点</th><th>项目号</th><th>科目</th><th>金额</th><th>票据数</th><th>备注</th></tr>
                        <tr class="add_Table" v-for="(item, index) in tableData"  :key="index">
                            <td>
                                <span class="checkStyle" @click="checkList(index)">
                                    <i class="el-icon-check" v-show="item.list"></i>
                                    <i class="no-check" v-show="!item.list"></i>
                                </span>
                            </td>
                            <td><el-date-picker v-model="item.startTime" type="date" :disabled="disabled"></el-date-picker></td>
                            <td><el-input clearable v-model="item.space" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.num" :disabled="disabled"></el-input></td>
                            <!-- 招待 -->
                            <td v-if="expenseType=='招待'">
                                <el-select clearable v-model="item.type" placeholder="" :disabled="disabled">
                                    <el-option label="招待" value="招待"></el-option>
                                </el-select>
                            </td>
                            <!-- 汽车 -->
                            <td v-else-if="expenseType=='汽车'">
                                <el-select clearable v-model="item.type" placeholder="" :disabled="disabled">
                                    <el-option label="汽油费" value="汽油费"></el-option>
                                    <el-option label="过路费" value="过路费"></el-option>
                                    <el-option label="停车费" value="停车费"></el-option>
                                    <el-option label="燃油费" value="燃油费"></el-option>
                                </el-select>
                            </td>
                            <!-- 邮递 -->
                            <td v-else-if="expenseType=='邮递'">
                                <el-select clearable v-model="item.type" placeholder="" :disabled="disabled">
                                    <el-option label="邮递费" value="邮递费"></el-option>
                                </el-select>
                            </td>
                            <!-- 办公 -->
                            <td v-else-if="expenseType=='办公'">
                                <el-select clearable v-model="item.type" placeholder="" :disabled="disabled">
                                    <el-option label="办公用品" value="办公用品"></el-option>
                                    <el-option label="日用品" value="日用品"></el-option>
                                    <el-option label="运输快递" value="运输快递"></el-option>
                                    <el-option label="维修安装" value="维修安装"></el-option> 
                                </el-select>
                            </td>
                            <td><el-input clearable v-model="item.money" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.paper" :disabled="disabled"></el-input></td>
                            <td><el-input clearable v-model="item.bz" :disabled="disabled"></el-input></td>
                        </tr>
                        <tr class="trBottom">
                            <td colspan="5">合计：</td>
                            <td>11</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    props: ['titleTxt'],
    data () {
        return {
            tableData:[
                {list:false,startTime:'' ,endTime: '',space: '',num: '',type: '',money:'',paper: '',bz: ''},
            ],
            expenseType: '差旅',
            disabled: false,
            addForm: {
                addFormData1: '差旅',//类别
                addFormData2: '',//报销人
                addFormData3: '',//报销日期
            },
			rules: {
				addFormData1: [
					{ required: true, message: "请选择类别", trigger: "change", },
				],
				addFormData2: [
					{ required: true, message: "请输入报销人", trigger: "blur", },
				],
				addFormData3: [
					{ required: true, message: "请选择报销日期", trigger: "change", },
				],
			},
        }
    },
    methods: {
        typeChange(val){
            this.expenseType = val
            for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].type = ''
            }
        },
        checkList(index){
            if(this.titleTxt == '查看'){
                return false
            }
            this.tableData[index].list = !this.tableData[index].list;
        },
        addTable(){//增加table
            this.tableData.push({list:false,startTime:'' ,endTime: '',space: '',num: '',type: '',money:'',paper: '',bz: ''},)
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
        disabledFun(){
            if(this.titleTxt == '查看'){
                this.disabled = true
            }else{
                this.disabled = false
            }
        },
		setFormData(formName) {
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
    },
    mounted(){
        this.disabledFun()
    }
}
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";
    .formList {
        position: relative;
    }
    .tableList {
        .trBottom {
            td  {
                padding-right: 30px !important
            }
        }
    }
    .top_select {
        width: 20% !important;
    }
    .click_icon {
        position: absolute;
        right: 20px;
        top: 10px;
        span {
            font-size: 22px;
            margin-left: 10px;
            color: #34BFC6;
            cursor: pointer;
            &:hover{
                transition: all .3s;
                opacity: .7;
            }
        }
    }
</style>
