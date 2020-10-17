<!-- 主页 -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>       <!--外面的视图组件应该简洁，所以应该把Swiper和SwiperItem再封装到一起-->
    <recommend-view :recommend="recommend"></recommend-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import {getHomeMultidata} from 'network/home'
  export default {
      components: {
        NavBar,
        HomeSwiper,
        RecommendView
      },
      data(){
        return {
          banner: [],
          recommend: []
        };
      },
      created(){
        getHomeMultidata().then(res => {                //对request又进行封装，使url相关内容不要和vue混在一起
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        });
      }
  };
</script>

<style>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>