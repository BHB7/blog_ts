// utils/console-enhance.ts

type LogType = 'log' | 'info' | 'success' | 'warn' | 'error'

const styles: Record<LogType, string> = {
  log: 'background:#e0e0e0; color:#333; padding:2px 10px; border-radius:999px; font-weight:bold;',
  info: 'background:#209cee; color:#fff; padding:2px 10px; border-radius:999px; font-weight:bold;',
  success: 'background:#48c78e; color:#fff; padding:2px 10px; border-radius:999px; font-weight:bold;',
  warn: 'background:#ffdd57; color:#111; padding:2px 10px; border-radius:999px; font-weight:bold;',
  error: 'background:#f14668; color:#fff; padding:2px 10px; border-radius:999px; font-weight:bold;',
}
const tag = (label: string, bgColor = '#409EFF', color = '#fff') => {
  return [`%c ${label} `, `background:${bgColor};color:${color};border-radius:999px;padding:2px 10px;font-weight:bold;`]
}

class ConsoleEnhance {
  static log(...args: unknown[]) {
    this.print('log', ...args)
  }

  static info(...args: unknown[]) {
    this.print('info', ...args)
  }

  static success(...args: unknown[]) {
    this.print('success', ...args)
  }

  static warn(...args: unknown[]) {
    this.print('warn', ...args)
  }

  static error(...args: unknown[]) {
    this.print('error', ...args)
  }

  static welcome() {
    console.clear()
    console.log(
      `%c
--  ███████╗███████╗        ██████╗ ██╗      ██████╗  ██████╗
--  ╚════██║╚══███╔╝        ██╔══██╗██║     ██╔═══██╗██╔════╝
--      ██╔╝  ███╔╝         ██████╔╝██║     ██║   ██║██║  ███╗
--     ██╔╝  ███╔╝          ██╔══██╗██║     ██║   ██║██║   ██║
--     ██║  ███████╗███████╗██████╔╝███████╗╚██████╔╝╚██████╔╝
--     ╚═╝  ╚══════╝╚══════╝╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝
--
`,
      'color:#409eff; font-weight:bold;'
    )

    // console.log(...tag('WELCOME'), '🎉 ConsoleEnhance 初始化成功！')
    // console.log(...tag('VERSION', '#67C23A'), 'v1.0.0')
    // console.log(...tag('DATE', '#FFB302'), new Date().toLocaleString())
    // console.log(...tag('TIP', '#FF69B4'), ' log/info/success/warn/error 输出彩色日志 ~')
    // console.log(...tag('POWERED BY', '#34495e'), 'ConsoleEnhance | 终端增强\n')
  }

  private static print(type: LogType, ...args: unknown[]) {
    const label = `%c ${type.toUpperCase()} `
    const style = styles[type]
    console.log(label, style, ...args)
  }
}

export default ConsoleEnhance
