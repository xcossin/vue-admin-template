import { DOUBLE_QUOTA_PATTERN } from './patterns'
import moment from 'moment'
// const moment = require('dayjs')
// 保存文件
export const saveBlobFile = (blobStream, fileName) => {
  const blob = new Blob([blobStream])
  const fileUrl = window.URL.createObjectURL(blob)
  // 如果是ie
  if ('msSaveOrOpenBlob' in navigator) {
    window.navigator.msSaveOrOpenBlob(blob, fileName)
  } else {
    // 其他浏览器用<a>模拟点击
    // 创建一个 <a> 元素
    const link = document.createElement('a')
    // 创建一个对象 URL，将 Blob 对象链接到 <a> 元素上
    link.href = fileUrl
    // 将 <a> 元素添加到 DOM 中
    link.setAttribute('download', fileName)
    // 模拟点击下载链接
    link.click()
  }
  // 从 DOM 中移除 <a> 元素
  window.URL.revokeObjectURL(fileUrl)
}
/**
 * @introduction 缩减数值单位大小
 * @description 如果不是数值，返回NaN，否则缩减为单位为K或M，如果不是整数则保留两位小数
 * @param {Number} num 一个需要转换的数值
 * @return {String|NaN} 返回一个转换后的数值字符串或NaN
 * @exception {违例类型} 违例类型说明
 */
export const changeNumberUnit = num => {
  const number = Number(num)
  if (isNaN(number)) return NaN
  if (number < 1000) {
    return number
  } else if (number < 1000 * 1000) {
    const size = number / 1000
    return `${size}`.indexOf('.') !== -1 ? `${size.toFixed(2)}K` : `${size}K`
  } else {
    const size = number / (1000 * 1000)
    return `${size}`.indexOf('.') !== -1 ? `${size.toFixed(2)}M` : `${size}M`
  }
}

/**
 * @introduction 判断获取的时间是否以及超过获取间隔
 * @description 判断获取的时间是否以及超过获取间隔，间隔时间默认5分钟
 * @param {Number} fetchedTime 上次获取的时间毫秒数
 * @param {Number} interval 获取时间的间隔，默认是5分钟
 * @return {Boolean} 是否已经超过获取间隔
 * @exception {违例类型} 违例类型说明
 */
export const ifFetchTimeout = (fetchedTime, interval = 5 * 60 * 1000) => (Date.now() - fetchedTime > interval)

/**
 * @introduction 格式化指标数据
 * @description 格式化指标数据，提取indexKey作为键值
 * @param {Array} array 返回的指标数组
 * @return {Object} 以键值对形式返回的指标对象
 * @exception [违例类型] [违例类型说明]
 */
export const formatCodeData = array => {
  if (!array || array.length === 0) return {}
  const temp = {}
  array.forEach(arr => {
    temp[arr.indexKey] = arr
  })
  return temp
}

/**
 * @introduction 解析字符串为js代码
 * @description 解析字符串为js代码
 * @param {String} str 需要解析的字符串
 * @return {*} 解析后的代码
 * @exception [违例类型] [违例类型说明]
 */
export const evalString = str => {
  const Fn = Function
  return new Fn(`return ${str}`)()
}

/**
 * @introduction 将对象转化为字符串
 * @description 将对象转化为字符串，可转换包含Funciton的对象
 * @param {Object} obj 需要转换的对象
 * @return {String} 转换后的字符串
 * @exception [违例类型] [违例类型说明]
 */
export const stringifyJSON = obj => {
  return JSON.stringify(obj, function (k, v) {
    if (typeof v === 'function') {
      return Function.prototype.toString.call(v)
    }
    return v
  })
}

/**
 * @introduction 转换JSON字符串
 * @description 转换JSON字符串，可转换包含Funciton的字符串
 * @param {String} string json字符串
 * @return {Object} 转换后的对象
 * @exception [违例类型] [违例类型说明]
 */
export const parseJSON = string => {
  return JSON.parse(string, function (k, v) {
    if (typeof v === 'string' && v.startsWith('function')) {
      const parseFunction = evalString(v)
      return parseFunction
    }
    return v
  })
}

