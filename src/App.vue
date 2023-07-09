<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-container>
      <el-header
        style="font-size: 12px; display: flex; justify-content: space-between"
        v-if="Role == RoleType.STUDENT || Role == RoleType.TEACHER"
      >
        <div class="toolbar">
          <div class="toolbar">

            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px color: black;">
                <img style="width: 50px; height: 50px" src="./assets/liyu.png">
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="loginStatus.logOffF">退出登录</el-dropdown-item>
                  <el-dropdown-item @click="JumpF">修改密码</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <RouterView />
        </el-scrollbar>
      </el-main>
    </el-container>

    <!-- 侧边栏 -->
    <el-aside width="300px" v-if="Role == RoleType.STUDENT || Role == RoleType.TEACHER">
      <sSideBar v-if="Role == RoleType.STUDENT"></sSideBar>
      <tSideBar v-if="Role == RoleType.TEACHER"></tSideBar>
    </el-aside>
  </el-container>
</template>

<script lang="ts" setup>
//引入ElementPlus组件
import { Menu as IconMenu, Message, Setting, UserFilled, Grid } from '@element-plus/icons-vue'

import { defineAsyncComponent, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAlertStore, useLoginStore, useMentorSelectionStatus } from './stores'
import * as RoleType from '@/datasource/roleType'
import { storeToRefs } from 'pinia'
import type { Student, Teacher } from './datasource/datatype'

const sSideBar = defineAsyncComponent(() => import('@/views/SideBar/studentSidebar.vue'))
//获取身份
const loginStatus = useLoginStore()
const Role = ref(loginStatus.getRole())

//动态获取当前用户角色
const userT = ref<Teacher>({
  role: '',
  id: 0,
  name: '',
  number: '',
  password: '',
  maxStudentNumber: 0,
  studentNumber: 0,
  students: []
})
const userS = ref<Student>({
  role: '',
  id: 0,
  name: '',
  number: '',
  password: '',
  teacher: 0
})
//获取当前用户信息
const changeUser = () => {
  userS.value = useMentorSelectionStatus().studentMessageQuery(loginStatus.getLoginStatus().id ?? 0)
  if (userS.value.id == 0)
    userT.value = useMentorSelectionStatus().mentorMessageQuery(
      loginStatus.getLoginStatus().id ?? 0
    )
}
if (Role.value != null) changeUser() //当登录后每次刷新页面都执行-获取当前用户信息
watch(storeToRefs(loginStatus).Logined, () => {
  Role.value = loginStatus.getRole()
  changeUser() //每次登录或退出登录时都执行-获取当前用户信息
})
//-获取身份

//警告异常的模态框
const ModelBox = defineAsyncComponent(() => import('@/components/alertDemo.vue'))
const exceptionalStore = useAlertStore()
//-警告异常的模态框

//初始化账号
const hasExecuted = sessionStorage.getItem('Initialized')
if (!hasExecuted) {
  // 还未执行，执行特定代码

  const STsttus = useMentorSelectionStatus()
  STsttus.initStuTeaStatus()
  // 标记为已经执行过
  sessionStorage.setItem('Initialized', 'ture')
} //-初始化账号

//路由对象
const router = useRouter()
const JumpF = () => {
  if (Role.value == RoleType.STUDENT) {
    router.push('/changeStuPassword')
  }
  if (Role.value == RoleType.TEACHER) {
    router.push('/changeTeaPassword')
  }
}
//-路由对象
</script>

<style scoped>
.layout-container-demo{
  background-image: url('./assets/liyu.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: white;
  border-radius: 15px;
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  border: 1px solid white;
  background-color: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  background-color: white;
  padding: 0;
}
.layout-container-demo .toolbar {
  color: black;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.layout-container-demo .el-footer {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  right: 20px;
  background: #05bea2;
  height: 2.5em;
  border-radius: 10px;
  color: black;
}
</style>
<style>
body {
  margin: 0;
  background-color: #ececec;
}
</style>

