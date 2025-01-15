export const eleRouter = [
  {
    path: 'Select',
    name: 'Select',
    component: () => import('@/page/eleComponents/select/index'),
    meta: { title: 'Select', icon: 'el-icon-c-scale-to-original' }
  },
  {
    path: 'Upload',
    name: 'Upload',
    component: () => import('@/page/eleComponents/upload/index'),
    meta: { title: 'Upload', icon: 'el-icon-upload' }
  },
  {
    path: 'DateTimePicker',
    name: 'DateTimePicker 日期时间选择器',
    component: () => import('@/page/eleComponents/DateTimePicker/index'),
    meta: { title: 'DateTimePicker 日期时间选择器', icon: 'el-icon-time' }
  }
]

