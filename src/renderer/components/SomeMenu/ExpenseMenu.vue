<template>
    <div class="ExpenseMenu" >
        <el-col :span="8"><div @click="getshow(1)" :class="{active:shows == 1}" class="MenuList left">项目审批</div></el-col>
        <el-col :span="8"><div @click="getshow(2)" :class="{active:shows == 2}" class="MenuList middle">合同审批</div></el-col>
        <el-col :span="8"><div @click="getshow(3)" :class="{active:shows == 3}" class="MenuList right">采购审批</div></el-col>
        <div class="clearBoth"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                shows: 1
            }
        },
        methods:{
            getshow(val) {
                this.shows = val
                this.$emit('showFun',this.shows)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .ExpenseMenu {
        margin: 0 auto;
        width: 50%;margin-bottom: 15px;
        border: 1px solid #e6e6e6;
        border-bottom: 0;
        .MenuList {
            height: 35px;
            line-height: 33px;
            float: left;
            text-align: center;
            width: 100%;
            background: #f7f7f7;
            color: #333;
            font-size: 14px;
            cursor: pointer;
            border-top: 2px solid #f7f7f7;
            border-bottom: 1px solid #e6e6e6;
            &:hover {
                transition: all .3s;
                color: #34BFC6;
                background: #fff;
                border-top: 2px solid #fff;
            }
            &.active {
                color: #34BFC6;
                transition: all .3s;
                background: #fff;
                border-top: 2px solid #34BFC6;
                border-bottom: 1px solid #fff;
            }
            &.middle {
                border-left: 1px solid #e6e6e6;
                border-right: 1px solid #e6e6e6;
            }
        }
    }
</style>