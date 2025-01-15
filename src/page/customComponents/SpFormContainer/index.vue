<!--
 * @Author: cky
 * @Date: 2022-03-08 13:12:52
 * @LastEditors: cky
 * @LastEditTime: 2022-06-09 18:39:00
 * @Description: description
-->
<template>
  <div class="page-container">
    <!-- 表单 -->
    <form-container 
      ref="Form"
      :model="form"
      label-width="6em"
      class="searchform">
      <el-form-item label="所属支队" prop="tfcunitId">
        <el-select
          v-model="ssddArr"
          multiple
          clearable
          placeholder="所属支队"
          @change="changeArray(ssddArr, 'tfcunitId')">
          <el-option
            v-for="item in ddList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="道路名称" prop="roadName">
        <el-input v-model="form.roadName" placeholder="道路名称"></el-input>
      </el-form-item>
      <!-- <el-form-item label prop="wflx" style="width:280px">
        <el-select v-model="wflxArr" multiple clearable placeholder="违法类型" @change="changeArray(wflxArr,'wflx')">
            <el-option
            v-for="item in typeOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            >
            </el-option>
        </el-select>
        </el-form-item> -->
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择违法开始时间"
          @change="changeStartTime"
          :picker-options="pickerOptionsStartNotCompareNowDay(form.endTime)"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择违法结束时间"
          @change="changeEndTime"
          :picker-options="pickerOptionsEndNotCompareNowDay(form.startTime)"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择违法结束时间"
          @change="changeEndTime"
          :picker-options="pickerOptionsEndNotCompareNowDay(form.startTime)"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择违法结束时间"
          @change="changeEndTime"
          :picker-options="pickerOptionsEndNotCompareNowDay(form.startTime)"
        >
        </el-date-picker>
      </el-form-item>
      <!-- 如果不折叠表单可以写到默认solt里 -->
      <template #rightControls>
        <el-form-item>
          <el-button type="primary" @click="refresh">
            <i class="el-icon-search"></i> 查询
          </el-button>
          <el-button @click="reset">
            <i class="el-icon-refresh"></i> 重置
          </el-button>
          <el-button type="primary" @click="exportPage">
            <i class="el-icon-download"></i> 导出
          </el-button>
        </el-form-item>
      </template>
    </form-container>
  </div>
</template>

<script>    
import SpFormContainer from "@/components/SpFormContainer/SpFormContainer";
import {
  pickerOptionsStartNotCompareNowDay,
  pickerOptionsEndNotCompareNowDay,
} from "@/utils/common";
// import { exportDdgcwf } from '@/api/reportAnalysis/requests'
import moment from "moment";
import { Message } from "element-ui";
export default {
  name: "IllegalAlarmForm",
  components: {
    formContainer: SpFormContainer,
  },
  data() {
    return {
      ssddArr: [],
      wflxArr: [],
      form: {
        tfcunitId: "",
        roadName: "",
        // wflx: '',
        startTime: `${moment().format("YYYY-MM-DD")} 00:00:00`,
        endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      typeOptions: [
        {
          code: 1,
          name: "非占机",
        },
        {
          code: 3,
          name: "非机逆行",
        },
        {
          code: 7,
          name: "拥堵",
        },
        {
          code: 8,
          name: "骑车带人",
        },
        {
          code: 9,
          name: "不戴头盔",
        },
        {
          code: 10,
          name: "不戴头盔带人",
        },
      ],
      ddList: [
        {
          code: "11410100-00106",
          name: "交警一支队",
        },
        {
          code: "11410100-00107",
          name: "交警二支队",
        },
        {
          code: "11410100-00108",
          name: "交警三支队",
        },
        {
          code: "11410100-00109",
          name: "交警四支队",
        },
        {
          code: "11410100-00110",
          name: "交警五支队",
        },
        {
          code: "11410100-00111",
          name: "交警六支队",
        },
      ],
    };
  },
  methods: {
    pickerOptionsStartNotCompareNowDay,
    pickerOptionsEndNotCompareNowDay,
    changeArray(arr, key) {
      const val = arr.join(",");
      this.form[key] = val;
    },
    // 重置
    reset() {
      this.$refs.form.resetFields();
      this.ssddArr = [];
      // this.wflxArr = []
    },
    exportPage() {
      //   exportDdgcwf(this.form).then(res => {
      //     this.$mesage.succsess('导出成功，请稍后')
      //   })
    },
    /**
     * @name 王本灿
     * @Date 2023-01-11 12:56:10
     * @introduction 手动查询方法
     * @description 详细描述
     * @param {参数类型} 参数 参数说明
     */
    refresh() {
      if (this.form.startTime && this.form.endTime) {
        let res = this.getDays(
          moment(this.form.startTime).format("YYYY-MM-DD"),
          moment(this.form.endTime).format("YYYY-MM-DD")
        );
        if (res > 30) {
          return;
        }
        this.$emit("refresh");
      } else {
        Message({
          message: "请先选择时间",
          type: "error",
          showClose: true,
          duration: 2000,
        });
      }
    },
    /**
     * @name 王本灿
     * @Date 2023-01-11 11:54:06
     * @introduction 开始时间改变
     * @description 详细描述
     * @param {参数类型} 参数 参数说明
     */
    changeStartTime(startTime) {
      this.getDays(
        moment(this.form.startTime).format("YYYY-MM-DD"),
        moment(this.form.endTime).format("YYYY-MM-DD")
      );
    },
    /**
     * @name 王本灿
     * @Date 2023-01-11 11:54:06
     * @introduction 结束时间改变
     * @description 详细描述
     * @param {参数类型} 参数 参数说明
     */
    changeEndTime(endTime) {
      this.getDays(
        moment(this.form.startTime).format("YYYY-MM-DD"),
        moment(this.form.endTime).format("YYYY-MM-DD")
      );
    },
    /**
     * @name 王本灿
     * @Date 2023-01-11 11:53:34
     * @introduction 判断时间相差多少天
     * @description 详细描述
     * @param {参数类型} 参数 参数说明
     */
    getDays(strDateStart, strDateEnd) {
      let strSeparator = "-";
      let iDays;
      let oDate1 = strDateStart.split(strSeparator);
      let oDate2 = strDateEnd.split(strSeparator);
      let strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
      let strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
      iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24);
      // 把相差的毫秒数转换为天数

      if (iDays > 30) {
        Message({
          message: "查询时间跨度不能大于30天，请重新选择",
          type: "error",
          showClose: true,
          duration: 2000,
        });
      }
      return iDays;
    },
  },
};
</script>
<style lang="stylus" scoped>
.page-container
  height 500px
  background: rgba(229, 235, 246,1)
.searchform
  flex-shrink 0
/* >>>.el-select__tags {
  width: calc(100% - 30px) !important;
  max-width: none !important;
  flex-wrap: nowrap;
  overflow: hidden;
}

>>>.el-range-editor--mini .el-range-input {
  background: none;
}

>>>.el-date-editor {
  width: 365px;
  border-radius: 2px;
}

>>>.el-range-editor--mini .el-range-input {
  background: none;
  color: #fff;
}

>>>.form-container .el-form-item__label {
  width: 4em !important;
} */
</style>
