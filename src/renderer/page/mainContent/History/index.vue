<template>
    <div class="History"> 
        <h1 class="title-top-nav">发布历史</h1>
        <el-row>
            <el-col :span="6">
                <div class="list_top">
                    <span class="nav nav1">主版本发布</span>
                    <span class="nav nav2">主版本回滚</span>
                    <span class="nav nav3">灰度操作</span>
                </div>
                <div class="history_list">
                    <li class="nav-item" v-for="(item,index) in historyList" :key="index" :class="{'normal':item.type == '普通发布','roll':item.type == '回滚','grey':item.type == '灰度操作'}">
                        <p class="item1">{{ item.name }}</p>
                        <p class="item2">{{ item.type }}</p>
                        <p class="item3">{{ item.date }}</p>
                    </li>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="versions">
                    <p class="txt">（AppId：appstore，环境：DEV，集群：default，Namespace:application）</p>
                    <p class="zll-botton float">返回到项目首页</p>
                    <div class="version_top">
                        <p>20201212141555-release</p>
                        <span class="date">2020-12-12 14:15:55</span>
                        <div class="button_list">
                            <p class="zll-botton Info">回滚到此版本</p>
                            <p class="zll-botton Info">变更配置</p>
                            <p class="zll-botton Info">全部配置</p>
                        </div>
                        <div class="clearBoth"></div>
                    </div>
                    <div class="version_table">
                        <h3>变更配置</h3>
                        <div class="Table_body zll-table">
                            <el-table :data="tableData" border style="width: 100%" tooltip-effect="dark">
                                <el-table-column prop="type" label="Type" width="180"></el-table-column>
                                <el-table-column prop="key" label="Key" width="180"></el-table-column>
                                <el-table-column prop="oldvalue" label="Old Value"></el-table-column>
                                <el-table-column prop="newvalue" label="New Value"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            historyList: [{
                name: 'eqwrde',
                type: '普通发布',
                date: '1 hours ago',
            },{
                name: 'eqwrde',
                type: '回滚',
                date: '1 hours ago',
            },{
                name: 'eqwrde',
                type: '普通发布',
                date: '1 hours ago',
            },{
                name: 'eqwrde',
                type: '灰度操作',
                date: '1 hours ago',
            }],
            tableData: [{
                type: '删除',
                key: 'cc',
                oldvalue: 'cc1',
                newvalue: '',
            }, {
                type: '新增',
                key: 'dd',
                oldvalue: '',
                newvalue: 'w',
            }, ]
        }
    }
}
</script>

<style lang="scss" scoped>
.History {
    .title-top-nav {
        font-size: 16px;
        text-align: center;
        color: #34BFC6;
        margin: 15px 0;
    }
    .list_top {
        display: flex;
        margin-bottom: 15px;
        .nav {
            width: 30%;
            margin-left: 5%;
            text-align: center;
            padding: 5px 10px;
            color: #fff;
            &:nth-of-type(1) {
                margin-left: 0;
            }
            &.nav1 {
                background: #67C23A;
            }
            &.nav2 {
                background: #E6A23C;
            }
            &.nav3 {
                background: #909399;
            }
        }
    }
    .history_list {
        border: 1px solid #eee;
        .nav-item {
            display: flex;
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid #eee;
            padding: 0 10px;
            cursor: pointer;
            &:nth-of-type(1) {
                border-top: 1px solid #eee;
            }
            .item1 {
                width: 30%;
                font-size: 14px;
            }
            .item2 {
                width: 30%;
            }
            .item3 {
                width: 40%;
                text-align: right;
                color: #999;
            }
            &.normal {
                border-right: 4px solid #67C23A;
            }
            &.roll {
                border-right: 4px solid #E6A23C;
            }
            &.grey {
                border-right: 4px solid #909399;
            }
            &:hover {
                background: #efefef;
            }
        }
    }
    .versions {
        position: relative;
        .txt {
            height: 24px;
            line-height: 24px;
            margin-bottom: 15px;
            color: #999;
            padding-left: 100px;
        }
        .float {
            position: absolute;
            right: 0;
            top: 0;
        }
        .version_top {
            background: #efefef;
            padding: 15px;
            position: relative;
            .date {
                position: absolute;
                top: 15px;
                right: 15px;
                color: #999;
            }
            .button_list {
                display: flex;
                float: right;
                .zll-botton {
                    margin: 10px 0 0 10px;
                }
            }
        }
        .version_table {
            margin-top: 15px;
            padding: 15px;
            h3 {
                font-size: 14px;
                font-weight: 400;
                margin-bottom: 15px;
            }
        }
    }
}
</style>