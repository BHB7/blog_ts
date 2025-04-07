import { http } from '@/apis/instances/instances'


export interface UserInfoType { name: string, code: string }
export const createUser = async ({ name, code }: UserInfoType) => {
  return await http.post('/user/create', {
    code,
    name
  })
}


export const getCode = async () => {
  return await http.get('/user/code')
}