/**
 * @introduction 将rem转换为px
 * @description 将rem转换为px（主要给echarts使用）
 * @param {Number} 需要转的rem值
 * @return {返回类型说明}
 * @exception {违例类型} 违例类型说明
 */
export function getRemToPx (rem) {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const baseFontSize = width / 14.4
  return baseFontSize * rem
}

/**
 * @introduction 设置月份1-12个月
 * @description 生成月份列表
 * @param {参数类型} 参数 参数说明
 * @return {返回类型说明}
 * @exception [违例类型] [违例类型说明]
 */
export function setMonthList () {
  const monthList = []
  for (let index = 1; index < 13; index++) {
    monthList.push({
      label: `${index}月`,
      value: index
    })
  }
  return monthList
}
/**
 * @introduction 截止时间要大于开始时间，不和当前时间比较 - 选择时分秒后不能选择当天
 * @description 详细描述
 * @param {Sting} endTime 截止时间
 * @return {返回类型说明}
 * @exception [违例类型] [违例类型说明]
 */
export const pickerOptionsStartNotCompareNow = endTime => {
  return {
    disabledDate: time => {
      const beginDateVal = new Date(endTime).getTime()
      if (beginDateVal) {
        return (time.getTime() > beginDateVal)
      } else {
        return false
      }
    }
  }
}
/**
 * @introduction 开始时间要小于截止时间，不和当前时间比较 - 选择时分秒后不能选择当天
 * @description 详细描述
 * @param {String} startTime 开始时间
 * @return {返回类型说明}
 * @exception [违例类型] [违例类型说明]
 */
export const pickerOptionsEndNotCompareNow = startTime => {
  return {
    disabledDate: time => {
      const beginDateVal = new Date(startTime).getTime()
      if (beginDateVal) {
        return (time.getTime() < beginDateVal)
      } else {
        return false
      }
    }
  }
}
/**
 * @introduction 开始时间要小于截止时间，不和当前时间比较
 * @description 详细描述
 * @param {String} startTime 开始时间
 * @return {返回类型说明}
 * @exception [违例类型] [违例类型说明]
 */
export const pickerOptionsNow = {
  disabledDate (time) {
    return time.getTime() > new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
  }
}

/**
 * @introduction 截止时间要大于开始时间，不和当前时间比较——选择时分秒后可选当天
 * @description 详细描述
 * @param {Sting} endTime 截止时间
 * @return {返回类型说明}
 * @exception [违例类型] [违例类型说明]
 */
export const pickerOptionsStartNotCompareNowDay = endTime => {
  const beginDateVal = moment(moment(endTime).format('YYYY-MM-DD')).format('x')
  return {
    disabledDate: time => {
      if (beginDateVal) {
        return (time.getTime() > beginDateVal)
      } else {
        return false
      }
    }
  }
}
/**
 * @introduction 开始时间要小于截止时间，不和当前时间比较——选择时分秒后可选当天
 * @description 详细描述
 * @param {String} startTime 开始时间
 * @return {返回类型说明}
 * @exception [违例类型] [违例类型说明]
 */
export const pickerOptionsEndNotCompareNowDay = startTime => {
  const beginDateVal = moment(moment(startTime).format('YYYY-MM-DD')).format('x')
  return {
    disabledDate: time => {
      if (beginDateVal) {
        return (time.getTime() < beginDateVal)
      } else {
        return false
      }
    }
  }
}
/**
 * @introduction 判断是否是合法值
 * @description 如果值为undefined和null或空字符串，返回false
 * @param {参数类型} 参数 参数说明
 * @return {返回类型说明}
 * @exception [违例类型] [违例类型说明]
 */
export const isValidValue = value => {
  return value !== undefined && value !== null && value !== ''
}

/**
 * @introduction 封装formdata格式数据
 * @description 通过传入一个对象（或formdata作为第二个参数），组装完formdata后返回这个值
 * 如果对象中有值是数组，会循环这个数组并append（用于多文件或一些多选的情况），但只限一层
 * 如果对象中有数组，并且数组中式对象，则会遍历这个对象，只限一层 （eg：enforceResourceDetainList[0].name: 11111）,如果该值是null或者undefined也是传空字符串
 * @param {Object} object 要封装的对象
 * @param {FormData} formdata 可选，formdata对象，如果不指定，默认新建一个FormData
 * @return {FormData} 组装完成的formdata对象
 * @exception {违例类型} 违例类型说明
 */
