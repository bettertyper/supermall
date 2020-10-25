<!-- 商品详情页轮播图 -->
<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    props: {
      topImages: {
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
  }
</script>

<style scoped>
  .detail-swiper{            /*类名不能取swiper，因为Swiper中给里面某个元素叫swiper类，且使用querySelector(.swiper)，其他地方再出现swiper类会出错*/
    height: 300px;          /*Swiper高度是根据图片确定的，但Detail中给轮播图的图片高度过高，所以直接把Swiper高度固定，截掉图片的下部分。小圆点是根据Swiper定位的，所以能跟着上来*/
    overflow: hidden;       /*这里不设置overflow:hidden下半部分也被隐藏了？？？*/
  }
</style>