import { http } from '@/apis/instances/instances'


export interface LoginType {
  name: string,
  password: string
}


export const login = async (name: string, password: string) => {
  return await http.post('user/login', {
    name,
    password
  })

}
