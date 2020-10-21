<!-- 整个轮播图 -->
<template>
  <swiper>
    <swiper-item v-for="(item,index) in banner" :key="index">           <!--key尽量用string/number，用其他例如：对象，报警告-->
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
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
    data(){
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad(){
        if(!this.isLoad){                       //只要发出第一次就行了，因为只是需要有图片能撑起来轮播图的高度
          this.$emit('swiper-image-load');
          this.isLoad = true;
        }
      }
    }
  };
</script>

<style scoped>
  
</style>