<template>
    <div class="addProject Config">
        <h1>{{title}}环境管理</h1>
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-form-item class="formList" prop="env_cname" label="中文名：">
                    <el-input clearable class="input_right" placeholder="请输入中文名" v-model="addForm.env_cname"
                              :disabled="disabled" ></el-input>
                </el-form-item>
                <el-form-item class="formList" prop="env_ename" label="英文名：">
                    <el-input clearable class="input_right" placeholder="请输入英文名" v-model="addForm.env_ename"
                              :disabled="disabled" ></el-input>
                </el-form-item>
                <el-form-item class="formList"  label="创建人：">
                    <el-input clearable class="input_right"  v-model="addForm.create_user_name"
                              disabled></el-input>
                </el-form-item>
                <!--<el-form-item class="formList" prop="pro_app_count" label="专业应用数：">-->
                    <!--<el-input clearable class="input_right" placeholder="请输入专业应用数" v-model="addForm.pro_app_count"-->
                              <!--:disabled="disabled"></el-input>-->
                <!--</el-form-item>-->
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
    props: ['editData', 'titleTxt'],
    data () {
      let validateNameCn= (rule, value, callback) => {
        let self = this;
        self.$serRequestService('CheckNameRepeat_CODE',JSON.stringify({check_type:4,env_cnname:value})).then(function (data) {
          if (data != null) {
            let resp_data = JSON.parse(data)
            console.log(resp_data)
            console.log(self.copyData.env_cname)
            if(self.titleTxt == 'edit'&& self.copyData.env_cname == value){
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
        self.$serRequestService('CheckNameRepeat_CODE',JSON.stringify({check_type:5,env_enname:value})).then(function (data) {
          if (data != null) {
            let resp_data = JSON.parse(data)
            if(self.titleTxt == 'edit'&& self.copyData.env_ename == value){
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
          env_ename: '',
          env_cname: '',
          create_user_id: '',
          create_user_name: '',
          modify_user_id:'',
          modify_user_name:''
        },
        copyData:{},
        rules: {
          env_cname: [
            {required: true, message: '请输入中文名', trigger: 'blur'},
            {validator: validateNameCn, trigger: 'blur'}
          ],
          env_ename: [
            {required: true, message: '请输入英文名', trigger: 'blur',},
            {validator: validateNameEn, trigger: 'blur'}
          ],
        },
      }
    },
    methods: {
      close(){
        this.$emit('closeEnvir', this.addForm)
      },
      initUserInfo(){
        let self = this;
        let userInfo = self.$store.getters.user.userInfo;
        if(!userInfo){
          self.$message.error('获取用户信息出错!');
          return;
        }
        self.addForm.create_user_id = userInfo.id;
        self.addForm.create_user_name = userInfo.user_name;
        self.addForm.modify_user_id = userInfo.id;
        self.addForm.modify_user_name = userInfo.user_name;
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
            let url = (this.titleTxt == 'add'||this.titleTxt == 'clone')? 'AddEnv_CODE':'UpdateEnv_CODE';
            self.$serRequestService(url,JSON.stringify(self.addForm)).then(function (data) {
              self.clickMore = false;
              if (data == null) {
                self.$message.error('添加环境配置出错!')
              } else {
                self.$message.success('添加成功!')
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
        for(let key in this.addForm){
          this.addForm[key] = val[key]||"";
        }
        this.initUserInfo();
        if(this.titleTxt != 'add'){
          this.$set(this.addForm,'env_cname',val.ENV_CNAME);
          this.$set(this.addForm,'env_ename',val.ENV_ENAME);
        }
        if (this.titleTxt == 'see') {
          this.disabled = true;
          this.addForm.create_user_name = val.MODIFY_USER_NAME;
          this.title = "查看"
        }
        if (this.titleTxt == 'add') {
          this.title = "新增"
        }
        if (this.titleTxt == 'clone') {
          this.title = "克隆"
        }
        if (this.titleTxt == 'edit') {
          this.copyData = Object.assign({},this.addForm);
          this.addForm.create_user_name = val.MODIFY_USER_NAME;
          this.addForm.create_user_id = val.CREATE_USER_ID;
          this.addForm.env_id =val.ENV_ID;
          this.title = "编辑"
        }
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
