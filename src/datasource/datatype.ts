export interface Student {
  id: number
  role: string
  name: string
  number: string
  password: string
  teacher: number
}

export interface Teacher {
  id: number
  role: string
  name: string
  number: string
  password: string
  studentNumber: number
  maxStudentNumber: number
  students: number[]
}
export interface UserStatus {
  id?: number
  role?: string
  number?: string
  password?: string
}
export interface ResultVO {
  code: number
  message?: string
  data?: any
}
