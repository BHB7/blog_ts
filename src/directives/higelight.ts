
import 'highlight.js/styles/stackoverflow-dark.css'
import 'highlight.js/lib/common'
import hljs from "highlight.js"
//定义指令，自动使用highlight.js渲染所有<pre><dode>代码块
export default {
  mounted(el: any) {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block: HTMLElement) => {
      block.setAttribute('style', 'margin-top: 8px;')
      hljs.highlightBlock(block)
    })
  }
}
