export interface ResVoBase<T> {
  message: string
  code: number
  token?: string
  data: Array<T> | null
}

export * from '@/apis/modules/user.ts'
export * from '@/apis/modules/article.ts'
export * from '@/apis/modules/tag'
export * from '@/apis/modules/admin'
export * from '@/apis/modules/auth'
