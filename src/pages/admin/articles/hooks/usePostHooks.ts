import { uploadImg } from '@/apis/modules/upload'
import Msg from '@/utils/showMsg'
import { ref } from 'vue'


const usePostHooks = () => {
  const resurl = ref()
  const uploading = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const formData = new FormData()
      formData.append('file', file)
      uploadImg(formData)
        .then(res => {
          if (res.code === 200) {
            Msg.success(res.message)
            //  设置上传完成的URL
            resurl.value = res.data.url
            resolve(res.data.url) // 返回图片的 URL
          } else {
            reject(new Error(res.message)) // 错误时 reject
          }
        })
        .catch(err => {
          reject(err)// 捕获异常并 reject
        })
    })
  }


  return {
    uploading,
    resurl
  }
}



export default usePostHooks
