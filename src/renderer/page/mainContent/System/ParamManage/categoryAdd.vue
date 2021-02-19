<template>
    <div class="addProject">
        <div class="Search_Top_Input">
            <div class="input_flex">
                <el-input clearable placeholder="品类" v-model="searchInput1"></el-input>
            </div>
            <div class="input_flex">
                <el-input clearable placeholder="品名" v-model="searchInput2"></el-input>
            </div>
            <div class="input_flex">
                <span class="zll-search">搜索</span>
                <span class="zll-search-reset" @click="searchReset()">重置</span>
            </div>
            <div class="addNew">
                <span class="delete" @click="deleteTable()">
                    <i class="el-icon-delete"></i> 删除
                </span>
                <span @click="addTable()">
                    <i class="el-icon-circle-plus-outline"></i> 新建
                </span>
            </div>
        </div>
        <div class="tableList">
            <table border="1">
                <tr>
                    <th width="40"></th>
                    <th>票种</th><th>税率</th><th>品名码</th>
                </tr>
                <tr class="add_Table" v-for="(item, index) in tableData" :key="index">
                    <td>
                        <span class="checkStyle" @click="checkList(index)">
                            <i class="el-icon-check" v-show="item.list"></i>
                            <i class="no-check" v-show="!item.list"></i>
                        </span>
                    </td>
                    <td><el-input clearable v-model="item.tableInput1" placeholder=""></el-input></td>
                    <td><el-input clearable v-model="item.tableInput2" placeholder=""></el-input></td>
                    <td><el-input clearable v-model="item.tableInput3" placeholder=""></el-input></td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchInput1: "",
            searchInput2: "",
            tableData: [{list:false,tableInput1: '',tableInput2: '',tableInput3: ''}],
        };
    },
    methods: {
        searchReset() { //重置搜索
            this.searchInput1 = ""
            this.searchInput2 = ""
        },
        addTable() { //增加table
            this.tableData.push({
                list: false,
                tableInput1: "",
                tableInput2: "",
                tableInput3: ''
            });
        },
        checkList(index) {
            this.tableData[index].list = !this.tableData[index].list;
        },
        deleteTable() { //删除table
            if (this.tableData.length == 1) {
                this.$message.warning("不能少于一列!");
                return false;
            } else {
                this.tableData = this.tableData.filter((e) => {
                    return !e.list;
                });
            }
        },
        setFormData() {
            this.$emit("addForm", this.tableData);
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/dialog.scss";
</style>