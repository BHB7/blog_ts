const html = `<pre>
  <code class="language-typescript">
    const a = 10;
    console.log(a);
  </code>
</pre>
`;

// 正则表达式
const regex = /<pre>\s*<code\s+class="language-(.*?)">([\s\S]*?)<\/code>\s*<\/pre>/g;

// 提取内容
let match;
while ((match = regex.exec(html)) !== null) {
  const language = match[1]; // 语言类型
  const codeContent = match[2]; // 代码内容

  console.log("语言类型:", language);
  console.log("代码内容:\n", codeContent);
}
