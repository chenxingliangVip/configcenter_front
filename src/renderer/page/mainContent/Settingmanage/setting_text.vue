<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form ref="addForm" class="demo-ruleForm">
                <el-form-item class="formList" label="配置：">
                    <vue-editor v-model="content" :editorToolbar="customToolbar" @blur.native.capture="changeStyle" />
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        content: '',
        settingList: [{
          publish_status: '成功',
          key: 'tomcat',
          value: 'tomcat1.2.1版本',
          remark: '在linux1.5版本以上部署',
          edit_people: '陈兴亮',
          update_time: '2021-03-01'
        },
          {
            publish_status: '失败',
            key: 'java',
            value: 'jdk1.87',
            remark: '在linux1.5版本以上部署',
            edit_people: '张三',
            update_time: '2021-03-02'
          },
          {
            publish_status: '发布中',
            key: 'serverless',
            value: 'openwhisk',
            remark: '在linux1.5版本以上部署',
            edit_people: '里斯',
            update_time: '2021-03-03'
          },],
        customToolbar: [
          ['bold'],
        ],
        rules: {}
      }
    },
    methods: {
      changeStyle () {
        // let nodes = document.getElementById('quill-container').getElementsByTagName('ql-editor')
        // for(let i =0 ;i < this.settingList.length ;i++){
        //   let node_ele = nodes[i];
        //
        // }
        // console.log(this.content)
      },
    },
    mounted () {
      let nodes = document.getElementById('quill-container').getElementsByClassName('ql-editor');
      let node_ele = nodes[0];
      // for(let i =0 ;i < this.settingList.length ;i++){
      //   let key = this.settingList[i].key;
      //   let value = this.settingList[i].value;
      //   let ele_p = '<p><span style=\'color:rgb(42, 0, 255)\'>' + key + '=</span><span style=\'color: rgb(127, 0, 85);\'>  ' + value + '</span></p>';
      //   if(i == 0){
      //     node_ele.innerHTML = ele_p;
      //   }else{
      //     node_ele.innerHTML += ele_p;
      //   }
      // }
    },
    components: {},

    watch: {
      content (val) {
        let nodes = document.getElementById('quill-container').getElementsByTagName('p')
        for(let i =0 ;i < nodes.length ;i++){
            let node_e = nodes[i];
            let text = node_e.textContent;
            if(node_e.childElementCount == 0){
              let ele_p = "<span style='color:rgb(42, 0, 255)'>"+text+"</span>";
              node_e.innerHTML = ele_p;
            }
           if(node_e.childElementCount == 1&&text.indexOf("=") > 0){
             let left_text = text.substring(0,text.indexOf("=")+1);
             let right_text = text.replace(left_text,"");
             let ele_p = "<span style='color:rgb(42, 0, 255)'>"+left_text+"</span><span style='color:rgb(127, 0, 85);direction: rtl'>"+right_text+"</span>";
             node_e.innerHTML = ele_p;
          }
        }
        const container = document.getElementById("quill-container");
        container.focus();
        container.selectionStart = val.length;
        container.selectionEnd = val.length;
      }
    }
  }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/dialog.scss";
</style>

<style>
    .ace_variable {
        color: rgb(127, 0, 85);
    }

    .ace_string {
        color: rgb(42, 0, 255);
    }
</style>
