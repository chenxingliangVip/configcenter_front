<template>
    <div >
        <p class="zll-botton " @click="addSetting" ><i class="el-icon-plus"></i> 新增配置</p>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane  name="table">
                <span slot="label">
                    <img v-if="activeName == 'table'" src="~@/assets/img/nr-table-blue.png" style="margin-bottom: -3px">
                    <img v-else src="~@/assets/img/nr-table.png" style="margin-bottom: -3px">
                    表 格</span>
                <setting-table></setting-table>
            </el-tab-pane>
            <el-tab-pane name="text">
                <span slot="label">
                    <img v-if="activeName == 'table'" src="~@/assets/img/nr-T.png" style="margin-bottom: -3px">
                    <img v-else src="~@/assets/img/nr-T-blue.png" style="margin-bottom: -3px">
                    文 本</span>
                <setting-text></setting-text>
            </el-tab-pane>
        </el-tabs>
        <div class="zll-dialog">
            <popout :visible.sync="addDialog" v-show="addDialog" class="Config_add">
                <Add ref="add" slot="content" ></Add>
            </popout>
        </div>
    </div>
</template>
<script>
import settingTable from './setting_table'
import settingText from './setting_text'
import Add from './add'
    export default {
      name:"",
      components: {
        settingTable,
        settingText,
        Add
      },
      data(){
        return {
          activeName: 'table',
          addDialog:false
        }
      },
      methods:{
        addSetting(){

        },

        handleClick(tab, event) {
          console.log(tab, event);
        }
      },
      mounted () {

      },

    }
</script>
<style scoped>
    .zll-botton {
        width: 118px !important;
        border-radius: 8px;
        float: right;
        margin-bottom: -50px
    }
</style>
