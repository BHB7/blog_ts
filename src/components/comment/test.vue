<template>
  <u-comment :config="config" @submit="submit" @mention-search="mentionSearch">
    <!-- <template>导航栏卡槽</template> -->
    <!-- <template #header>头部卡槽</template> -->
    <!-- <template #info>信息卡槽</template> -->
    <!-- <template #card>用户信息卡片卡槽</template> -->
    <!-- <template #func>功能区域卡槽</template> -->
  </u-comment>
</template>

<script setup lang="ts">
// 下载表情包资源emoji.zip https://gitee.com/undraw/undraw-ui/releases/tag/v0.0.0
// static文件放在public下,引入emoji.ts文件可以移动assets下引入,也可以自定义到指定位置
import emoji from '@/assets/emoji/emoji'
import { reactive } from 'vue'
import { UToast, type CommentSubmitApi, type ConfigApi } from 'undraw-ui'

defineOptions({
  name: 'comment'
})

const userArr = [
  {
    id: 1,
    name: '张三',
    avatar: 'https://gd-hbimg.huaban.com/cba6c7af94997ba172c32bbe668794553f29e91ef26f-qnroJ7_fw240webp'
  },
  {
    id: 2,
    name: '李四',
    avatar: 'https://gd-hbimg.huaban.com/d01263d11d07748a2193bbbdd3b9a0c8a4b062b9f39d-PKvV2t_fw240webp'
  },
  {
    id: 3,
    name: '王五',
    avatar: 'https://gd-hbimg.huaban.com/69d92bfbf36fc111e1f563403311e7943628c9fc108bf-6l34Pa_fw240webp'
  },
  {
    id: 4,
    name: '赵六',
    avatar: 'https://gd-hbimg.huaban.com/7f5c54a455f61f431ec1f7b7c0e583f4a725fb73adba-5DgU3q_fw240webp'
  },
  {
    id: 5,
    name: '孙七',
    avatar: 'https://gd-hbimg.huaban.com/edea85f44f3f8bce8d094ed78f390164a9eba229cb2e-1Lc22F_fw240webp'
  },
  {
    id: 6,
    name: '周八',
    avatar: 'https://gd-hbimg.huaban.com/c1b2131c6977e01a430d6575ba678a4afeabcad222605-UJUwwb_fw240webp'
  },
  {
    id: 7,
    name: '吴九',
    avatar: 'https://gd-hbimg.huaban.com/4942e77078bda39a458980049b528236bf79183814998-zVzEJv_fw240webp'
  },
  {
    id: 8,
    name: '郑十',
    avatar: 'https://gd-hbimg.huaban.com/628236086a2ca12d2074bdd29f496f38a4d0c06ae50f-Rj3vsO_fw240webp'
  },
  {
    id: 9,
    name: '王富贵',
    avatar: 'https://gd-hbimg.huaban.com/0108a6b65d211d3bc602bc0431e84b31f9e62ac08015f-JifENm_fw240webp'
  },
  {
    id: 10,
    name: '赵富贵',
    avatar: 'https://gd-hbimg.huaban.com/d9643d6181d506ccc159a940e11bdc6b9a2b53ae57139-pxAnk9_fw240webp'
  }
]
const config = reactive<any>({
  user: {} as any,
  emoji: emoji,
  comments: [],
  showLevel: false,
  showHomeLink: false,
  showAddress: false,
  showLikes: false,
  mention: {
    data: userArr,
    alias: {
      username: 'name'
    },
    showAvatar: true
  }
})
const mentionSearch = (val: string) => {
  config.mention!.data = userArr.filter(v => v.name.includes(val))
}
// 评论数据
setTimeout(() => {
  config.user = {
    id: 1,
    username: 'jack',
    avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100'
  }
  config.comments = [
    {
      id: '1',
      parentId: null,
      uid: '1',
      content: '等闲识得东风面，万紫千红总是春。',
      createTime: '2023-04-30 16:22',
      user: {
        username: '团团喵喵',
        avatar: 'https://static.juzicon.com/user/avatar-23ac4bfe-ae93-4e0b-9f13-f22f22c7fc12-221001003441-Y0MB.jpeg'
      }
    },
    {
      id: '2',
      parentId: null,
      uid: '2',
      content: '长风破浪会有时，直挂云帆济沧海。',
      createTime: '2023-04-28 09:00',
      user: {
        username: '且美且独立',
        avatar: 'https://static.juzicon.com/avatars/avatar-20200926115919-a45y.jpeg'
      }
    }
  ]
}, 500)

// 评论提交事件
let temp_id = 100
// 提交评论事件
const submit = ({ content, parentId, finish }: CommentSubmitApi) => {
  console.log('提交评论: ' + content, parentId)

  const comment = {
    id: String((temp_id += 1)),
    parentId: parentId,
    uid: config.user.id,
    content: content,
    createTime: '1分钟前',
    user: {
      username: config.user.username,
      avatar: config.user.avatar
    },
    reply: null
  }
  setTimeout(() => {
    finish(comment)
    UToast({ message: '评论成功!', type: 'info' })
  }, 200)
}
</script>
