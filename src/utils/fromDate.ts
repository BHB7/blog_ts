/**
 * 格式化日期为 "YYYY-MM-DD HH:mm:ss" 格式
 * @param date 日期对象或日期字符串
 * @returns 格式化后的日期字符串
 */
const formatDate = (date: Date | string): string => {
  const time = new Date(date);
  if (isNaN(time.getTime())) {

    return time.toLocaleString()
  }

  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，需要加 1
  const day = String(time.getDate()).padStart(2, '0')
  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  const seconds = String(time.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
export default formatDate
