// src/types/response.ts




/**
 * 标准响应格式（包含数组 data）
 */
export interface ArrayResponse<T> {
  code: number | string;
  message: string;
  data: T[];
}

/**
 * 标准响应格式（包含单个对象 data）
 */
export interface ObjectResponse<T> {
  code: number | string;
  message: string;
  data: T;
}
