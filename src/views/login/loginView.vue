<script setup lang="ts">
import { useLoginStore } from '@/stores'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const data = ref<{ number: string; password: string }>({ number: '', password: '' })
const loginStore = useLoginStore()
const router = useRouter()
const JumpPageF = () => {
  router.push('/register')
}
import { Menu as Lock, User, Unlock } from '@element-plus/icons-vue'
</script>
<template>
  <div class="main">
    <div class="container">
    <div>
      <p>学生：2020212001 2020212001</p>
    </div>
      <h2 class="title">用户登录</h2>
      <form class="form">
        <div class="group">
          <label for="number"></label>
          <el-input
            class="inp"
            type="text"
            id="number"
            v-model="data.number"
            size="large"
            placeholder="账号"
          />
        </div>

        <div class="group">
          <label for="password"></label>
          <el-input
            class="inp"
            type="password"
            id="password"
            v-model="data.password"
            size="large"
            placeholder="密码"
          />
        </div>

        <div class="actions">
          <button class="login" @click="loginStore.loginF(data)">登录</button>
        </div>
      </form>
      
    </div>
    
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center; 
  align-items: end; 
  height: 100vh;
  background-image: url('../../assets/pikaqiu.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.container {
  height: 300px;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 20vh;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: #fff;
}

.inp {
  padding: 10px;
  font-size: 16px;
  border: 1px solid transparent;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.login{
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}


.register {
  background-color: #6c757d;
  color: #fff;
}

</style>
