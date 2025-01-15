<template>
  <svg
    aria-hidden="true"
    :class="`sp-icon ${this.className}`"
    :style="`color: ${this.color}; font-size: ${this.fontSize}`"
  >
    <use :xlink:href="this.iconName"></use>
  </svg>
</template>

<script>
const DEFAULT_SIZE = 'auto'

export default {
  name: 'sp-icon',

  props: {
    type: {
      type: String,
      required: true
    },

    fontSize: {
      type: [Number, String],
      default: DEFAULT_SIZE
    },

    color: {
      type: String,
      default: 'inherit'
    },

    className: {
      type: String,
      default: ''
    }
  },

  computed: {
    iconName () {
      return `#icon-${this.type}`
    },

    size () {
      if (typeof this.fontSize === 'number') {
        return `${this.fontSize}px`
      }
      if (typeof this.fontSize === 'string') {
        return this.fontSize
      }

      return DEFAULT_SIZE
    }
  }
}
</script>

<style lang="stylus" scoped>
/* font-icon */
.sp-icon
  width 1em
  height 1em
  vertical-align -0.15em
  fill currentColor
  overflow hidden
  color #000
  font-size 14px
  line-height 1
</style>
