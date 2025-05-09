<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { UserVo } from '@/apis'
import { } from '@/apis'
import useLayoutHooks from '@/pages/admin/layout/hooks/useLayoutHooks'
import { computed } from 'vue'
import Msg from '@/utils/showMsg'
import useUserHooks from './hooks/useUserHooks'
import usePostHooks from '../articles/hooks/usePostHooks'
const { userData, getUserInfo } = useLayoutHooks()
const { uploading } = usePostHooks()
const { putUserInfo } = useUserHooks()
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive<UserVo>({
  imgurl: '',
  gender: '0',
  motto: '',
  name: '',
  permissionLevel: '',
  system: '',
  githubId: '',
  ip: '',
  token: '',
  createdAt: new Date(),
  updatedAt: new Date(),
})

const rules = reactive<FormRules<UserVo>>({

  motto: [
    { required: true, message: '该字段为必填', trigger: 'blur' },
    { max: 30, message: '最多 30个字', trigger: 'blur' },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      const fileInput = inputFileRef.value;
      if (fileInput?.files?.[0]) {
        const file = fileInput.files?.[0]
        const url = await uploading(file)
        Object.assign(ruleForm, { ...ruleForm, imgurl: url })
      }
      console.log(ruleForm);

      putUserInfo(ruleForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


const getpermissionLevel = computed(() => {
  const map = {
    '200': { style: 'badge badge-outline badge-primary', txt: '超级管理员' },
    '020': { style: 'badge badge-outline badge-accent', txt: '管理员' },
    '002': { style: 'badge badge-outline badge-info', txt: '普通用户' },
  }
  return map[ruleForm.permissionLevel || '002']
})
onMounted(() => {
  getUserInfo().then(() => {
    if (userData.value) {
      Object.assign(ruleForm, userData.value)
    }
  })
})

const inputFileRef = ref<HTMLInputElement>()

const clickInput = () => {
  inputFileRef.value?.click()
}
const closeUrl = (e: Event) => {
  e.stopPropagation()
  if (inputFileRef.value) {
    inputFileRef.value.value = '' // 清空文件输入
  }
  // URL.revokeObjectURL(previewUrl.value)
}

// 处理文件选择事件
const formData = new FormData()
const handleFileChange = () => {
  const fileInput = inputFileRef.value;
  if (!fileInput) return;

  const file = fileInput.files?.[0]// 获取第一个文件
  if (!file) {
    Msg.error('未选择文件')
    return
  }

  // 检查文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    Msg.error('仅支持 JPEG、PNG、webp 和 GIF 格式的图片')
    fileInput.value = '' // 清空文件输入
    return
  }

  // 创建 Blob URL
  const fileUrl = URL.createObjectURL(file)
  Object.assign(ruleForm, { ...ruleForm, imgurl: fileUrl })

  formData.append('file', file)

  // 在组件卸载时释放 Blob URL
  // 可以在 onUnmounted 中调用 URL.revokeObjectURL(fileUrl)
}
</script>
<template>
  <section class="card w-full">
    <div class="h-60 w-full flex justify-center items-center bg-gray-400">
      <p class=" text-xs">双击头像更新头像</p>
    </div>
    <header class="flex  bg-base-100 h-40 relative">
      <div class="absolute left-8 top-[-40px] space-x-4  flex items-end">
        <input accept="image/jpeg, image/png, image/gif, image/webp" @change="handleFileChange" ref="inputFileRef"
          class="hidden" type="file" name="file" />
        <el-avatar @dblclick="clickInput" shape="square" :size="100" fit="cover" :src="ruleForm.imgurl" />
        <div class=" font-bold text-xl text-primary">
          <p>{{ ruleForm.name || '加载中...' }}</p>
          <p class="text-xs">{{ ruleForm.motto || '该用户很懒，没有签名哦~' }}</p>
        </div>
      </div>
    </header>

    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto">
      <el-form-item label="性别" prop="region">
        <el-select v-model="ruleForm.gender" placeholder="选择性别">
          <el-option label="男" value="0" />
          <el-option label="女" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="当前权限">
        <div :class="[getpermissionLevel.style]">{{
          getpermissionLevel.txt }}</div>
      </el-form-item>
      <el-form-item label="个性签名" prop="desc">
        <el-input v-model="ruleForm.motto" type="textarea" />
      </el-form-item>
      <div class="flex justify-center w-full">
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            保存
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">清除</el-button>
        </el-form-item>
      </div>
    </el-form>
  </section>
</template>
