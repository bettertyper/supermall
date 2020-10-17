<!-- 整个轮播图 -->
<template>
  <swiper>
    <swiper-item v-for="(item,index) in banner" :key="index">           <!--key尽量用string/number，用其他例如：对象，报警告-->
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper/index'
  export default {
    props: {
      banner: {
        type: Array,
        default(){
          return [];
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  };
</script>

<style>
  
</style>