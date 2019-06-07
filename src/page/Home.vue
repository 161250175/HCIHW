<template>
<div class="home">
  <el-carousel :interval="4000"  height="200px" >
    <el-carousel-item v-for="(item,index) in imgList" :key="index">
      <img v-bind:src="item.url" width="100%" @click="linkTo(item)">
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
    export default {
        data() {
          return {
            imgList: [
              {url:require('@/assets/img/banner1.jpg')},
              {url:require('@/assets/img/banner2.jpg')},
              {url:require('@/assets/img/banner3.jpg')},
            ]
          }
        },
      methods: {
          linkTo(item) {

          }
      }
    }
</script>

<style scoped>
.home {
  width:100%;

}
.el-carousel {
  padding-top: 10px;
  //position: fixed;
}

</style>
