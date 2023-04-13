<template>
  <div class="flex between">
    <div class="left flex column yCenter">
      <img src="../../assets/homeBanner.png">
      <el-button size="large" type="warning" @click="openImg">
        指定账号图片
          <el-icon size="25px" class="el-icon--right"><CirclePlus /></el-icon>
      </el-button>
    </div>
    <div class="right flex column">
      <el-input
          v-model="name"
          :clearable="true"
          size="large"
          placeholder="搜索：请输入用户名"
          :prefix-icon="Search">
        <template #append>
          <el-button @click="search" :icon="Search" />
        </template>
      </el-input>
      <span class="userNum">用户数量：{{userNumber}}</span>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="80" />
        <el-table-column align="center" prop="username" label="用户名" />
        <el-table-column align="center" prop="password" label="密码" />
      </el-table>
    </div>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="指定账号图片"
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
      <el-form-item label="密码" prop="password">
        <el-input size="large" type="password" v-model="form.password" placeholder="密码" />
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
import { CirclePlus,Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import {upload,register,userCount,userData} from '@api/api.js';
import {onMounted, reactive, ref, unref} from "vue";
const ruleFormRef = ref();
const name = ref('');
const form = ref({});
const dialogVisible = ref(false);
const fileList = ref([]);
const tableData = ref([]);
const userNumber = ref(0);
const rules = reactive({
  username: [{required: true, message: '请输入用户名', trigger: 'blur',}],
  password: [{required: true, message: '请输入密码', trigger: 'blur',}],
})

const submit = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if(fileList.value.length === 0){
        ElMessage({
          message: '请上传头像',
          type: 'error',
        })
        return
      }
      register(form.value).then(res=>{
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

      })
    }
  })
}

const handleChange = (file)=>{
  file.raw.originalname = 'http://localhost:3000/' + file.name;
  file.raw.filename = file.name;
  fileList.value = [file.raw];
}

const search = ()=>{
  if(!name.value){
    return getList();
  };
  userData({
  username:name.value
  }).then(res=>{
    tableData.value = [res.data.user];
    userNumber.value = res.data.count;
  })
}
const getList = ()=>{
  userCount().then(res=>{
    tableData.value = res.data;
    userNumber.value = res.data.length;
  })
}
onMounted(()=>{
  getList();
})
const openImg = ()=>{
  dialogVisible.value = true;
}
</script>
<style scoped>
.userNum{
  font-size: 15px;
  color: #409EFF;
  padding: 10px 5px;
}
.right{
  width: 45%;
}
.left{
  width: 35%;
}
.left img{
  width: 450px;
  height: 300px;
}
.left :deep(.el-button){
  width: 470px;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}
.left :deep(.el-button>span){
  display: contents;
}
:deep(.el-dialog){
  border-radius: 30px !important;
}
</style>
