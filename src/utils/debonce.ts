type Fn = (...args: unknown[]) => unknown


/**
 * 函数防抖
 * @param fn 回调
 * @param duration 持续时间
 * @returns Function
 */
function debounce(fn: Fn, duration: number) {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (this: unknown, ...args: unknown[]) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, duration)
  }
}

export default debounce
