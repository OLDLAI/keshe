<script setup lang="ts">
import { useLoginStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import * as RoleType from '@/datasource/roleType'
import router from '@/router'

const loginStatus = useLoginStore()
const Role = ref(loginStatus.getRole())
watch(
  storeToRefs(loginStatus).Logined,
  () => {
    Role.value = loginStatus.getRole()
    if (!(Role.value == RoleType.STUDENT || Role.value == RoleType.TEACHER)) {
      alert('请先登录')
      router.push('/login')
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="welcome-container">
    <p>点击头像实现登录，改密码功能</p>
    <p>也实现了选择老师，退订老师功能</p>
  </div>
</template>

<style scoped>
.welcome-container {
  text-align: center;
  padding: 20px;
}

.welcome-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.welcome-divider {
  width: 100%;
  border: none;
  border-top: 1px solid #ddd;
  margin-bottom: 20px;
}
</style>
