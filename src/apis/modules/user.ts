import { http } from '@/apis/instances/instances'


export interface LoginType {
  name: string
  password: string
}
export type Data = {
  token: string
}
export interface LoginTypeVo {
  message: string
  code: number | string
  token: string
  data: Data
}
export const loginApi = async (name: string, password: string): Promise<LoginTypeVo> => {
  return http.post('user/login', {
    name,
    password
  })

}


export const sendCodeApi = (email: string) => {
  return http.get('user/sendCode', {
    params: {
      email
    }
  })
}

export interface regType {
  name: string
  password: string
  code: string
  email: string
}
export const regApi = (info: regType) => {
  return http.post('user/signup', {
    ...info
  })
}
