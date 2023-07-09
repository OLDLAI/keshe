import type { Student, Teacher } from './datatype'
import * as RoleType from '@/datasource/roleType'
//初始学生列表
export function studentList() {
  const students: Student[] = [
    {
      role: RoleType.STUDENT,
      id: 2020001,
      name: 'lst',
      number: '2020212001',
      password: '2020212001',
      teacher: 204601
    },
    {
      role: RoleType.STUDENT,
      id: 2020002,
      name: 'jx',
      number: '2020212002',
      password: '2020212002',
      teacher: 204601
    },
    {
      role: RoleType.STUDENT,
      id: 2020003,
      name: 'hxy',
      number: '2020212003',
      password: '2020212003',
      teacher: 0
    },

  ]
  return students
}
//初始老师列表
export function teacherList() {
  const teachers: Teacher[] = [
    {
      role: RoleType.TEACHER,
      id: 204601,
      name: '老师一号',
      number: '2046204601',
      password: '2046204601',
      maxStudentNumber: 2,
      studentNumber: 2,
      students: [2020001, 2020002]
    },
    {
      role: RoleType.TEACHER,
      id: 204602,
      name: '老师二号',
      number: '2046204602',
      password: '2046204602',
      maxStudentNumber: 2,
      studentNumber: 0,
      students: []
    },
    {
      role: RoleType.TEACHER,
      id: 204603,
      name: '老师三号',
      number: '2046204603',
      password: '2046204603',
      maxStudentNumber: 2,
      studentNumber: 0,
      students: []
    },
    {
      role: RoleType.TEACHER,
      id: 204604,
      name: '老师四号',
      number: '2046204604',
      password: '2046204604',
      maxStudentNumber: 2,
      studentNumber: 0,
      students: []
    },
    {
      role: RoleType.TEACHER,
      id: 204605,
      name: '老师五号',
      number: '2046204605',
      password: '2046204605',
      maxStudentNumber: 2,
      studentNumber: 0,
      students: []
    },
    {
      role: RoleType.TEACHER,
      id: 204606,
      name: '老师六号',
      number: '2046204606',
      password: '2046204606',
      maxStudentNumber: 2,
      studentNumber: 0,
      students: []
    }
  ]
  return teachers
}
