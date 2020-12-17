<template>
  <div class="app-container">
    <el-form
      status-icon
      :rules="rules"
      ref="form"
      :model="form"
      label-width="120px"
      size="mini"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="uid">
            <el-input disabled v-model="form.uid" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="token">
            <el-input disabled v-model="form.token" />
          </el-form-item>
        </el-col>
       </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="Password" prop="new_password1">
            <el-input
              type="password"
              autocomplete="off"
              v-model="form.new_password1"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Repetir password" prop="new_password2">
            <el-input
              type="password"
              autocomplete="off"
              v-model="form.new_password2"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"> </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import{ alterarSenha } from '../../api/user'


export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.form.new_password2 !== "") {
          this.$refs.form.validateField("new_password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.form.new_password1) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        uid: "",
        token: "",
        new_password1: "",
        new_password2: "",
       
      },
      rules: {
        new_password1: [{ validator: validatePass, trigger: "blur" }],
        new_password2: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
        this.form.uid = this.$route.params.uid
    this.form.token = this.$route.params.token
  },
  methods: {
    onSubmit() {
   
        

alterarSenha(this.form).then((response) => {
          this.$message({
        message: 'Senha alterada conforme solicitado, favor fazer login!',
        type: 'success'
      })
      
})

      // Colocar o indicador pq precisac


      
    },
    
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

