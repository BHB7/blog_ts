import { defineStore } from "pinia";
import { ref } from "vue";

export const useRouteStore = defineStore('route', () => {
  const isRouterLoading = ref<Boolean>(true)


  const getRouterLoadingSt = (): Boolean => {
    return isRouterLoading.value
  }

  const setRouterLoadingSt = (newSt: Boolean): void => {
    isRouterLoading.value = newSt
  }


  return {
    getRouterLoadingSt,
    setRouterLoadingSt
  }
})
