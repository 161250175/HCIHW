<template>
  <el-container>
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
  </el-container>
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

</style>
