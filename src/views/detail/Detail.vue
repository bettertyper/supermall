<!-- 详情页 -->
<template>
  <div id="detail">
    <detail-nav-bar @title-click="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="detail-wrapper" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @image-load="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backtop/BackTop'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {debounce} from 'common/utils'
  import {itemListenerMixin} from 'common/mixin'

  export default {
    name: 'Detail',
    mixins: [itemListenerMixin],
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},                  
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        // itemImageListener: null
        themeTopYs: [],
        getThemeTopYs: null,
        currentIndex: 0,
        isShowBackTop: false
      };
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop
    },
    created(){
      this.iid = this.$route.params.iid;            //由于每次从Home点击不同的商品跳转到Detail时，都要根据新的this.iid来请求新的数据，而更新this.iid和请求数据都是在created中的，所以不应该缓存(也可以缓存后在activated中更新this.iid和请求数据，但每次改变的数据太多，不要缓存使用created就行了)
      getDetail(this.iid).then(res => {             
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        this.shop = new Shop(data.shopInfo);
        this.detailInfo = data.detailInfo;
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        if(data.rate.cRate !== 0){                //cRate是评论总数，有的商品没有评论
          this.commentInfo = data.rate.list[0];
        }
      });
      getRecommend().then(res => {
        this.recommends = res.data.list;
      });
      this.getThemeTopYs = debounce(() => {       //对给themeTopYs赋值的操作进行防抖
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);   //为了能够使用下面第二种for循环，所以再添加一个大值：Number.MAX_VALUE是js中的最大数值
        // console.log(this.themeTopYs);
      }, 50);
    },
    mounted(){
      // const refresh = debounce(this.$refs.scroll.refresh, 50);
      // this.itemImageListener = () => {
      //   refresh();
      // };
      // this.$bus.$on('itemImageLoad', this.itemImageListener);
    },
    destroyed(){
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    methods: {
      imageLoad(){
        //this.$refs.scroll.refresh();                这里由于DetailGoodsInfo中进行了判断，只有最后加载完成的图片加载完成后才发射事件，所以不需要再使用防抖
        this.refresh();

        this.getThemeTopYs();
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
      },
      contentScroll(position){
        const pY = -position.y;
        const length = this.themeTopYs.length;
        /* for(let i = 0; i < length; i++){
          if(this.currentIndex !== i && ((i < length - 1 && pY >= this.themeTopYs[i] && pY < this.themeTopYs[i + 1]) || (i === length-1 && pY >= this.themeTopYs[i]))){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        } */
        for(let i = 0; i < length - 1; i++){        //最后一个元素是Number.MAX_VALUE，我们不遍历到它
          if(this.currentIndex !== i && (pY >= this.themeTopYs[i] && pY < this.themeTopYs[i + 1])){         //currentIndex的作用就是if中第一个判断，防止if里面语句频繁执行
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }

        this.isShowBackTop = position.y < -1000
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0);
      },
      addToCart(){
        console.log('haha')
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
      }
    }
  };
</script>

<style scoped>
  #detail{
                                          /*为了盖住TabBar*/
    position: relative;
    z-index: 99999;
    background-color: #fff;
  }
  .detail-wrapper{
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>