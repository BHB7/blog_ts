abstract class Even {
  public evens: Array<{ key: string; callbacks: ((...args: unknown[]) => void)[] }>;

  constructor(public name: string) {
    this.evens = []; // 初始化为空数组
  }

  abstract on<T extends unknown[]>(eventName: string, fn: (...args: T) => void): void;

  abstract emit<T extends unknown[]>(eventName: string, ...args: T): void;
}

class BaseEvent extends Even {
  constructor(name: string) {
    super(name); // 调用父类构造函数
  }

  on<T extends unknown[]>(eventName: string, fn: (...args: T) => void): void {
    const event = this.evens.find((item) => item.key === eventName);

    if (event) {
      event.callbacks.push(fn as (...args: unknown[]) => void);
    } else {
      this.evens.push({ key: eventName, callbacks: [fn as (...args: unknown[]) => void] });
    }
  }

  emit<T extends unknown[]>(eventName: string, ...args: T): void {
    const event = this.evens.find((item) => item.key === eventName);

    if (event) {
      event.callbacks.forEach((callback) => callback(...(args as unknown as T)));
    } else {
      console.warn(`事件 "${eventName}" 未找到`);
    }
  }
}

export const music = new BaseEvent('music')
export const pageData = new BaseEvent('pageData')
export const menuData = new BaseEvent('menu')
