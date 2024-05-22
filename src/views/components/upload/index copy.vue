<template>
  <div class="app-container">
    <h2>Upload 组件</h2>
    <h3>获取二进制文件</h3>
    <ElUploadCard1 />
    <el-divider />
    <h3>隐藏移除添加时的动画</h3>
    <ElUploadCard2 />
    <el-divider />
    <h3>覆盖默认的上传行为并压缩</h3>
    <ElUploadCard3 />
    <el-divider />
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="获取二进制文件" name="ElUploadCard1" />
      <el-tab-pane label="隐藏移除添加时的动画" name="ElUploadCard2" />
      <el-tab-pane label="覆盖默认的上传行为并压缩" name="ElUploadCard3" />
      <el-tab-pane label="" name="ElUploadCard4" />
    </el-tabs>
    <div class="com-content-item">
      <component :is="activeName" />
    </div> -->
  </div>
</template>

<script>
import imgCompress from './ElUpload3/imgCompress'
import ElUploadCard1 from '@/views/components/upload/ElUploadCard1.vue'
import ElUploadCard2 from '@/views/components/upload/ElUploadCard2.vue'
import ElUploadCard3 from '@/views/components/upload/ElUpload3/ElUploadCard3.vue'
export default {
  components: {
    ElUploadCard1,
    ElUploadCard2,
    ElUploadCard3
  },
  mixins: [imgCompress],
  data() {
    return {
      activeName: 'ElUploadCard1'
    }
  },
  methods: {
    handleClick(el) {
      this.isActiveName = el.name
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

