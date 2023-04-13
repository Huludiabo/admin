<template>
  <div class="top flex between" >
    <img src="../../assets/loginLogo.png">
    <div class="flex yCenter">
      <span :class="types =='home' ? 'active' : 'noActive' " @click="goPages('home')">首页</span>
      <span :class="types =='update' ? 'active' : 'noActive' " @click="goPages('update')" class="m-l-70">变更头像</span>
    </div>
    <div class="flex yCenter">
      <img class="headerLogo" src="../../assets/loginLogo.png">
      <el-button text type="primary" @click="logout">退出登录</el-button>
    </div>
  </div>
  <div style="padding: 20px 200px">
    <router-view></router-view>
  </div>
</template>
<script setup>
import { useRouter,useRoute } from "vue-router";
import {onMounted, ref} from "vue";
const router = useRouter();
const route = useRoute();
const types = ref('home');
onMounted(()=>{
  types.value = route.name;
})
const goPages = (type)=>{
  types.value = type;
  router.push(`/${type}`);
}
const logout = ()=>{

  router.replace('/login');
  localStorage.clear();
  history.pushState(null, null, document.URL);

  window.addEventListener("popstate",function(e) {

    history.pushState(null, null, document.URL);

  }, false);
}
</script>
<style scoped>
.top{
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #ddd;

}
.active{
  color: rgba(156, 196, 168);
}
.noActive{
  color: rgba(84, 138, 208);

}
.headerLogo{
  border: 3px solid #409EFF;
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
