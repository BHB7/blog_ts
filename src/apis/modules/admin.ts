import { http } from "../instances/instances"


export interface AdminHomeTotalVo {
  code: number;
  message: string;
  data: Array<{ name: string; total: number; zh: string, add: boolean | { path: string } }>
}

export const getAdminHomeTotal = (): Promise<AdminHomeTotalVo> => {
  return http.get('/home')
}
