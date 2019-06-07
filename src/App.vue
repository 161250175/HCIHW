<template>
  <div class="main">
    <el-header >
      <!--头部组件渲染-->
      <header-ly></header-ly>
    </el-header>
    <el-container >
      <router-view/>
      <!--transition name="el-zoom-in-center">
        <router-view/>
      </transition-->
    </el-container>

    <el-footer>
      <footer-ly></footer-ly>
    </el-footer>
  </div>
</template>

<script>
  import HeaderLy from '@/components/Header'
  import FooterLy from '@/components/Footer'
  export default {
    name: 'App',
    components: {
      HeaderLy,
      FooterLy
    }
  }
</script>

<style>
  body {
  //width:100%;
  margin-left: 0px;
    margin-right: 0px;
}
  .el-footer {
    padding-left: 0px;
    padding-right: 0px;
  }
  body {
    background: #f7f7f7;
  }
</style>
