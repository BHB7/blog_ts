abstract class Even {
  public evens: Array<{ key: string; callbacks: Function[] }>;

  constructor(public name: string) {
    this.evens = []; // 初始化为空数组
  }

  // 监听事件 | 添加事件
  abstract on(eventName: string, fn: Function): void;

  // 触发事件
  abstract emit(eventName: string, ...args: any[]): void;
}

class Music extends Even {
  constructor(name: string) {
    super(name); // 调用父类构造函数
  }

  // 监听事件 | 添加事件
  on(eventName: string, fn: Function): void {
    const event = this.evens.find((item) => item.key === eventName);

    if (event) {
      // 如果事件已存在，将回调函数添加到 callbacks 数组中
      event.callbacks.push(fn);
    } else {
      // 如果事件不存在，创建一个新的事件对象
      this.evens.push({ key: eventName, callbacks: [fn] });
    }
  }

  // 触发事件
  emit(eventName: string, ...args: any[]): void {
    const event = this.evens.find((item) => item.key === eventName);

    if (event) {
      // 遍历并执行所有回调函数
      event.callbacks.forEach((callback) => callback(...args));
    } else {
      console.warn(`事件 "${eventName}" 未找到`);
    }
  }
}

export const music = new Music('music');
