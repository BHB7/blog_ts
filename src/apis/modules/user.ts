import { http } from '@/apis/instances/instances'
import type { ArrayResponse, ObjectResponse } from '@/type/response'


export interface LoginType {
  name: string
  password?: string
}
export type Data = {
  token: string,
  user: any
}
export interface ResVo<T> {
  message: string
  code: number | string
  data: ObjectResponse<T> | ArrayResponse<T>
}
export const loginApi = async (name: string, password: string): Promise<ResVo<{}>> => {
  return http.post('user/login', {
    name,
    password
  })
}


export const sendCodeApi = (email: string): Promise<ResVo<{}>> => {
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
export const regApi = (info: regType): Promise<ResVo<regType>> => {
  return http.post('user/signup', {
    ...info
  })
}

export interface UserVo {
  imgurl: string;
  gender: '0' | '1';
  motto?: string;
  name: string;
  system: string;
  permissionLevel: '200' | '020' | '002';
  githubId?: string;
  ip: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const getUserInfoByIdApi = async (uid: string | number): Promise<UserVo> => {
  try {
    const response = await http.get(`user/info/${uid}`)
    return response.data
  } catch (error) {
    throw new Error("获取用户信息失败")
  }
}
export const getUserInfoApi = async (): Promise<UserVo> => {
  try {
    const response = await http.get('user')
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


