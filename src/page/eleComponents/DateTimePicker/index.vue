<template>
  <div class="page-container">
    <h2>DateTimePicker 组件</h2>

    <DateTimePicker1 />
    <DateTimePicker2 />
    <svg-icon icon-class="user" />
    <sp-icon type="apple" color="#606881" fontSize="20"></sp-icon>
  </div>
</template>

<script>
import DateTimePicker1 from '@/page/eleComponents/DateTimePicker/DateTimePicker1.vue'
import DateTimePicker2 from '@/page/eleComponents/DateTimePicker/DateTimePicker2.vue'
export default {
  components: {
    DateTimePicker1,
    DateTimePicker2
  },
  data () {
    return {
    }
  },
  methods: {

  }

}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

