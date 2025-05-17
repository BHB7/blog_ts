import type { Ref } from "vue"
import { getAdminHomeTotalApi, type AdminHomeTotal } from '@/apis/index'
import type { EChartsOption } from 'echarts'
import { reactive, ref } from 'vue'
import { getTagApi, type Tag } from '@/apis/index'

const useAdminHomeHook = () => {
  const tagList = ref<Array<Tag>>()
  const overallList = ref<Array<AdminHomeTotal>>()
  const isLoading = ref(true)
  // 图表配置
  const option: EChartsOption = {
    xAxis: {
      type: 'category' as const, // 👈 加上 `as const` 保证是字面量
      data: ['1', '2', '3', '4', '5', '6', '7'],
    },
    yAxis: {
      type: 'value' as const,
    },
    series: [
      {
        data: [500, 100, 100, 300, 400],
        type: 'line' as const,
        smooth: true,
      },
    ],
  }

  const optionPie: EChartsOption = {
    baseOption: {
      title: [
        {
          text: '234',
          subtext: '设备总数',
          left: '25%',
          top: 'center',
          textAlign: 'center',
          textStyle: {
            fontSize: 32,
            fontWeight: 'bold',
            color: '#ccc',
          },
          subtextStyle: {
            fontSize: 16,
            color: '#666',
          },
        },
        {
          text: '24',
          subtext: '访问总数',
          left: '75%',
          top: 'center',
          textAlign: 'center',
          textStyle: {
            fontSize: 32,
            fontWeight: 'bold',
            color: '#ccc',
          },
          subtextStyle: {
            fontSize: 16,
            color: '#666',
          },
        },
      ],
      tooltip: { show: false },
      legend: { show: false },
      series: [
        {
          type: 'pie',
          radius: ['75%', '90%'],
          center: ['25%', '50%'],
          label: { show: false },
          labelLine: { show: false },
          data: [
            { value: 180, name: '正常', itemStyle: { color: '#296CFF' } },
            { value: 54, name: '异常', itemStyle: { color: '#FF4E4E' } },
          ],
        },
        {
          type: 'pie',
          radius: ['75%', '90%'],
          center: ['75%', '50%'],
          label: { show: false },
          labelLine: { show: false },
          data: [
            { value: 6, name: 'A', itemStyle: { color: '#FFD166' } },
            { value: 6, name: 'B', itemStyle: { color: '#296CFF' } },
            { value: 6, name: 'C', itemStyle: { color: '#FF4E4E' } },
            { value: 6, name: 'D', itemStyle: { color: '#06D6A0' } },
            { value: 6, name: 'E', itemStyle: { color: '#EF476F' } },
          ],
        },
      ],
    },
    media: [
      {
        query: {
          maxWidth: 500, // 小屏（移动端）适配
        },
        option: {
          title: [
            {
              left: '20%',
              top: '1%',
              textAlign: 'center',
            },
            {
              left: '80%',
              top: '1%',
              textAlign: 'center',
            },
          ],
          series: [
            {
              radius: ['20%', '40%'],
              center: ['30%', '60%'], // 👈 第一个圆移动到上方
            },
            {
              radius: ['20%', '40%'],
              center: ['70%', '60%'], // 👈 第二个圆移动到下方
            },
          ],
        },

      },
    ],
  }

  // 获取总揽信息
  const getOverallList = async () => {
    isLoading.value = true
    // 模拟网络请求延迟
    await new Promise((resolve, reject) => setTimeout(() => resolve(''), 2000))
    try {
      const res = await getAdminHomeTotalApi();
      overallList.value = res
    } catch (error) {
      console.error('获取总览信息失败:', error);
    } finally {
      isLoading.value = false
    }
  }

  // 获取标签列表
  const getTagList = async () => {
    const response = await getTagApi()
    if (response) {
      tagList.value = response
    }

  }

  return {
    getOverallList,
    getTagList,
    isLoading,
    overallList,
    option,
    optionPie,
    tagList
  }
}

export default useAdminHomeHook
