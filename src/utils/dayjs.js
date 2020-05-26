import Vue from 'vue'
import dayjs from 'dayjs'
// dayjs 默认应为 配置中文
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

console.log(dayjs().format('YYYY-MM-DD'))
// 定义一个全局过滤器，然后就可以在任何组件的模板中使用
// 过滤器 相当于一个全局可用的方法
// 参数一： 过滤器名称
// 参数二：过滤器函数
// 使用方式： {{表达式 | 过滤器名称}}
// 管道符前面的表达式的结果会作为参数传递到过滤器函数中，
// 过滤器的返回值会渲染到试用过滤器的模板位置
Vue.filter('relativeTime', value => {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
  // return dayjs().to(dayjs(value))
})