export const formatFormData = (object = {}, formdata = new FormData()) => {
  for (const key in object) {
    if (object[key] instanceof Array) {
      object[key].forEach((item, index) => {
        if (isValidValue(object[key])) {
          // 数组是对象
          if (item instanceof Object && !(item instanceof File)) {
            for (const childKey in item) {
              if (isValidValue(item[childKey])) {
                // 结果：enforceResourceDetainList[0].name: 11111
                formdata.append(`${key}[${index}].${childKey}`, item[childKey])
              } else {
                formdata.append(`${key}[${index}].${childKey}`, '')
              }
            }
          } else {
            formdata.append(key, item)
          }
        } else {
          formdata.append(key, '')
        }
      })
    } else {
      if (isValidValue(object[key])) {
        formdata.append(key, object[key])
      } else {
        formdata.append(key, '')
      }
    }
  }
  return formdata
}

// 解码并返回结果
export const getContentDispositionFileName = (headers) => {
  const fileNameStr = headers['content-disposition'].split(';')[1]
  const fileName = getValueFromPairs(fileNameStr, 'filename')
  return decodeURI(fileName)
}

/**
 * @Date 2019-08-26 14:40:32
 * @introduction 匹配=后面的文件名，并删除双引号
 * @description 匹配=后面的文件名，并删除双引号
 * @param {String, String} pairs 需要匹配的字符串
 * @return {String} 返回文件名
 * @exception {违例类型} 违例类型说明
 */
const getValueFromPairs = (pairs, key) => {
  // return pairs.match(DOUBLE_QUOTA_PATTERN)[1]
  return JSON.parse(JSON.stringify(pairs.split('=')[1])).replace(DOUBLE_QUOTA_PATTERN, '')
}

/**
* @introduction 验证经纬度
* @description 验证经度(整数部分为0-180小数部分为0到14位) 验证维度 (整数部分为0-90小数部分为0到14位)
* @param {String} longitude 经度
* @param {String} latitude 纬度
* @return {Boolean} true 验证成功 ；false 验证失败
* @exception [违例类型] [违例类型说明]
*/
export const verifyLngLat = (longitude, latitude) => {
  const longreg = /^(-|\+)?(0(\.\d{1,15})?|([1-9](\d)?)(\.\d{1,15})?|1[0-7]\d{1}(\.\d{1,15})?|180\.0{1,15})$/
  const latreg = /^(-|\+)?((0|([1-8]\d?))(\.\d{1,15})?|90(\.0{1,15})?)$/
  if (longreg.test(longitude) && latreg.test(latitude)) {
    return true
  } else {
    return false
  }
}

// 自定义参数版 保存文件方法
export const saveBlobFileCus = (blob, fileName) => {
  // 创建一个 <a> 元素
  const downloadLink = document.createElement('a')
  // 创建一个对象 URL，将 Blob 对象链接到 <a> 元素上
  downloadLink.href = URL.createObjectURL(blob)
  // 设置文件名（你可以根据需要更改文件名）
  downloadLink.download = fileName
  // 将 <a> 元素添加到 DOM 中
  document.body.appendChild(downloadLink)
  // 模拟点击下载链接
  downloadLink.click()
  // 从 DOM 中移除 <a> 元素
  document.body.removeChild(downloadLink)
}

// 判断是否是ie
export const IEVersion = () => {
  const { userAgent } = navigator // 取得浏览器的userAgent字符串
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(/$1/)
    if (fIEVersion === 7) {
      return 7
    } else if (fIEVersion === 8) {
      return 8
    } else if (fIEVersion === 9) {
      return 9
    } else if (fIEVersion === 10) {
      return 10
    } else {
      return 6 // IE版本<=7
    }
  } else if (isEdge) {
    return 'edge' // edge
  } else if (isIE11) {
    return 11 // IE11
  } else {
    return -1 // 不是ie浏览器
  }
}
