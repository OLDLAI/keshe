<script setup lang="ts">
import { useLoginStore, useMentorSelectionStatus } from '@/stores'
import { useRouter } from 'vue-router'

const stuTeaStatus = useMentorSelectionStatus()
stuTeaStatus.getStuTeaSatus() 
const sid = useLoginStore().getLoginStatus().id
const router = useRouter()

const JumpPageF = (uid: number) => {
  const pathUid = '/teacherMessage/tid/' + uid
  router.push(pathUid)
}
</script>
<template>
  <div>
    <table>
      <tr>
        <td>姓名</td>
        <td>导师最大可选人数</td>
        <td>已选人数</td>
        <td>选择导师</td>
      </tr>
      <tr v-for="(t, index) in stuTeaStatus.teachersR" :key="index">
        <td>{{ t.name }}</td>
        <td>{{ t.maxStudentNumber }}</td>
        <td>{{ t.studentNumber }}</td>
        <td v-if="t.studentNumber < t.maxStudentNumber">
          <button @click="stuTeaStatus.mentorSelect(sid ?? 0, t.id)">选择</button>
        </td>
        <td v-if="t.studentNumber == t.maxStudentNumber">
          <button style="background-color: pink">已选</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>

table {
  width: 70%;
  height: 600px;
  border-collapse: collapse;
  margin-top: 20px;
}

.custom-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

.custom-table tr:nth-child(odd) {
  background-color: #f2f2f2;
}

.custom-table tr:hover {
  background-color: #e0e0e0;
}

.button-primary {
  padding: 5px 10px;
  border: none;
  background-color: #f26d8f; /* 粉色 */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-primary:hover {
  background-color: #e83e6b; /* 深粉色 */
}

div h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}
</style>



