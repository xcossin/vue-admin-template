<template>
  <div class="app-container">
    <h2>Upload 组件</h2>
    <div class="module-box">
      <ElUploadCard1 />
    </div>
    <div class="module-box">
      <ElUploadCard2 />
    </div>
    <div class="module-box">
      <ElUploadCard3 />
    </div>
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

<style scoped lang="stylus">
.line{
  text-align: center;
}
.app-container{
  position:relative
}
.nav-box{
  position:fixed;
  right:0;
  top:0
}
</style>

