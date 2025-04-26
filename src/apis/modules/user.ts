import { http } from '@/apis/instances/instances'


export interface LoginType {
  name: string
  password: string
}
export type Data = {
  token: string,
  user: any
}
export interface ResVo extends LoginType {
  message: string
  code: number | string
  token?: string
  data: Data | null
}
export const loginApi = async (name: string, password: string): Promise<ResVo> => {
  return http.post('user/login', {
    name,
    password
  })

}


export const sendCodeApi = (email: string): Promise<ResVo> => {
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
export const regApi = (info: regType): Promise<ResVo> => {
  return http.post('user/signup', {
    ...info
  })
}
