import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import type { ResultVO, UserStatus } from '@/datasource/datatype'
import { useMentorSelectionStatus } from '@/stores'
import * as RoleType from '@/datasource/roleType'
//使用mock模拟后端数据，方便前端同步开发，非常方便
const mock = new MockAdapter(axios)
mock.onGet('/^http/').passThrough()

const resulVO: ResultVO = {
  code: 200,
  data: {}
}
mock.onPost('login').reply((c) => {
  const data = c.data
  const { number, password } = JSON.parse(data)
  const STstsus = useMentorSelectionStatus()
  const sL = STstsus.getStuTeaSatus().studentsR.value.find((student) => student.number == number)
  const tL = STstsus.getStuTeaSatus().teachersR.value.find((teacher) => teacher.number == number)
  if (sL != null) {
    if (sL.password == password) {
      resulVO.code = 200
      resulVO.data = {
        id: sL.id,
        role: sL.role,
        number: sL.number,
        password: sL.password
      } as UserStatus
      resulVO.message = ''
      return [
        200,
        resulVO,
        {
          role: RoleType.STUDENT,
          token:
            '744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6',
          uid: sL.id
        }
      ]
    } else {
      resulVO.code = 401
      resulVO.message = '密码错误'
      return [200, resulVO]
    }
  } else if (tL != null) {
    if (tL.password == password) {
      resulVO.code = 200
      resulVO.data = {
        id: tL.id,
        role: tL.role,
        number: tL.number,
        password: tL.password
      }
      resulVO.message = ''
      return [
        200,
        resulVO,
        {
          role: RoleType.TEACHER,
          token:
            '744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6',
          uid: tL.id
        }
      ]
    } else {
      resulVO.code = 401
      resulVO.message = '密码错误'
      return [200, resulVO]
    }
  } else {
    resulVO.code = 401
    resulVO.message = '用户名不存在'
    return [200, resulVO]
  }
})
