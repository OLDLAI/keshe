<script setup lang="ts">
import { Menu as IconMenu, Setting, Avatar, Aim, Notebook, Edit } from '@element-plus/icons-vue'

const uid = sessionStorage.getItem('uid') ?? 0
const pathUid = '/studentMessage/sid/' + uid 
</script>
<template>
  <el-scrollbar style="background-color: white">
    <el-menu style="border: 0">
      <el-menu-item index="1" style="background-color: white; margin-top: 2%; color: white">
       
      </el-menu-item>
      <el-sub-menu index="2" >
        <template #title>

          选择您的导师！
        </template>

        <el-menu-item-group>
          <RouterLink to="/montorSelect" style="text-decoration: none">
            <el-menu-item index="2-1">
              导师选择
            </el-menu-item>
          </RouterLink>
        </el-menu-item-group>

        <el-menu-item-group>
          <RouterLink to="/montorSelected" style="text-decoration: none">
            <el-menu-item index="2-2">
              我的导师
            </el-menu-item>
          </RouterLink>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>
<style scoped></style>
