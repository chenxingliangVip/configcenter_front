<template>
    <div class="approveManage">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane  name="table">
                <span slot="label"><el-badge :value="12" class="item">应用审核</el-badge></span>
                <apply-approve></apply-approve>
            </el-tab-pane>
            <el-tab-pane name="text">
                <span slot="label"><el-badge :value="12" class="item">配置审核</el-badge></span>
                <setting-approve></setting-approve>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import applyApprove from './apply_approve'
import settingApprove from './setting_approve'
    export default {
      name:"",
      components: {
        applyApprove,
        settingApprove
      },
      data(){
        return {
          activeName: 'table'
        }
      },
      methods:{

        handleClick(tab, event) {
          console.log(tab, event);
        }
      },
      mounted () {

      },

    }
</script>
<style>
    .approveManage .zll-botton {
        width: 118px !important;
        border-radius: 8px;
        float: right;
        margin-bottom: -50px
    }
    .approveManage .is-fixed{
        top: 7px !important;
    }
</style>
