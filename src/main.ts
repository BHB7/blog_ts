import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/style/index.css'
import 'animate.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import pinia from '@/store/index'
import elUpmove from './directives/elUpmove'
import higelight from './directives/higelight'
import Log from '@/utils/log'
//引入依赖和语言

import hljs from "highlight.js/lib/core";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import javascript from "highlight.js/lib/languages/javascript";
import java from "highlight.js/lib/languages/java";
import sql from "highlight.js/lib/languages/sql";
import xml from "highlight.js/lib/languages/xml";
import html from "highlight.js/lib/languages/vbscript-html";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/json";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("java", java);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("json", json);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", html);
const app = createApp(App)

app.use(hljsVuePlugin)
app.use(pinia)
app.use(router)
app.directive('up', elUpmove)
app.directive('higelight', higelight)
app.mount('#app')
Log.welcome()
