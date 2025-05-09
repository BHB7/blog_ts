import { putUserInfoApi, type UserVo } from "@/apis"
import Msg from "@/utils/showMsg"
import { ref } from "vue"


const useUserHooks = () => {

  const userInfo = ref<UserVo>()

  const putUserInfo = async (userInfo: UserVo) => {
    const { imgurl, gender, motto, name, permissionLevel } = userInfo
    try {
      const response = await putUserInfoApi({ imgurl, gender, motto, name, permissionLevel })
      Msg.success('更新成功')
    } catch (error) {
      Msg.success('更新失败')
    }
  }

  return {
    putUserInfo
  }
}


export default useUserHooks
