<template>
  <keep-alive>
    <div class="form-container"
      :class="{ nocollapse: !collapse || !showCollapseBtn, response }"
      v-resize="getWrapperSize">
      <div class="form-wrapper" :style="wrapperStyle">
        <el-form class="flexform" :class="collapseClass"
          ref="spform"
          :model="model"
          :rules="rules"
          :inline="inline"
          :label-position="labelPosition"
          :label-width="labelWidth"
          :label-suffix="labelSuffix"
          :show-message="showMessage"
          :inline-message="inlineMessage"
          :status-icon="statusIcon"
          :size="size"
          :disabled="disabled"
          @submit.native.prevent
        >
          <div class="form-left-area" :class="leftAreaClass" :style="leftAreaStyle" ref="leftArea">
            <slot></slot>
          </div>
          <div class="form-right-area">
            <slot name="rightControls"></slot>
          </div>
        </el-form>
      </div>
      <button type="button" v-if="collapse && showCollapseBtn"
        class="collapse-btn" :class="collapseClass"
        @click="collapseOrNot"
      >
        <sp-icon :class="collapseClass" type="sp-menu2-close" fontSize="8"></sp-icon>
        <!-- 更多<i class="el-icon-caret-top"></i> -->
      </button>
    </div>
  </keep-alive>
</template>

<script>
import { mapState } from 'vuex'
/**
 * 定义折叠wrapper高度
 * 高度为：输入框高度 + padding-bottom 15px
 * large:  (40px + 10px) * n + 6px = 56px
 * medium: (36px + 10px) * n + 6px = 52px
 * small:  (32px + 10px) * n + 6px = 47px
 * mimi:   (28px + 10px) * n + 6px = 44px
 */
const wrapHeight = {
  large: 50,
  medium: 46,
  small: 42,
  mini: 38
}

