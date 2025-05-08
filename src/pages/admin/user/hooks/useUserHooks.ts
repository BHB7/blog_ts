import { getUserInfoApi, type UserVo } from "@/apis"
import { ref } from "vue"


const useUserHooks = () => {

  const userInfo = ref<UserVo>()

  const getUserInfo = () => {

  }

  return {

  }
}


export default useUserHooks
