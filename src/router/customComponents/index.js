export const customComponentsRouter = [
  {
    path: 'SpFormContainer',
    name: 'SpFormContainer',
    component: () => import('@/page/customComponents/SpFormContainer/index'),
    meta: { title: 'SpFormContainer', icon: 'el-icon-c-scale-to-original' }
  },
  {
    path: 'SpIcon',
    name: 'SpIcon',
    component: () => import('@/page/customComponents/SpIcon'),
    meta: { title: 'SpIcon', icon: 'el-icon-c-scale-to-original' }
  },
  /* {
    path: 'SpEgrid',
    name: 'SpEgrid',
    component: () => import('@/page/customComponents/SpEgrid/index'),
    meta: { title: 'SpEgrid', icon: 'el-icon-upload' }
  } */
]

