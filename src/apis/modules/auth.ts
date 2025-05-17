import type { ArrayResponse, ObjectResponse } from "@/type/response";
import { http } from "../instances/instances"
import type { UserVo } from "./user";


export const setAuthCodeApi = async (code: string): Promise<UserVo> => {
  try {
    const response = await http.get('github/callback', {
      params: {
        code
      }
    })
    return response.data
  } catch (error) {
    throw new Error("设置code失败")

  }
}
