import type { Directive } from 'vue';

// 创建 IntersectionObserver 实例
const ob = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const animation = map.get(entry.target);
        if (animation && typeof animation.play === 'function') {
          animation.play(); // 播放动画
          ob.unobserve(entry.target); // 停止观察该元素
        }
      }
    }
  },
  {
    threshold: 0.1, // 当元素 10% 进入视口时触发
  }
);

// 使用 WeakMap 存储动画对象
const map = new WeakMap();

const elUpmove: Directive = {
  mounted(el: HTMLElement, binding) {
    // 获取传递的值，如果没有传递值，则使用默认值 150
    const offset = binding.value || 150;

    // 创建动画
    const elAnimate = el.animate(
      [
        {
          transform: `translateY(${offset}px)`, // 确保 offset 是数字或字符串
          opacity: 0.5,
        },
        {
          transform: 'translateY(0)', // 动画结束时回到原点
          opacity: 1,
        },
      ],
      {
        duration: 500, // 动画持续时间
        easing: 'ease-in-out', // 动画缓动效果
        fill: 'forwards', // 动画结束后保持最终状态
      }
    );

    elAnimate.pause(); // 暂停动画
    ob.observe(el); // 开始观察元素
    map.set(el, elAnimate); // 将动画对象存储到 WeakMap 中
  },
  unmounted(el) {
    ob.unobserve(el); // 停止观察元素
    map.delete(el); // 从 WeakMap 中删除动画对象
  },
};

export default elUpmove;
