export interface ResVoBase<T> {
  message: string
  code: number
  token?: string
  data: Array<T> | null
}

export * from '@/apis/modules/user.ts'
export * from '@/apis/modules/article.ts'
