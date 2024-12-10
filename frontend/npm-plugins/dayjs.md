1.第一步安装day.js
```
npm install dayjs --save
```
2.在 main.js 中全局引入
```
import dayjs from 'dayjs' // 引入day.js
Vue.prototype.day.js = day.js // 全局方法挂载
```
当然也可以在单独的js文件声明好后再引入

3. 使用举例
```
获取今天
this.dayjs();

获取昨天
let yesterday = this.dayjs().subtract(1, 'days').format('YYYY-MM-DD')

let time1 = yesterday + ' ' + '00:00:00'
let time2 = yesterday + ' ' + '23:59:59'
console.log('昨天', time1)
console.log('昨天', time2)

获取本周
// 开始时间
let start_time = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD');
// 结束时间
let end_time = dayjs().endOf('week').add(1, 'day').format('YYYY-MM-DD');

获取上周
// 开始时间
let start_time =dayjs().add(-1,'week').startOf('week').add(1,'day').format('YYYYMMDD');
// 结束时间
let end_time = dayjs().add(-1, 'week').endOf('week').add(1, 'day').format('YYYY-MM-DD');


获取本月
// 开始时间
let start_time = dayjs().startOf('month').format('YYYY-MM-DD');
// 结束时间
let end_time = dayjs().endOf('month').format('YYYY-MM-DD');


获取上月
// 开始时间
let start_time = dayjs().add(-1, 'month').startOf('month').format('YYYY-MM-DD');
// 结束时间
let end_time = dayjs().add(-1, 'month').endOf('month').format('YYYY-MM-DD');


获取本季度
const  start = moment().startOf('quarter').format('YYYY-MM-DD')   // 开始
const end = moment().endOf('quarter').format('YYYY-MM-DD')   // 结束
```