<script setup lang="ts">
import { BackgroundRender, type BackgroundRenderProps } from "@applemusic-like-lyrics/vue";



const props = withDefaults(defineProps<BackgroundRenderProps>(), {
  albumIsVideo: false,
  album: 'https://i.postimg.cc/15QJ8kd7/QQ20241108-161005.png',
  fps: 60,
  lowFreqVolume: 1
})
console.log(props);

</script>

<template>
  <div>
    <slot></slot>
    <BackgroundRender :playing="props.playing" :fps="props.fps" :low-freq-volume="props.lowFreqVolume"
      :album="props.album" :album-is-video="props.albumIsVideo">


    </BackgroundRender>
  </div>
</template>
