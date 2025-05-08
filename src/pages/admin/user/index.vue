<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { UserVo } from '@/apis'
import useLayoutHooks from '@/pages/admin/layout/hooks/useLayoutHooks'
import { computed } from 'vue'
const { userData, getUserInfo } = useLayoutHooks()
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive<UserVo>({
  imgurl: '',
  gender: '0',
  motto: '',
  name: '',
  system: '',
  permissionLevel: '',
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
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


const getpermissionLevel = (permissionLevel: string) => {
  return computed(() => {
    switch (permissionLevel) {
      case '200':
        return {
          style: 'badge  badge-outline badge-primary',
          txt: '超级管理员'
        }
      case '020':
        return {
          style: 'badge  badge-outline badge-accent',
          txt: '管理员'
        }
      default:
        return {
          style: 'badge  badge-outline badge-info',
          txt: '普通用户'
        }
    }
  })
}
onMounted(() => {
  getUserInfo().then(() => {
    if (userData.value) {
      ruleForm = userData.value
    }
  })
})
</script>
<template>
  <section class="card w-full">
    <div class="h-60 w-full bg-gray-400"></div>
    <header class="flex  bg-base-100 h-40 relative">
      <div class="absolute left-8 top-[-40px] space-x-4  flex items-end">

        <el-avatar shape="square" :size="100" fit="cover" :src="userData?.imgurl" />
        <div class=" font-bold text-xl text-primary">
          <p>{{ userData?.name }}</p>
          <p class="text-xs">{{ userData?.motto || '该用户很懒，没有签名哦~' }}</p>
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
        <div :class="[getpermissionLevel(ruleForm.permissionLevel).value.style]">{{
          getpermissionLevel(ruleForm.permissionLevel).value.txt }}</div>
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
