import { ref } from "vue"
import { getUserInfoApi } from '@/apis'
import { useUserInfoStore } from "@/store"
const userStor = useUserInfoStore()
const userData = await getUserInfoApi(userStor.userInfo.user.id)
userStor.setUserInfo(userData)
const useLayoutHook = () => {
  return {
    userData
  }
}



export default useLayoutHook
