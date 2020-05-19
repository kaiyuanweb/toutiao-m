// 本地存储操作
// 存储
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 获取
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data) // 如果解析成功就是json字符串 return 出去
  } catch (err) {
    return data // 否则return 获取数据
  }
}
// 删除
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
