import type { ArrayResponse, ObjectResponse } from "@/type/response";
import { http } from "../instances/instances"

export interface AdminHomeTotal {
  name: string;
  total: number;
  zh: string;
  canAdd?: boolean;
  addPath?: string;
}
export const getAdminHomeTotalApi = async (): Promise<Array<AdminHomeTotal>> => {
  try {
    const response = await http.get('/admin')
    return response.data
  } catch (error) {
    throw new Error("获取总揽信息失败")

  }
}
