<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form :model="addForm" ref="addForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item class="formList" prop="addFormData1" label="入库号：">
                            <el-input clearable class="input_right" placeholder="请输入入库号" v-model="addForm.addFormData1"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData2" label="入库人：">
                            <el-input clearable class="input_right" placeholder="请输入入库人" v-model="addForm.addFormData2"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData3" label="入库日期：">
                            <el-date-picker type="date" placeholder="请选择入库日期" value-format="yyyy-MM-dd" v-model="addForm.addFormData3"></el-date-picker>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData4" :label="type == '软件入库' ? '软件未入：' : '硬件未入：'">
                            <el-input clearable class="input_right" :class="{ iscolor: addForm.addFormData4 != 0 }" :placeholder="type == '软件入库' ? '请输入软件未入' : '请输入硬件未入'" v-model="addForm.addFormData4"></el-input>
                        </el-form-item>
                        <el-form-item class="formList" prop="addFormData5" label="当前在入：">
                            <el-input clearable class="input_right" placeholder="请输入当前在入" v-model="addForm.addFormData5"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="18">
                        <div class="tableList" v-if=" type == '软件入库' ">
                            <table border="1">
                                <tr>
                                    <th width="20%">品名</th><th width="30%">型号</th><th width="20%">数量</th><th width="30%">客户号</th>
                                </tr>
                                <tr class="add_Table" v-for="(item, index) in tableData"  :key="index">
                                    <td width="20%">{{ item.tableData1 }}</td>
                                    <td width="30%">{{ item.tableData2 }}</td>
                                    <td width="20%">{{ item.tableData3 }}</td>
                                    <td width="30%">{{ item.tableData4 }}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="tableList" v-if=" type == '硬件入库' ">
                            <table border="1">
                                <tr>
                                    <th width="20%">品名</th><th width="40%">型号</th><th width="20%">数量</th><th width="20%">S/N</th>
                                </tr>
                                <tr class="add_Table" v-for="(item, index) in tableData"  :key="index">
                                    <td width="20%">{{ item.tableData1 }}</td>
                                    <td width="40%">{{ item.tableData2 }}</td>
                                    <td width="20%">{{ item.tableData3 }}</td>
                                    <td width="20%" style="color: #409EFF; cursor: pointer;" @click="inner()">登记</td>
                                </tr>
                            </table>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- S/N登记 -->
        <el-dialog width="30%" class="zll-dialog inner" title="S/N登记" :visible.sync="innerVisible" append-to-body>
            <p class="Invalid">S/N重复，输入无效！</p>
            <div class="tableList">
                <table border="1">
                    <tr class="add_Table">
                        <td width="20%">1</td>
                        <td width="80%">
                            <el-input clearable class="input_right" placeholder="" v-model="innerData.innerData1" 
                                @keydown.enter.native="next(0,$event)" :ref="'input0'"
                            ></el-input>
                        </td>
                    </tr>
                    <tr class="add_Table" >
                        <td width="20%">2</td>
                        <td width="80%">
                            <el-input clearable class="input_right" placeholder="" v-model="innerData.innerData2" 
                                @keydown.enter.native="next(1,$event)" :ref="'input1'"
                            ></el-input>
                        </td>
                    </tr>
                    <tr class="add_Table" >
                        <td width="20%">3</td>
                        <td width="80%">
                            <el-input clearable class="input_right" placeholder="" v-model="innerData.innerData3" 
                                @keydown.enter.native="next(2,$event)" :ref="'input2'"
                            ></el-input>
                        </td>
                    </tr>
                </table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="innerSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: ['type'],
    data () {
        return {
            innerVisible: false,//S/N登记
            addForm: {
                addFormData1: '',
                addFormData2: '',
                addFormData3: '',
                addFormData4: '3',
                addFormData5: '3',
            },
            tableData:[
                {
                    tableData1: "品名",
                    tableData2: "CREO2.0",
                    tableData3: "3",
                    tableData4: "",
                }
            ],
            innerData: { 
                innerData1: '',
                innerData2: '',
                innerData3: '',
            },
        }
    },
    methods: {
        inner() {
            this.innerVisible = true
        },
        next(idx,a) {
            let self = this;
            let len = Object.keys(this.innerData).length;
            document.onkeydown = function (e) {
                if (e.key == "Enter") {
                    if (self.$refs['input' + idx]) {
                        self.$nextTick(() => {
                            a.target.blur();
                            let index = idx + 1;
                            if(index == len) {
                                return false
                            }else {
                                self.$refs['input' + index].focus();
                            }
                        });
                    }
                }
            }; 
        },
        innerSubmit() {
            this.innerVisible = false
        },
        setFormData(){
            let formdata = {
                ...this.addForm,
                'tableData': [...this.tableData]
            }
            this.$emit("inForm", formdata);
        }
    },
}
</script>

<style scoped lang="scss">
@import "@/assets/style/dialog.scss";
.Invalid {
    color: #f80a0a;
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
}
</style>
