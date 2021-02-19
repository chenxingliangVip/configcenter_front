<template>
    <div class="addProject iconAdd add">
        <div class="addForm zll-form">
            <div class="formList" v-for="(item,index) in powerData" :key="index">
                <span class="search_left">{{ item.name }}</span>
                <el-checkbox-group  class="icon_right" v-model="checkList">
                    <el-checkbox v-for="(item2,index2) in item.children" :key="index2" :label="item2.subname"></el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            powerData: [{
                name: '项目',
                children: [{
                    subname: '我的项目',
                }, {
                    subname: '项目管理',
                }]
            }, {
                name: '合同',
                children: [{
                    subname: '我的合同',
                }, {
                    subname: '合同管理',
                }]
            }, {
                name: '技术',
                children: [{
                    subname: '我的工作',
                }, {
                    subname: '工作管理',
                }]
            }, {
                name: '采购',
                children: [{
                    subname: '采购任务',
                }, {
                    subname: '供应商管理',
                }, {
                    subname: '产品管理',
                }]
            }, {
                name: '出入库',
            }],
            checkList: []
        };
    },
    methods: {
        setAddFormData() {
            this.$emit("addForm", this.checkList);
        },
    },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/style/dialog.scss";
.iconAdd {
    padding-left: 20px;
    .search_left {
        float: left;
        text-align: left;
        width: 100px;
        &::before {
            content: ' ';
            width: 10px;
            height: 10px;
            background: #34BFC6;
            display: inline-block;
            margin-right: 5px;
        }
    }
    .icon_right {
        width: calc( 100% - 100px );
        float: left;
    }
}
</style>
