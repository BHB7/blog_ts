<script setup lang="ts">
import { LyricPlayer, type LyricPlayerProps } from "@applemusic-like-lyrics/vue";
// import { type LyricLine } from '@applemusic-like-lyrics/core'


const props = withDefaults(defineProps<LyricPlayerProps>(), {

})
</script>
<template>
  <LyricPlayer :lyric-lines="props.lyricLines" :disabled="true" :enable-blur="true" :current-time="props.currentTime">
  </LyricPlayer>
</template>
