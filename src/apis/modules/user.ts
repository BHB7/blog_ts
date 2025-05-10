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

export const loginApi = async (name: string, password: string) => {
  try {
    const response = await http.post<ObjectResponse<Data>>('user/login', {
      name,
      password
    })
    return response
  } catch (error) {
    throw new Error("登录失败")
  }
}


export const sendCodeApi = (email: string): Promise<ObjectResponse<{}>> => {
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
export const regApi = (info: regType): Promise<ObjectResponse<regType>> => {
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
  permissionLevel: '200' | '020' | '002' | '';
  githubId?: string;
  ip: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserDto {
  imgurl: string;
  gender: '0' | '1';
  motto?: string;
  name: string;
  permissionLevel: '200' | '020' | '002' | '';
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
export const getAdminInfoApi = async (): Promise<UserVo> => {
  try {
    const response = await http.get('user/admin/info')
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
    return response.data
  } catch (error) {
    throw new Error("获取ip信息失败")
  }
}


export const putUserInfoApi = async (userInfo: UserDto) => {
  try {
    await http.put('/user/put', userInfo)
  } catch (error) {
    throw new Error("更新失败")

  }
}
