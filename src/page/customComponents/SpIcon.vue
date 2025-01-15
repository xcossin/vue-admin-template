<template>
  <div class="page-container">
    <h3>SpIcon组件</h3>
    <p>在项目中引入svg文件后可以自动注册为全局SpIcon组件</p>
    <p>使用步骤如下：</p>
    <ul class="step-des">
      <li>1、在assets文件下新建icons文件夹，新建svg文件夹放置全部的svg文件</li>
      <li>2、在components下封装SpIcon组件</li>
      <li>3、在src下的plugins文件下新建icon.js，注册全局组件并自动引入所有的svg图标</li>
      <li>4、在vue.congig中注册svg图标</li>
      <li>5、在main.js文件中引入plugins下的icon，主要是自动引入所有的图标</li>
      <li>6、在组件内引入</li>
    </ul>
    <div>
      <sp-icon type="apple" color="#606881" fontSize="20"></sp-icon>
      <sp-icon type="bmfw" color="#606881" fontSize="18"></sp-icon>
      <sp-icon type="add" color="#606881" fontSize="30"></sp-icon>
      <sp-icon type="close" color="#606881" fontSize="50"></sp-icon>
      <sp-icon type="delete" color="#606881" fontSize="20"></sp-icon>
      <sp-icon type="weather-cloudy-new" color="#606881" fontSize="16"></sp-icon>
    </div>
    
  </div>
</template>

<script>

export default {

}
</script>

<style lang="stylus" scoped>

</style>
