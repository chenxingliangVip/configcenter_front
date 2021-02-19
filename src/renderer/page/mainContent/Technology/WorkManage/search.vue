<template>
    <div class="addProject">
        <div class="show_list">
            <span class="nav" @click="showNav(0)" :class="{active:active == 0}">个人工作量</span>
            <span> | </span>
            <span class="nav" @click="showNav(1)" :class="{active:active == 1}">项目工作量</span>
        </div>
        <div v-if="active == 0">
            <div class="Search_Top_Input">
                <div class="input_flex">
                    <el-input clearable v-model="searchInput1" placeholder="姓名"></el-input>
                </div>
                <div class="input_flex" style="width: 200px">
                    <el-date-picker v-model="searchInput2" type="daterange" range-separator="-" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                </div>
                <div class="input_flex">
                    <span class="zll-search">搜索</span>
                    <span class="zll-search-reset" @click="searchReset()">重置</span>
                </div>
                <div class="addNew">
                    <span class="download"> 数据导出</span>
                </div>
            </div>
            <div class="addForm zll-form">
                <div class="tableList week">
                    <p class="txt">
                        <span class="item-txt">张三</span>
                        <span> / </span>
                        <span class="item-txt">2020-07-11 - 2020-07-13</span>
                        <span> / </span>
                        <span class="item-txt">112 人.天</span>
                        <span> / </span>
                        <span class="item-txt">3个项目</span>
                    </p>
                    <table border="1">
                        <tr>
                            <th width="15%">日期</th><th width="20%">项目号</th><th width="35%">项目名称</th><th width="30%">工作量</th>
                        <tr>
                            <td width="15%">2020-07-11</td>
                            <td width="20%">AM</td>
                            <td width="35%">222</td>
                            <td width="30%">1</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div v-if="active == 1">
            <div class="Search_Top_Input">
                <div class="input_flex">
                    <el-input clearable v-model="searchInput1" placeholder="项目号"></el-input>
                </div>
                <div class="input_flex">
                    <el-input clearable v-model="searchInput2" placeholder="项目名称"></el-input>
                </div>
                <div class="input_flex">
                    <el-input clearable v-model="searchInput3" placeholder="客户名称"></el-input>
                </div>
                <div class="input_flex" style="width: 200px">
                    <el-date-picker v-model="searchInput4" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                </div>
                <div class="input_flex">
                    <span class="zll-search">搜索</span>
                    <span class="zll-search-reset" @click="searchReset()">重置</span>
                </div>
                <div class="addNew">
                    <span class="download"> 数据导出</span>
                </div>
            </div>
            <div class="addForm zll-form mineWork">
                <div class="tableList week">
                    <p class="txt">
                        <span class="item-txt">南京德朔实业有限公司</span>
                        <span> / </span>
                        <span class="item-txt">三维建模开发项目</span>  
                        <span> / </span>
                        <span class="item-txt">X1901003</span>
                        <span> / </span>
                        <span class="item-txt">112 人.天</span>
                        <span> / </span>
                        <span class="item-txt">2020-07-11 - 2020-07-13</span>
                    </p>
                    <table border="1">
                        <tr>
                            <th width="15%">日期</th><th width="35%">项目名称</th><th width="30%">姓名</th><th width="20%">工作量</th>
                        <tr>
                            <td width="15%">2020-07-11</td>
                            <td width="20%">AM</td>
                            <td width="35%">222</td>
                            <td width="30%">1</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            active: 0,
            searchInput1: '',
            searchInput2: '',
            searchInput3: '',
            searchInput4: '',
        }
    },
    methods: {
        showNav(val) {
            this.active = val
        },
        searchReset() { //重置搜索
            if( this.active == 0 ) {
                this.searchInput1 = "";
                this.searchInput2 = "";
            }else {
                this.searchInput1 = "";
                this.searchInput2 = "";
                this.searchInput3 = "";
                this.searchInput4 = "";
            }
        },
    },
    mounted() {
        
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/dialog.scss";
.show_list {
    margin-bottom: 20px;
    .nav {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        width: 80px;
        text-align: center;
        cursor: pointer;
        &.active {
            color: #34BFC6;
            font-weight: 600;
            font-size: 14px;
            border-bottom: 2px solid #34BFC6;
        }
    }
}
.week {
    margin-top: 0 !important;
    .txt {
        height: 30px;
        line-height: 30px;
        .item-txt {
            padding: 0 10px;
        }
    }
}
</style>
