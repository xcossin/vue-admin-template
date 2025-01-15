import Vue from 'vue'
import SpIcon from '@/components/SpIcon.vue'

Vue.component('sp-icon', SpIcon.default || SpIcon)

// 自动引入所有的图标svg文件
const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
