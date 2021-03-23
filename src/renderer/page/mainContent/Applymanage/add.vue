<template>
    <div class="addProject Config">
        <h1>{{title}}环境管理</h1>
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-form-item class="formList" prop="app_cname" label="中文名：">
                    <el-input clearable class="input_right" placeholder="请输入中文名" v-model="addForm.app_cname"
                              :disabled="disabled" ></el-input>
                </el-form-item>
                <el-form-item class="formList" prop="app_ename" label="英文名：">
                    <el-input clearable class="input_right" placeholder="请输入英文名" v-model="addForm.app_ename"
                              :disabled="disabled" ></el-input>
                </el-form-item>
                <el-form-item class="formList" prop="env_id" label="环境名：">
                    <el-select v-model="addForm.env_id" placeholder="请选择" clearable filterable :disabled="disabled">
                        <el-option
                                v-for="(item,index) in environments"
                                :key="index"
                                :label="item.ENV_CNAME"
                                :value="item.ENV_ID">
                            <span style="float: left">{{ item.ENV_CNAME }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.ENV_ENAME }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="formList"  label="创建人：">
                    <el-input clearable class="input_right"  v-model="addForm.create_user_name"
                              disabled></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="bottom" style="text-align: center;margin-top: 10px">
            <p class="zll-botton"  style="display: inline;margin-right: 20%" @click="add">提 交</p>
            <p class="zll-botton"  style="display: inline;background: #a1a2a7" @click="close">取 消</p>
        </div>
    </div>
</template>
<script>
  export default {
    props: ['editData', 'addType','envList'],
    data () {
      let validateNameCn= (rule, value, callback) => {
        let self = this;
        self.$serRequestService('CheckNameRepeat_CODE',JSON.stringify({check_type:6,app_cname:value})).then(function (data) {
          if (data != null) {
            let resp_data = JSON.parse(data)
            console.log(resp_data)
            console.log(self.addForm.app_cname)
            if(self.addType == 'edit'&& self.addForm.app_cname == value){
              callback();
            }
            if (!resp_data.status) {
              callback(new Error('名称已存在!'));
            } else {
              callback();
            }
          }
        })
      };
      let validateNameEn= (rule, value, callback) => {
        let self = this;
        self.$serRequestService('CheckNameRepeat_CODE',JSON.stringify({check_type:7,app_ename:value})).then(function (data) {
          if (data != null) {
            let resp_data = JSON.parse(data)
            if(self.addType == 'edit'&& self.addForm.app_ename == value){
              callback();
            }
            if (!resp_data.status) {
              callback(new Error('名称已存在!'));
            } else {
              callback();
            }
          }
        })
      };
      return {
        //防止多次点击
        clickMore:false,
        disabled: false,
        title:'',

        addForm: {
          app_ename: '',
          app_cname: '',
          env_id:'',
          create_user_id: '',
          create_user_name: '',
          modify_user_id:'',
          modify_user_name:'',
        },
        environments:[],
        rules: {
          app_cname: [
            {required: true, message: '请输入中文名', trigger: 'blur'},
            {validator: validateNameCn, trigger: 'blur'}
          ],
          env_id: [
            {required: true, message: '请选择环境', trigger: 'blur'},
          ],
          app_ename: [
            {required: true, message: '请输入英文名', trigger: 'blur',},
            {validator: validateNameEn, trigger: 'blur'}
          ],
        },
      }
    },
    methods: {
      close(){
        this.$emit('closeApp', this.addForm)
      },
      add () {
        let self = this;
        if(self.clickMore){
            return;
        }
        self.clickMore = true;
        self.$refs['addForm'].validate((valid) => {
          if (valid) {
            self.loading = true;
            let url = (this.addType == 'add')? 'AddApp_CODE':'UpdateApp_CODE';
            self.$serRequestService(url,JSON.stringify(self.addForm)).then(function (data) {
              self.clickMore = false;
              if (data == null) {
                self.$message.error('操作应用配置出错!')
              } else {
                self.$message.success('操作成功!')
                self.close();
              }
            })
          } else {
            self.clickMore = false;
            return false
          }
        })
      },
    },
    mounted () {

    },
    watch: {
      editData (val) {
        this.disabled = false;
        this.$refs['addForm'].clearValidate();
        this.title = this.addType == 'see' ? "查看":(this.addType == 'add'?"新增":"编辑");
        this.disabled = this.addType == 'see'?true:false;
        this.addForm = val;
        //type暂时写死
        this.addForm.app_type = '2';
      },
      envList(val){
        this.environments = val;
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";

    .bottom{
        .zll-botton {
            width: 120px;
            border-radius: 8px;
            /*margin-left: 90px;*/
        }
    }
    .addProject {
        width: 600px;
        margin: 0 auto;

        h1 {
            text-align: center;
            font-size: 20px;
            font-weight: normal;
            color: #3a8ee6;
            margin: 20px 0;
        }

        .zll-form {
            /*border: 1px solid #3a8ee6;*/
            border-radius: 10px;
            padding: 0 40px 2px;
        }

        .formList {
            margin-top: 20px;
            height: auto !important;
        }

    }
</style>
<style>
    .check_box .el-form-item__content{
        width: 100% !important;
    }
</style>
