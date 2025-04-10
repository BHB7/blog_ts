<script setup lang="ts">
import { ref, watch, onUnmounted, reactive } from 'vue';
import BgRender from '../bgRender.vue';
import LyricPlayer from '../lyricPlayer.vue';
import { parseQrc } from '@applemusic-like-lyrics/lyric';
import { type LyricLine } from '@applemusic-like-lyrics/lyric'

const state = reactive({
  audioUrl: "",
  albumUrl: "",
  albumIsVideo: false,
  currentTime: 0,
  lyricLines: [] as LyricLine[],
});
// 解析歌词
const lines = parseQrc(`
`);
console.log(lines);

// 音频相关
const audio = ref<HTMLAudioElement | null>(null);
const currentTime = ref(0);
const timer = ref<number | null>(null);

// 播放
const play = () => {
  if (!audio.value) {
    audio.value = new Audio('http://er.sycdn.kuwo.cn/4632ea69bbb91f04c230b3ccd2e0e1ca/67f5e010/resource/30106/trackmedia/M500001M4IUi4cVajh.mp3');
    audio.value.onerror = (error) => console.error('播放出错:', error);
  }
  audio.value.play();

  const onFrame = () => {
    if (audio.value && !audio.value.paused) {
      state.currentTime = (audio.value.currentTime * 1000) | 0;
      requestAnimationFrame(onFrame);
    }
  };
  requestAnimationFrame(onFrame);
};

// 暂停
const pause = () => {
  if (audio.value) {
    audio.value.pause();
  }
};

// 停止
const stop = () => {
  if (audio.value) {
    audio.value.pause();
    currentTime.value = 0;
    audio.value.currentTime = 0;
  }
};

// 监听当前时间变化
watch(state, (n) => {
  console.log(n, '播放');
}, {
  deep: true
});

// 清理定时器
onUnmounted(() => {
  if (timer.value) {
    cancelAnimationFrame(timer.value);
  }
});
</script>

<template>
  <div>
    <button class="btn btn-dash" @click="play">播放</button>
    <button class="btn btn-dash" @click="pause">暂停</button>
    <button class="btn btn-dash" @click="stop">停止</button>
    <div class="card text-sm relative h-96 overflow-hidden">
      <BgRender :playing="false" album="https://i.postimg.cc/gkBbYGzR/03.webp"
        class="absolute top-0 left-0 w-full h-full" />
      <LyricPlayer :lyric-lines="lines" :current-time="state.currentTime" class="absolute top-0 left-0 w-full h-full" />
    </div>
  </div>
</template>
