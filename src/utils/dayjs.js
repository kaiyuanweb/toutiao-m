import dayjs from 'dayjs'
// dayjs 默认应为 配置中文
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

console.log(dayjs().format('YYYY-MM-DD'))
