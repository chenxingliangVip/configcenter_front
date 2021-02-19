<template>
    <div class="DataCopy">
        <!-- table -->
        <sys-table :isMultipleSelection="false"
            :tableData="tableData"
            :tableLoading="tableLoading"
            :tableHeader="tableHeader"
            :scopeWidth="120"
            :isOperate="false"
            :isPagination="false"
        ></sys-table>
        <div class="message">
            <div class="message_list left">
                <p><span class="name one">用户信息：</span></p>
                <p><span class="name">软件名称：</span> 睿孚运营管理系统</p>
                <p><span class="name">软件版本：</span>R2020V01.01</p>
                <p><span class="name">购买日期：</span></p>
                <p><span class="name">客户名称：</span></p>
                <p><span class="name">客户号：</span></p>
                <p><span class="name">许可证号：</span></p>
                <p><span class="name">授权用户数：</span>5</p>
            </div>
            <div class="message_list">
                <div class="logo">
                    <img src="@/assets/img/ruiLogo.png">
                </div>
                <div class="txt">
                    <p><span class="name">版权所有：</span>南京睿孚信息科技有限公司</p>
                    <p><span class="name">软著编号：</span></p>
                    <p><span class="name">技术服务：</span></p>
                    <p><span class="name">网址：</span></p>
                    <p><span class="name">版权声明：</span></p>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableLoading: true, //table刷新
            tableData: [
                {
                    tableNum1: "20200101", //设定日期
                    tableNum2: "备份状态", //备份状态
                },
            ],
            tableHeader: [],
        };
    },
    methods: {
        getTableList() { //获取表格数据
            this.tableLoading = true;
            setTimeout(() => {
                for (let i = 0; i < this.tableData.length; i++) {
                    this.tableData[i]["index"] = i + 1;
                }
                this.tableHeader = [
                    { columnValue: "index", columnName: "序号", width: '100px' },
                    { columnValue: "tableNum1", columnName: "日期" },
                    { columnValue: "tableNum2", columnName: "备份状态" },
                ];
                this.tableData = JSON.parse(JSON.stringify(this.tableData));
                this.tableLoading = false;
            }, 500);
        },
    },
    mounted() {
        this.getTableList(); //显示table
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/SearchTop.scss";
.DataCopy {
    .message {
        box-shadow: 0 0 10px #ccc;
        margin-top: 30px;
        color: #666;
        padding: 20px;
        .message_list {
            float: left;
            width: 50%;
            padding: 0 30px;
            p {
                line-height: 30px;
                height: 30px;
                .name {
                    display: inline-block;
                    width: 90px;
                    &.one {
                        font-size: 14px;
                        &::before {
                            content: ' ';
                            width: 10px;
                            height: 10px;
                            background: #34BFC6;
                            display: inline-block;
                            margin-right: 5px;
                        }
                    }
                }
            }
            &.left {
                border-right: 1px solid #ccc;
            }
            .logo {
                float: left;
                height: 100%;
                padding-right: 20px;
                img {
                    width: 60px;
                    height: 60px;
                }
            }
            .txt {
                float: left;
            }
        }
    }
}
</style>