import Vue from 'vue'
/**
 * @introduction 匹配特殊字符
 * @params {${2.String}} str 需要匹配的字符串
 * @return {Number}
 */
const getStrBlank = (str) => {
  let result = 0
  const newStr = str.match(/〔|〕/g)
  for (const i in newStr) {
    result++
  }
  return result
}
const SPWIDTH = 8 // 单个特殊字符的长度

const overFlow = (el) => {
  const curStyle = window.getComputedStyle(el, '') // 获取当前元素的style
  const textSpan = document.createElement('span') // 创建一个容器来记录文字的width
  // 复制一个元素用来比较是否溢出，可以解决offsetWidth > scrollWidth这种方式带来的浏览器兼容问题
  textSpan.style.fontSize = curStyle.fontSize
  textSpan.style.fontWeight = curStyle.fontWeight
  textSpan.style.fontFamily = curStyle.fontFamily
  // 将复制元素插入body中，否则offsetWidth为undefined
  document.body.appendChild(textSpan)
  textSpan.innerHTML = el.innerText
  // 匹配特殊字符计算真正的宽度
  const textWidth = getStrBlank(el.innerText) * SPWIDTH + textSpan.offsetWidth
  if (textWidth > el.offsetWidth) {
    el.style.overflow = 'hidden'
    el.style.textOverflow = 'ellipsis'
    el.style.whiteSpace = 'nowrap'
    el.onmouseenter = () => {
      // 获取元素相对可视区的位置
      const { top } = el.getBoundingClientRect()
      const { left } = el.getBoundingClientRect()
      const elWidth = el.getBoundingClientRect().width
      const spTooltipDom = document.createElement('div')
      // 这个地方设置主要是为了获取元素对应的高宽,后面会重新给定top和left
      spTooltipDom.style.cssText =
      `
      position:absolute;
      top: -100px;
      left: -100px;
      max-width:400px;
      max-height: 400px;
      overflow: auto;
      font-size:12px;
      z-index:19999
      display:inline-block;
      `
      // 给元素加上ID属性，方便移除
      spTooltipDom.setAttribute('id', 'sp-tooltip')
      document.body.appendChild(spTooltipDom)
      document.getElementById('sp-tooltip').innerHTML = el.innerText
      // 获取浮动元素的高宽
      const spRealDom = document.getElementById('sp-tooltip')
      let { height } = spRealDom.getBoundingClientRect()
      const { width } = spRealDom.getBoundingClientRect()
      // 解决当浮动元素只有一行时高度不正确问题
      if (width < 400 && height > 13) {
        height = 13
      }
      // 计算真正需要偏移的左侧距离
      let realWidth = 0
      if (width > elWidth + 20) {
        realWidth = (width / 2) - (elWidth / 2)
      } else {
        realWidth = 20
      }
      // 浮动元素距离真正元素的底部距离
      const BOTTOMDISTANCE = 6
      spTooltipDom.style.cssText =
      `
      position:absolute;
      top:${top - (height + 20 + BOTTOMDISTANCE)}px;
      left:${left - realWidth}px;
      background: rgba(0, 0 , 0);
      color:#fff;
      border-radius:5px;
      display:inline-block;
      max-width:400px;
      max-height: 400px;
      overflow: auto;
      padding: 10px;
      font-size:12px;
      z-index:19999
      `
      // 底下的箭头DOM
      const arrowDom = document.createElement('div')
      arrowDom.style.cssText =
      `
      width: 0px;
      heigh: 0px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid black;
      position:absolute;
      top:${top - 6}px;
      left:${left + elWidth / 2 - 3}px;
      z-index:19999
      `
      document.body.appendChild(arrowDom)
      arrowDom.setAttribute('id', 'sp-arrowDom')
    }
    el.onmouseleave = function () {
      // 找到浮层元素并移出
      const spTooltipDom = document.getElementById('sp-tooltip')
      spTooltipDom && document.body.removeChild(spTooltipDom)
      const arrowDom = document.getElementById('sp-arrowDom')
      arrowDom && document.body.removeChild(arrowDom)
    }
  }
  document.body.removeChild(textSpan)
}
Vue.directive('showOverflow', {
  // 挂载
  componentUpdated (el) {
    overFlow(el)
  },
  inserted (el) {
    overFlow(el)
  },
  // 清除
  unbind () {
    // 找到浮层元素并移除
    const spTooltipDom = document.getElementById('sp-tooltip')
    spTooltipDom && document.body.removeChild(spTooltipDom)
    const arrowDom = document.getElementById('sp-arrowDom')
    arrowDom && document.body.removeChild(arrowDom)
  }
})
