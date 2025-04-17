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
export const login = async (name: string, password: string): Promise<LoginTypeVo> => {
  return await http.post('user/login', {
    name,
    password
  })

}
