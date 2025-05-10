import { getAdminInfoApi } from "@/apis"
import { useUserInfoStore } from "@/store"
import Msg from "@/utils/showMsg"
import { ref } from "vue"



const userStor = useUserInfoStore()
const useAdminHooks = () => {
  const userData = ref()
  const getAdminInfo = async () => {
    try {
      userData.value = await getAdminInfoApi()
      userStor.setUserInfo(userData.value)
    } catch (error) {
      Msg.error('获取用户信息失败')
      throw new Error("获取用户信息失败")
    }
  }


  return {
    getAdminInfo
  }
}


export default useAdminHooks

