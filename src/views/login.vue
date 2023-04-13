<template>
  <div class="login flex column yCenter">
    <img src="../assets/loginLogo.png">

    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
    >
      <el-form-item  prop="username">
        <el-input size="large" v-model="form.username" placeholder="用户名" />
      </el-form-item>
      <el-form-item  prop="password">
        <el-input size="large" type="password" v-model="form.password" placeholder="密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="Login(formRef)">
          登录
        </el-button>
        <el-button type="warning" size="large" @click="Register(formRef)">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref,reactive,unref } from "vue";
import { ElMessage } from 'element-plus';
import { useRouter } from "vue-router";
import {login,register} from '@api/api.js';
const router = useRouter();
const formRef = ref();
const form = ref({
  username:"",
  password:""
})
const rules = reactive({
  username: [{required: true, message: '请输入用户名', trigger: 'blur',}],
  password: [{required: true, message: '请输入密码', trigger: 'blur',}],
})
  const Login = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        login(form.value).then(res=>{
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
          localStorage.setItem('user',form.value.username)
          router.push('/');
        })

      }
    })
  }

const Register = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      register(form.value).then(res=>{
        ElMessage({
          message: '注册成功，请登录',
          type: 'success',
        })
        unref(formRef).resetFields();  //表单清空
      })
    }
  })
}
</script>
<style scoped>
.login{
  width: 50%;
  height: 50%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.login img{
  width: 300px;
  height: 300px;
}
:deep(.el-form){
  width: 55%;
}
</style>
