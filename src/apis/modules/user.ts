import { http } from '@/apis/instances/instances'


export interface UserInfoTypeDTO { name: string, code: string }


export const createUser = async ({ name, code }: UserInfoTypeDTO) => {
  return await http.post('/user/create', {
    code,
    name
  })
}


export const getCode = async () => {
  return await http.get('/user/code')
}
