import Vue from 'vue'

Vue.directive('resize', {
  bind (el, binding) { // el为绑定的元素，binding为绑定给指令的对象
    let width = ''
    let height = ''
    function isReize () {
      const style = document.defaultView.getComputedStyle(el)
      if (width !== style.width || height !== style.height) {
        binding.value() // 关键
      }
      // eslint-disable-next-line prefer-destructuring
      width = style.width
      // eslint-disable-next-line prefer-destructuring
      height = style.height
    }
    el.__vueSetInterval__ = setInterval(isReize, 300)
  },
  unbind (el) {
    clearInterval(el.__vueSetInterval__)
  }
})
