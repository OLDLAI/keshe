import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ResultVO, Teacher, Student, UserStatus } from '@/datasource/datatype'
import axios from '@/axios'
import { studentList, teacherList } from '@/datasource/datafunc'
import router from '@/router'

export const useMentorSelectionStatus = defineStore('MSS', () => {

  const studentsR = ref<Student[]>([])
  const teachersR = ref<Teacher[]>([])

  const initStuTeaStatus = () => {
    //1-登录初始化sessionStorage数据
    sessionStorage.setItem('stuendtsStatus', JSON.stringify(studentList()))
    sessionStorage.setItem('teachersStatus', JSON.stringify(teacherList()))
  }

  const getStuTeaSatus = () => {
    //2-获取当前状态数据
    studentsR.value = JSON.parse(sessionStorage.getItem('stuendtsStatus') ?? ' ') //获取学生数据
    teachersR.value = JSON.parse(sessionStorage.getItem('teachersStatus') ?? ' ') //获取老师数据
    return { studentsR, teachersR }
  }

  const updateStuTeaStatus = () => {
    //3-更新模拟数据库
    sessionStorage.setItem('stuendtsStatus', JSON.stringify(studentsR.value))
    sessionStorage.setItem('teachersStatus', JSON.stringify(teachersR.value))
  }
  const mentorSelect = (sid: number, tid: number) => {
    if (!confirm('您确定选择该导师吗，成功后该导师将成为您的指导老师？')) return
    getStuTeaSatus()
    const student = studentsR.value.find((student) => student.id === sid)
    const teacher = teachersR.value.find((teacher) => teacher.id === tid)
    //判断条件
    if (student != null) {
      //1-存在该学生
      if (student.teacher == 0) {
        //2-学生未选导师
        if (teacher != null) {
          //3-存在该导师
          if (teacher.studentNumber < teacher.maxStudentNumber) {
            //4-选该导师的学生人数还未上限
            student.teacher = tid
            teacher.students.push(sid) //选课成功
            teacher.studentNumber++

            updateStuTeaStatus() //更新数据库
          } else alert('选择该导师学生人数已满')
        } else alert('该导师不存在！')
      } else
        alert(
          '您已选导师:(' +
            teachersR.value.find((teacher) => teacher.id == student.teacher)?.name +
            ') 如需选该导师请先退选'
        )
    } else alert('该学生不存在！')
  }
  //2-退导师
  const mentorDeselect = (sid: number, tid: number) => {
    if (!confirm('您确定退选该导师吗，成功后该导师不再是您的指导老师？')) return
    getStuTeaSatus()
    const student = studentsR.value.find((student) => student.id === sid)
    const teacher = teachersR.value.find((teacher) => teacher.id === tid)
    if (student != null && teacher != null) {
      if (student.teacher != 0) {
        if (student.teacher == teacher.id) {
          student.teacher = 0
          const index = teacher.students.indexOf(student.id)
          teacher.students.splice(index, 1)
          teacher.studentNumber--
          alert('退选的导师为：' + teacher.name)
          updateStuTeaStatus() //更新数据库
        } else alert('非法操作')
      } else alert('您还没有选导师哦')
    } else alert('该同学或该导师不存在')
  }
  //3-查询导师详细信息
  const mentorMessageQuery = (tid: number) => {
    getStuTeaSatus()
    const teacher = teachersR.value.find((teacher) => teacher.id === tid)
    if (teacher != null) return teacher
    else
      return {
        role: '',
        id: 0,
        name: '',
        number: '',
        password: '',
        maxStudentNumber: 0,
        studentNumber: 0,
        students: []
      }
  }

  //=================================================================================================
  //业务逻辑-导师端
  //1-查看全部学生
  //视图层解决
  //2-查看已选本导师学生
  const studentSelectedByMentor = (tid: number) => {
    getStuTeaSatus()
    const students: number[] = []
    studentsR.value.forEach((s) => {
      if (s.teacher == tid) {
        students.push(s.id)
      }
    })

    console.log(students)

    return students
  }
  //3-查看学生详细信息
  const studentMessageQuery = (sid: number) => {
    getStuTeaSatus()
    const student = studentsR.value.find((student) => student.id === sid)
    if (student != null) return student
    else
      return {
        role: '',
        id: 0,
        name: '',
        number: '',
        password: '',
        teacher: 0
      }
  }
  //4-导师主动添加学生
  const addStudentByMentor = (sid: number, tid: number) => {
    if (!confirm('您确定主动添加该学生吗，成功后他将成为您指导的学生？')) return
    getStuTeaSatus()
    const student = studentsR.value.find((student) => student.id === sid)
    const teacher = teachersR.value.find((teacher) => teacher.id === tid)
    if (student != null && teacher != null) {
      if (student.teacher == 0) {
        if (teacher.studentNumber < teacher.maxStudentNumber) {
          student.teacher = tid
          teacher.students.push(sid) //选课成功
          teacher.studentNumber++

          updateStuTeaStatus() //更新数据库
        } else alert('选您为导师的学生人数已达上限')
      } else if (student.teacher == teacher.id) alert('该同学已经选择了您')
      else alert('该学生已经选择导师')
    } else alert('该学生或该导师不存在')
  }
  //5-导师主动将删除学生
  const delStudentByMentor = (sid: number, tid: number) => {
    if (!confirm('您确定主动删除该学生吗，成功后该学生将不再是您指导的学生？')) return
    getStuTeaSatus()
    const student = studentsR.value.find((student) => student.id === sid)
    const teacher = teachersR.value.find((teacher) => teacher.id === tid)
    if (student != null && teacher != null) {
      if (student.teacher != 0) {
        if (student.teacher == teacher.id) {
          student.teacher = 0
          const index = teacher.students.indexOf(student.id)
          teacher.students.splice(index, 1)
          teacher.studentNumber--

          updateStuTeaStatus() //更新数据库
        } else alert('非法操作')
      } else alert('该同学未选择导师')
    } else alert('该同学或该导师不存在')
  }

  return {
    studentsR,
    teachersR,
    initStuTeaStatus,
    getStuTeaSatus,
    updateStuTeaStatus,
    mentorSelect,
    mentorDeselect,
    mentorMessageQuery,
    studentMessageQuery,
    addStudentByMentor,
    delStudentByMentor,
    studentSelectedByMentor
  }
})
//-选导师业务逻辑
//登录逻辑层
export const useLoginStore = defineStore('login', () => {
  // const loginStatus = ref<UserStatus>({})
  const Logined = ref(false)
  //登录
  const loginF = async (data: { number: string; password: string }) => {
    try {
      const resp = await axios.post<ResultVO>('login', data)
      setTimeout(function () {
        sessionStorage.setItem('token', resp.headers.token)
        sessionStorage.setItem('role', resp.headers.role)
        sessionStorage.setItem('uid', resp.headers.uid)
        sessionStorage.setItem('userStatus', JSON.stringify(resp.data.data))
        Logined.value = !Logined.value
        getLoginStatus()
        router.push('/welcome')
        // 这里是等待两秒后要执行的代码
      }, 100)
      setTimeout(function () {
        if (data.number == data.password) alert('检测到密码与账号相同，为了你的安全请及时修改密码')
        // 这里是等待两秒后要执行的代码
      }, 500)
    } catch (error) {
      // eslint默认禁止空执行体。加一段注释或关闭该检测
    }
  }
  //注销
  const logOffF = () => {
    sessionStorage.setItem('token', '')
    sessionStorage.setItem('role', '')
    sessionStorage.setItem('uid', '')
    sessionStorage.setItem('userStatus', '')
    Logined.value = !Logined.value
    getLoginStatus()
    alert('退出登录成功')
    router.push('/login')
  }
  const getRole = () => {
    const role = sessionStorage.getItem('role')
    return role
  }

  const getLoginStatus = () => {
    const loginStatus: UserStatus = sessionStorage.getItem('userStatus')
      ? JSON.parse(sessionStorage.getItem('userStatus') ?? '')
      : {}
    return loginStatus
  }

  return {
    logOffF,
    Logined,
    loginF,
    getLoginStatus,
    getRole
  }
})
//-登录逻辑层
//模态框
export const useAlertStore = defineStore('exceptional', () => {
  const exceptional = ref('')
  return { exceptional }
})
//-模态框
