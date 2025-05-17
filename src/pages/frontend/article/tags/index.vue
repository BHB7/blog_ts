<script setup lang="ts">
import useAdminHomeHook from '@/pages/admin/home/hooks/useAdminHomeHook'

const { getTagList, tagList } = useAdminHomeHook()


getTagList()
</script>
<template>
  <section class=" h-lvh">
    <div class="card  bg-blur bg-base-300/70 card-border bg-base-100 shadow-xl ">
      <div class="card-body px-32 max-w-4xl ">
        <h1>标签</h1>
        <el-badge :value="12" class="item" v-for="(tag, index) in tagList">
          <button class="btn">{{ tag.name }}</button>
        </el-badge>
      </div>
    </div>
  </section>
</template>