export default {
  name: 'SpFormContainer',
  props: {
    model: Object,
    rules: Object,
    disabled: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: true
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: String,
      default: '6em'
    },
    labelSuffix: String,
    showMessage: {
      type: Boolean,
      default: true
    },
    inlineMessage: {
      type: Boolean,
      default: false
    },
    statusIcon: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    // 是否需要折叠
    collapse: {
      type: Boolean,
      default: true
    },
    // 是否响应式
    response: {
      type: Boolean,
      default: true
    },
    rowNum: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      isCollapse: true,
      wrapperWidth: 1000, // 容器宽度,
      wrapperHeight: this.dwHeight, // wrapper折叠的高度：内容40px + padding-bottom 15px = 55px
      showCollapseBtn: false
    }
  },
  computed: {
    ...mapState({
      isIE: state => state.base.isIE
    }),
    /**
     * @name 项圣
     * @Date 2021-07-06 15:53:45
     * @introduction 计算容器要显示的class，用于区分ie和非ie的环境，ie下用js计算。
     * @description 详细描述
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    leftAreaClass () {
      if (!this.isIE) return 'not-ie'
      return `is-ie item-width-${this.calcItemCount}`
    },
    /**
     * @name 项圣
     * @Date 2020-09-17 19:27:00
     * @introduction 计算元素label宽度
     * @description 详细描述
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    minLabelWidth () {
      if (!isNaN(Number(this.labelWidth))) return Number(this.labelWidth)
      const isUnitPx = Number(this.labelWidth.replace('px', ''))
      if (!isNaN(isUnitPx)) return isUnitPx
      const isUnitEm = Number(this.labelWidth.replace('em', ''))
      if (!isNaN(isUnitEm)) return isUnitEm * 14
      // 不符合条件一律返回6em
      return 6 * 14
    },
    /**
     * @name 项圣
     * @Date 2020-09-17 19:27:00
     * @introduction 计算元素最小宽度（input 220px）
     * @description 详细描述
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    minItemWidth () {
      return this.minLabelWidth + 220
    },
    /**
     * @name 项圣
     * @Date 2020-09-17 19:45:07
     * @introduction 根据宽度计算一行内合适的项目个数
     * @description 根据宽度计算一行内合适的项目个数
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    calcItemCount () {
      const floor = Math.floor(this.wrapperWidth / this.minItemWidth)
      const restWidth = (this.wrapperWidth - this.minItemWidth * floor) / floor
      return restWidth > 40 ? floor + 1 : floor
    },
    /**
     * @name 项圣
     * @Date 2021-07-06 15:53:45
     * @introduction 计算容器的class，非ie使用的grid，要根据label-width计算元素的宽度
     * @description 详细描述
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    leftAreaStyle () {
      if (this.isIE) return ''
      const width = this.minLabelWidth + 190
      return `grid-template-columns: repeat(auto-fill, minmax(${width}px, 1fr));
        -ms-grid-template-columns: repeat(auto-fill, minmax(${width}px, 1fr));`
    },
    /**
     * @introduction 计算属性-表单外层高度的设置
     * @description 如果是非展开状态，高度以最低高度为准，否则以表单的高度为准
     * 最低高度+10是为了表单的最低高度比设置的最低高度大，导致会有一点偏移
     * @param 无参数
     * @return {返回类型说明}
     * @exception {违例类型} 违例类型说明
     */
    wrapperStyle () {
      if (!this.collapse) return {}
      return this.wrapperHeight > (this.dwHeight + 10)
        ? { height: `${Math.floor(this.wrapperHeight)}px` }
        : { height: `${this.dwHeight}px` }
    },
    /**
     * @introduction 计算属性-表单是否是展开状态
     * @description 通过判断表单是否展开的状态值，返回对应的class
     * @param 暂无参数
     * @return {String} 表单是否展开的class
     * @exception {违例类型} 违例类型说明
     */
    collapseClass () {
      return this.collapse && this.isCollapse ? '' : 'collapse'
    },
    /**
     * @introduction 计算属性-计算最低高度
     * @description 计算表单组件展示的最低高度
     * @param 无参数
     * @return {Number} 表单最低高度
     * @exception {违例类型} 违例类型说明
     */
    dwHeight () {
      // 最低高度 * 行数 + 底部间隔
      return Math.floor(wrapHeight[this.size]) * this.rowNum + 5
    }
  },
  methods: {
    /**
     * @introduction 表单展开按钮点击事件
     * @description 当点击表单展开按钮时，设置展开或关闭状态并重新设置高度，如果表单高度不够（只有一行），返回不做任何操作
     * @return {无}
     * @exception {违例类型} 违例类型说明
     */
    collapseOrNot () {
      this.isCollapse = !this.isCollapse
      const { clientHeight } = this.$refs.spform.$el
      this.wrapperHeight = this.isCollapse ? clientHeight : this.dwHeight
    },
    // 重置表单
    resetFields () {
      this.$refs.spform.resetFields()
    },
    /**
     * @name 项圣
     * @Date 2020-09-17 19:23:56
     * @introduction 容器改变大小后重新获取容器宽度
     * @description 容器改变大小后重新获取容器宽度
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    getWrapperSize () {
      // 设置宽度
      const { clientWidth } = this.$refs.leftArea
      this.wrapperWidth = clientWidth
      this.$nextTick(() => {
        const { clientHeight } = this.$refs.spform.$el
        this.showCollapseBtn = clientHeight >= (this.dwHeight + 10)
        this.wrapperHeight = this.isCollapse ? clientHeight : this.dwHeight
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.form-container
  width 100%
  // border 1px solid #E3E3E3
  border-radius 3px
  background-color #fff
  padding 14px 15px 0
  margin-bottom 16px
  position relative
/* 折叠面板 */
.form-wrapper
  overflow hidden
  transition height .3s ease

.flexform
  display flex
  align-items flex-end
.flexform.collapse
  align-items flex-start
.form-left-area
  flex 1
  width 100%
  display flex
  flex-wrap wrap
  overflow auto
.form-right-area
  flex-shrink 0
  margin-left 20px
  margin-right 22px
  >>> .el-form-item__content
    text-align right
/* 折叠按钮 */
.collapse-btn
  width 30px
  height 30px
  outline none
  cursor pointer
  border-left 1px solid #DCE0E2
  background-color #fff
  line-height 16px
  position absolute
  bottom 18px
  right 0
  &.collapse
    bottom calc(100% - 48px)
.sp-icon.collapse
  transform rotate(180deg)
// .collapse-btn.collapse .el-icon-caret-top
//   transform rotate(180deg)
.form-container >>> .el-form-item__content
  line-height  30px

.form-left-area
  >>> .el-form-item
    display flex
    align-items center
    .el-form-item__content
      flex 1
    &.range .el-form-item__content
      display flex
      .sp-line
        margin 0 5px
  // ie下的样式
  &.is-ie
    display flex
    flex-wrap wrap
    for count in 1...20
      &.item-width-{count}
        >>> .el-form-item
          width: "calc(100% / %s - 10px)" % count
  // 非ie下的样式
  &.not-ie
    display grid
    grid-template-columns repeat(auto-fill, minmax(190px, auto))
    -ms-grid-template-columns repeat(auto-fill, minmax(190px, auto))
    grid-gap 10px 10px
    -ms-grid-gap 10px 10px
    margin-bottom 10px
    >>> .el-form-item
      margin-bottom 5px
.form-container >>> .el-form-item__label
  line-height  30px
  font-size 14px
  color #515974
.form-container >>> .el-input__inner
   height 30px
   line-height 30px
// .form-container >>> .el-input
//   width 190px
.form-container
  >>> .el-input,
  >>> .el-select,
  >>> .el-autocomplete
    width 100%!important
.form-container >>> .el-checkbox,
.form-container >>> .el-radio
  vertical-align top
/* 基础样式重置 */
button, a, input, textarea
  outline none
  border none
  text-decoration none
button, a
  cursor pointer
</style>
