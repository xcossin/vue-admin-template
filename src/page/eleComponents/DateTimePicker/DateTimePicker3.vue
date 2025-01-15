<template>
  <div class="com-item">
    <h3>DateTimePicker</h3>
    <p>利用 momentjs 设置 picker-options 属性实现动态限制开始时间和结束时间 - 选择时分秒后不能选择当天</p>
    <el-form ref="form" :model="form" label-width="6em" :inline="true">
      <el-form-item label="开始时间:" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择违法开始时间"
          :picker-options="pickerOptionsStartNotCompareNow(form.endTime)"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间:" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择违法结束时间"
          :picker-options="pickerOptionsEndNotCompareNow(form.startTime)"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  pickerOptionsStartNotCompareNow,
  pickerOptionsEndNotCompareNow
} from '@/utils/common'
// const moment = require('dayjs')
import moment from 'moment'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      form: {
        startTime: `${moment().format('YYYY-MM-DD')} 00:00:00`,
        endTime: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  methods: {
    pickerOptionsStartNotCompareNow,
    pickerOptionsEndNotCompareNow,
    onSubmit() {
      console.log('this.form', this.form)
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    /**
     * @name 王本灿
     * @Date 2023-01-11 11:54:06
     * @introduction 开始时间改变
     * @description 详细描述
     * @param {参数类型} 参数 参数说明
     */
    changeStartTime(startTime) {
      this.getDays(moment(this.form.startTime).format('YYYY-MM-DD'), moment(this.form.endTime).format('YYYY-MM-DD'))
    },
    /**
     * @name 王本灿
     * @Date 2023-01-11 11:54:06
     * @introduction 结束时间改变
     * @description 详细描述
     * @param {参数类型} 参数 参数说明
     */
    changeEndTime(endTime) {
      this.getDays(moment(this.form.startTime).format('YYYY-MM-DD'), moment(this.form.endTime).format('YYYY-MM-DD'))
    },
    /**
     * @name 王本灿
     * @Date 2023-01-11 11:53:34
     * @introduction 判断时间相差多少天
     * @description 详细描述
     * @param {参数类型} 参数 参数说明
     */
    getDays(strDateStart, strDateEnd) {
      const strSeparator = '-'
      // let iDays
      const oDate1 = strDateStart.split(strSeparator)
      const oDate2 = strDateEnd.split(strSeparator)
      const strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2])
      const strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2])
      const iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)
      // 把相差的毫秒数转换为天数

      if (iDays > 30) {
        Message({
          message: '查询时间跨度不能大于30天，请重新选择',
          type: 'error',
          showClose: true,
          duration: 2000
        })
      }
      return iDays
    }
  }

}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

