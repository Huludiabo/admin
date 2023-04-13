<template>
  <div class="flex m-t-50">
    <img src="../../assets/loginLogo.png" />
    <div class="flex column" style="margin-left: 200px">
      <p>用户名：{{name}}</p>
      <el-button @click="openImg" size="large" type="primary" round class="m-t-50">头像信息</el-button>
    </div>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="头像信息"
      width="40%"
  >
    <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        size="large">
      <el-form-item label="用户名" prop="username">
        <el-input size="large" v-model="form.username" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-upload
            v-model:file-list="fileList"
            accept="image/*"
            class="upload-demo"
            :limit="1"
            :auto-upload="false"
            :on-change="handleChange"
        >
          <el-button type="primary">选择文件</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit(ruleFormRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import {reactive, ref,unref} from "vue";
import { ElMessage } from 'element-plus';
import {upload} from '@api/api.js';
const ruleFormRef = ref();
const name = ref(localStorage.getItem('user'));
const form = ref({
  username:''
});
const dialogVisible = ref(false);
const fileList = ref([]);
const rules = reactive({
  username: [{required: true, message: '请输入用户名', trigger: 'blur',}],
})

const submit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if(form.value.username !== localStorage.getItem('user')){
        ElMessage({
          message: '输入的用户名不一致',
          type: 'error',
        })
        return
      }
      if(fileList.value.length === 0){
        ElMessage({
          message: '请上传头像',
          type: 'error',
        })
        return
      }
      const formData = new FormData();
      formData.append('image', fileList.value[0]);
      upload(formData).then(res=>{
        ElMessage({
          message: '保存成功',
          type: 'success',
        })
        unref(ruleFormRef).resetFields();  //表单清空
        dialogVisible.value = false;
      })
    }
  })
}
const openImg = ()=>{
  dialogVisible.value = true;
}
const handleChange = (file)=>{
  file.raw.originalname = 'http://localhost:3000/' + file.name;
  file.raw.filename = file.name;
  fileList.value = [file.raw];
}
</script>
<style scoped>
img{
  width: 200px;
  height: 200px;
}
p{
  color: rgba(84, 138, 208);
}
</style>
