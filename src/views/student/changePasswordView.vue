<script setup lang="ts">
import { useLoginStore, useMentorSelectionStatus } from '@/stores'
import { ref } from 'vue'
const uid = parseInt(sessionStorage.getItem('uid') ?? '0')
const student = useMentorSelectionStatus()
  .getStuTeaSatus()
  .studentsR.value.find((s) => s.id == uid) ?? {
  role: '',
  id: 0,
  name: '',
  number: '',
  password: '',
  teacher: 0
  }
const oldPassword = ref('')
const newPassword = ref('')
const rNewPassword = ref('')
const submitF = () => {
  alert('密码修改提交')
  if (oldPassword.value == student.password) {
    if (newPassword.value == rNewPassword.value) {
      student.password = newPassword.value
      useMentorSelectionStatus().updateStuTeaStatus()
      alert('密码修改成功，请重新登录')
      useLoginStore().logOffF()
    } else alert('两次新密码输入不一致')
  } else alert('原密码错误')
}
</script>
<template>
  <div class="password-change">
    <label for="account">账号：</label>
    <input id="account" type="text" v-model="student.number" disabled /><br />

    <label for="old-password">原密码：</label>
    <input id="old-password" type="password" v-model="oldPassword" /><br />

    <label for="new-password">新密码：</label>
    <input id="new-password" type="password" v-model="newPassword" /><br />

    <label for="confirm-password">确认密码：</label>
    <input id="confirm-password" type="password" v-model="rNewPassword" /><br />

    <button @click="submitF">提交</button>
  </div>
</template>

<style scoped>
.password-change {
  margin: 20px;
}

label {
  display: inline-block;
  width: 100px;
  margin-bottom: 10px;
  font-weight: bold;
}

input[type='text'],
input[type='password'] {
  padding: 6px;
  font-size: 14px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}
</style>

