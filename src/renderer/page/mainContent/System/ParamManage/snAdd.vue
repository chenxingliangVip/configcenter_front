<template>
    <div class="addProject">
        <div class="Search_Top_Input">
            <div class="input_flex">
                <el-input clearable placeholder="输入/扫码输入S/N" v-model="searchInput1"></el-input>
            </div>
            <div class="input_flex">
                <span class="zll-search">搜索</span>
                <span class="zll-search-reset" @click="searchReset()">重置</span>
            </div>
        </div>
        <div class="addForm zll-form">
            <el-form :model="addForm" ref="addForm" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addFormData1" label="合同号：">
                            <el-input clearable class="input_right" placeholder="请输入合同号" v-model="addForm.addFormData1" disabled></el-input> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addFormData1" label="客户名称：">
                            <el-input clearable class="input_right" placeholder="请输入客户名称" v-model="addForm.addFormData2" disabled></el-input> 
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="tableList">
                    <table border="1">
                        <tr>
                            <th width="15%">品类</th><th width="15%">品名</th><th width="30%">型号</th><th width="20%">出库日期</th><th width="20%">S/N</th>
                        </tr>
                        <tr class="add_Table">
                            <td width="15%">{{ tableData.tableInput1 }}</td>
                            <td width="15%">{{ tableData.tableInput2 }}</td>
                            <td width="30%">{{ tableData.tableInput3 }}</td>
                            <td width="20%">{{ tableData.tableInput4 }}</td>
                            <td width="20%">{{ tableData.tableInput5 }}</td>
                        </tr>
                    </table>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item class="formList" prop="addFormData1" label="S/N 变更：">
                            <el-input clearable class="input_right" placeholder="输入/扫码输入" v-model="addForm.addFormData3"></el-input> 
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchInput1: "",
            tableData: {
                tableInput1: '硬件',
                tableInput2: 'PDA',
                tableInput3: '斑马3300GI',
                tableInput4: '2020-03-12',
                tableInput5: '10203040'
            },
            addForm: {
                addFormData1: '',
                addFormData2: '',
                addFormData3: '',
            }
        };
    },
    methods: {
        searchReset() {
            //重置搜索
            this.searchInput1 = "";
        },
        setFormData() {
            let addForm = {
                ...this.addForm,
                'tableData': {...this.tableData},
            }
            this.$emit("addForm", addForm);
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/dialog.scss";
</style>