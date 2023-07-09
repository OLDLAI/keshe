<script setup lang="ts">
import type { Student, Teacher } from '@/datasource/datatype'
import { useLoginStore, useMentorSelectionStatus } from '@/stores'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from "element-plus";
const exist = ref(false)
const teacher = ref<Teacher>({
  role: '',
  id: 0,
  name: '',
  number: '',
  password: '',
  maxStudentNumber: 0,
  studentNumber: 0,
  students: []
})

const student: Student = useMentorSelectionStatus().studentMessageQuery(
  useLoginStore().getLoginStatus().id ?? 0
)
if (student.id != 0) {
  teacher.value = useMentorSelectionStatus().mentorMessageQuery(student.teacher ?? '0')
  if (teacher.value.id != 0) exist.value = true
}
const router = useRouter()
const JumpPageF = (uid: number) => {
  const pathUid = '/teacherMessage/tid/' + uid
  router.push(pathUid)
}
const stuTeaStatus = useMentorSelectionStatus()
stuTeaStatus.getStuTeaSatus() //更新状态
const sid = useLoginStore().getLoginStatus().id
const deselect = () => {
  stuTeaStatus.mentorDeselect(sid ?? 0, teacher.value.id)
  window.location.reload()
}
if (!exist.value) {
  ElMessageBox.alert('请先去选择导师吧！', '啊偶', {
    confirmButtonText: '确定',
  });
}
</script>

<template>
  <div>
    <h1 v-if="!exist">
      
    </h1>
    <table v-if="exist">
      <tr>
        <td>导师姓名</td>
        <td>退选</td>
      </tr>
      <tr>
        <td>{{ teacher.name }}</td>
        <td>
          <button @click="deselect">退选</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 70%;
  border-collapse: collapse;
  margin-top: 20px;
}

/* table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

table tr:nth-child(odd) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #e0e0e0;
}

button {
  padding: 5px 10px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

div h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
} */
</style>
