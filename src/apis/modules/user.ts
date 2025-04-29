import { http } from '@/apis/instances/instances'


export interface LoginType {
  name: string
  password?: string
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

export interface UserVo extends ResVo {
  imgurl?: string
}
export const getUserInfoApi = async (uid: string | number): Promise<UserVo> => {
  try {
    const response = await http.get(`user/info/${uid}`)
    return response.data
  } catch (error) {
    throw new Error("获取用户信息失败")
  }
}
export interface IpVo {
  province: string,
  country: string
}
export const getIpAddress = async (ip: string): Promise<IpVo> => {
  try {
    const response = await http.get(`/user/getIpInfo?ip=${ip}&type=json`)
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error("获取ip信息失败")
  }
}
