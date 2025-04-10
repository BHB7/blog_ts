import { ref } from "vue"

export const useLoadingBar = () => {
  const timer = ref<number>(0)
  const speed = ref<number>(0)
  const startSpeed = () => {
    const dom = document.querySelector<HTMLInputElement>('#bar_id_key')
    if (!dom) return
    timer.value = requestAnimationFrame(function fn() {
      if (speed.value < 90) {
        speed.value += 1
        dom.value = `${speed.value}`
        timer.value = requestAnimationFrame(fn)
      } else {
        speed.value = 1
        cancelAnimationFrame(timer.value)

      }

    })
  }

  const endSpeed = () => {
    const dom = document.querySelector<HTMLInputElement>('#bar_id_key')
    if (!dom) return
    setTimeout(() => {
      timer.value = requestAnimationFrame(() => {
        speed.value = 100
        dom.value = `${speed.value}`
        dom.remove()
      })
    }, 1000)
  }

  return {
    startSpeed,
    endSpeed
  }
}
