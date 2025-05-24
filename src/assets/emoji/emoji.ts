
let prefix = 'https://vocucd.cn/'

let emoji = {
  faceList: [{ type: 'emoji', label: '😀' }, { label: `${prefix}emoji/072%25402x.gif` }],
  emojiList: [
    [
      { type: 'emoji', label: '😀' },
    ],
    [
      { label: '[疑问]', value: `${prefix}emoji/031%25402x.gif` },
    ]
  ],
  activeIndex: 1
}

if (emoji) {
  let obj = emoji.emojiList.reduce((acc, cur) => {
    // @ts-ignore
    let arr = cur.filter(e => e.type != 'emoji')
    arr.forEach(e => {
      // @ts-ignore
      acc[e.label] = e.value
    })
    return acc
  }, {})
  // @ts-ignore
  emoji.allEmoji = obj
}

export default {
  ...emoji
}
