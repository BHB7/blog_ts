<script setup lang="ts">
export interface List {
  url: string;
  desc: string;
}
interface Props {
  top: boolean;
  list: List[];
}
withDefaults(defineProps<Props>(), {
  top: true,
  list: () => [

  ]
})


const emit = defineEmits(['addEmoji'])

const addEmoji = (emoji: List) => {
  emit('addEmoji', emoji)
}
</script>
<template>
  <section :class="{ '-top-30': top }" class="card z-50 rounded-xl card-border absolute bg-blur w-70  bg-base-300/70">
    <div class="card-body p-2">
      <el-scrollbar height="100px">
        <div class="flex flex-wrap w-full space-y-4 space-x-4">
          <button :title="emoji.desc" v-for="(emoji, index) in list" :key="index"
            class="btn btn-md btn-circle btn-outline">
            <img @click="addEmoji(emoji)" :src="emoji.url">
          </button>
        </div>
      </el-scrollbar>
    </div>
  </section>
</template>
