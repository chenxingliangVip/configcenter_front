<template>
    <div class="addProject setSubject">
        <div class="tableList">
            <table border="1">
                <tr>
                    <th>收支</th>
                    <th>收支类别 <el-checkbox class="isadd" v-model="isadd1" @change="checkChange">是否新增</el-checkbox></th>
                    <th>一级科目 <el-checkbox class="isadd" v-model="isadd2" @change="checkChange2">是否新增</el-checkbox></th>
                    <th>二级科目 <el-checkbox class="isadd" v-model="isadd3">是否新增</el-checkbox></th>
                    <th>三级科目</th>
                    <th>状态</th>
                </tr>
                <tr class="add_Table">
                    <td>
                        <el-select clearable v-model="tableData.tableInput1" placeholder="" @change="selectChange1">
                            <el-option label="收入" value="收入"></el-option>
                            <el-option label="支出" value="支出"></el-option>
                        </el-select>
                    </td>
                    <td>
                        <el-input clearable v-model="tableData.tableInput2" placeholder="" v-show="isadd1"></el-input>
                        <el-select clearable v-model="tableData.tableInput2" placeholder="" @change="selectChange2" v-show="!isadd1">
                            <el-option label="主营" value="主营" v-if="isShow1 == '收入'"></el-option>
                            <el-option label="其它" value="其它" v-if="isShow1 == '收入'"></el-option>
                            <el-option label="采购" value="采购" v-if="isShow1 == '支出'"></el-option>
                            <el-option label="财务" value="财务" v-if="isShow1 == '支出'"></el-option>
                            <el-option label="报销" value="报销" v-if="isShow1 == '支出'"></el-option>
                            <el-option label="工资" value="工资" v-if="isShow1 == '支出'"></el-option>
                            <el-option label="社保" value="社保" v-if="isShow1 == '支出'"></el-option>
                            <el-option label="固定支出" value="固定支出" v-if="isShow1 == '支出'"></el-option>
                            <el-option label="税费" value="税费" v-if="isShow1 == '支出'"></el-option>
                        </el-select>
                    </td>
                    <td>
                        <el-input clearable v-model="tableData.tableInput3" placeholder="" v-show="isadd2"></el-input>
                        <el-select clearable v-model="tableData.tableInput3" placeholder="" @change="selectChange3" v-show="!isadd2">
                            <el-option label="主营收入" value="主营收入" v-if="isShow2 == '主营'"></el-option>
                            <el-option label="其它收入" value="其它收入" v-if="isShow2 == '其它'"></el-option>
                            <el-option label="采购成本" value="采购成本" v-if="isShow2 == '采购'"></el-option>
                            <el-option label="财务费用" value="财务费用" v-if="isShow2 == '财务'"></el-option>
                            <el-option label="管理费用" value="管理费用" v-if="isShow2 == '报销' || isShow2 == '工资' || isShow2 == '社保' || isShow2 == '固定支出'"></el-option>
                            <el-option label="税费支出" value="税费支出" v-if="isShow2 == '税费'"></el-option>
                        </el-select>
                    </td>
                    <td>
                        <el-input clearable v-model="tableData.tableInput4" placeholder="" v-show="isadd3"></el-input>
                        <el-select clearable v-model="tableData.tableInput4" placeholder="" v-show="!isadd3">
                            <el-option label="营业" value="营业" v-if="isShow3 == '主营收入'"></el-option>
                            <el-option label="政府补助" value="政府补助" v-if="isShow3 == '其它收入'"></el-option>
                            <el-option label="利息" value="利息" v-if="isShow3 == '其它收入'"></el-option>
                            <el-option label="退税" value="退税" v-if="isShow3 == '其它收入'"></el-option>
                            <el-option label="采购" value="采购" v-if="isShow3 == '采购成本'"></el-option>
                            <el-option label="利息" value="利息" v-if="isShow3 == '财务费用'"></el-option>
                            <el-option label="手续" value="手续" v-if="isShow3 == '财务费用'"></el-option>
                            <el-option label="支票" value="支票" v-if="isShow3 == '财务费用'"></el-option>
                            <el-option label="差旅" value="差旅" v-if="isShow3 == '管理费用' && isShow2 == '报销'"></el-option>
                            <el-option label="招待" value="招待" v-if="isShow3 == '管理费用' && isShow2 == '报销'"></el-option>
                            <el-option label="办公" value="办公" v-if="isShow3 == '管理费用' && isShow2 == '报销'"></el-option>
                            <el-option label="汽车" value="汽车" v-if="isShow3 == '管理费用' && isShow2 == '报销'"></el-option>
                            <el-option label="福利" value="福利" v-if="isShow3 == '管理费用' && isShow2 == '报销'"></el-option>
                            <el-option label="邮寄" value="邮寄" v-if="isShow3 == '管理费用' && isShow2 == '报销'"></el-option>
                            <el-option label="工资" value="工资" v-if="isShow3 == '管理费用' && isShow2 == '工资'"></el-option>
                            <el-option label="社保" value="社保" v-if="isShow3 == '管理费用' && isShow2 == '社保'"></el-option>
                            <el-option label="房租" value="房租" v-if="isShow3 == '管理费用' && isShow2 == '固定支出'"></el-option>
                            <el-option label="物业" value="物业" v-if="isShow3 == '管理费用' && isShow2 == '固定支出'"></el-option>
                            <el-option label="水电" value="水电" v-if="isShow3 == '管理费用' && isShow2 == '固定支出'"></el-option>
                            <el-option label="咨询服务" value="咨询服务" v-if="isShow3 == '管理费用' && isShow2 == '固定支出'"></el-option>
                            <el-option label="增值税" value="增值税" v-if="isShow3 == '税费支出'"></el-option>
                            <el-option label="教育附加" value="教育附加" v-if="isShow3 == '税费支出'"></el-option>
                            <el-option label="城建维护" value="城建维护" v-if="isShow3 == '税费支出'"></el-option>
                        </el-select>
                    </td>
                    <td>
                        <el-input clearable v-model="tableData.tableInput5" placeholder=""></el-input>
                    </td>
                    <td style="width: 120px;">
                        <el-switch v-model="tableData.tableInput6"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="启用"
                            inactive-text="停用"
                        ></el-switch>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isadd1: false,
            isadd2: false,
            isadd3: false,
            tableData: {
                tableInput1: '',
                tableInput2: '',
                tableInput3: '',
                tableInput4: '',
                tableInput5: '',
                tableInput6: true
            },
            isShow1: '收入',
            isShow2: '',
            isShow3: ''
        };
    },
    methods: {
        selectChange1(val) {
            this.isShow1 = val
            this.tableData.tableInput2 = ''
            this.tableData.tableInput3 = ''
            this.tableData.tableInput4 = ''
        },
        selectChange2(val) {
            this.isShow2 = val
            this.tableData.tableInput3 = ''
            this.tableData.tableInput4 = ''
        },
        selectChange3(val) {
            this.isShow3 = val
            this.tableData.tableInput4 = ''
        },
        checkChange(val) {
            this.isadd1 = val
            this.isadd2 = val
            this.isadd3 = val
            this.tableData.tableInput2 = ''
            this.tableData.tableInput3 = ''
            this.tableData.tableInput4 = ''
        },
        checkChange2(val) {
            this.isadd2 = val
            this.isadd3 = val
            this.tableData.tableInput3 = ''
            this.tableData.tableInput4 = ''
        },
        setFormData() {
            if(this.tableData.tableInput1 == '') {
                this.$message.error('请选择收支');
                return false
            }
            if(this.tableData.tableInput2 == '') {
                this.$message.error('请选择收支类型');
                return false
            }
            if(this.tableData.tableInput3 == '') {
                this.$message.error('请选择一级科目');
                return false
            }
            if(this.tableData.tableInput4 == '') {
                this.$message.error('请选择二级科目');
                return false
            }
            if(this.tableData.tableInput6) {
                this.tableData.tableInput6 = '启用'
            }else {
                this.tableData.tableInput6 = '停用'
            }
            this.$emit('addForm', this.tableData)
        },
    },
    mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/dialog.scss";
.setSubject {
    .tableList {
        margin-top: 40px; 
        th {
            position: relative;
            .isadd {
                position: absolute;
                top: -30px;
                left: 0;
            }
        }
    }
}
</style>