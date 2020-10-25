<!-- 主页 -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="fixed" :titles="['流行','新款','精选']" @tab-click="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="home-wrapper" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pulling-up="loadMore">
                                                            <!--像Home这样大的组件应该注重的是整体结构划分，而每一部分的细节应该封装在每一部分内部-->
      <home-swiper :banner="banner" @swiper-image-load="swiperImageLoad"></home-swiper>       
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tab-click="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
    <ul>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
    </ul>
  </div>
</template>

<script>
  /*导入、数据等，都应该分类*/
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'
  
  import {getHomeMultidata,getHomeGoods} from 'network/home'
  //import {debounce} from 'common/utils'
  import {itemListenerMixin} from 'common/mixin'

  export default {
      name: 'Home',                                   //组件name的作用：1、keep-alive那里缓存的排除或包括。2、devtools里如果该组件没有注册，则显示它的name，否则显示Anonymous Component
      mixins: [itemListenerMixin],                    //使用混入：mixins: [混入对象1、混入对象2、...]
      components: {
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
      },
      data(){
        return {
          banner: [],
          recommend: [],
          goods: {
            pop: {page: 0, list: []},
            new: {page: 0, list: []},
            sell: {page: 0, list: []}
          },
          currentType: 'pop',
          isShowBackTop: false,
          tabOffsetTop: 0,
          isTabFixed: false,
          saveY: 0,
          // itemImageListener: null
        };
      },
      computed: {
        showGoods(){
          return this.goods[this.currentType].list;
        }
      },
      activated(){
        this.$refs.scroll.scrollTo(0, this.saveY, 0);                 //注意：有时候返回首页可能图片还未加载完成，这样还会出问题
        this.$refs.scroll.refresh();                                  //有时会发生返回首页无法滚动的问题，先刷新
      },
      deactivated(){                                                  //注意：这里必须用activated和deactivated，而不能用created和destroyed，因为每次created时都是新的saveY，即初始值0。无法实现把上一次的saveY值保存下来
        this.saveY = this.$refs.scroll.getScrollY();
        this.$bus.$off('itemImageLoad', this.itemImageListener);      //解绑事件监听。离开Home就解绑
      },
      created(){                                                      //生命周期函数中应该注重逻辑，而不应该把大量的函数实现放到其中，函数实现尽量放到methods中
        this.getHomeMultidata();
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
      },
      //Home和Detail中都使用了下面3条语句，可以使用混入
      /* mounted(){
        const refresh = debounce(this.$refs.scroll.refresh, 50)            
        this.itemImageListener = () => {                                    //为了可以解绑，所以抽出来
          //this.$refs.scroll && this.$refs.scroll.refresh();                 有时候该回调执行时this.$refs.scroll = undefined？？？？？？？
          refresh();                                                        //因为闭包，所以可以使用refresh。不能直接debounce(this.$refs.scroll.refresh, 50)()，因为debounce只应该执行一次，保证是同一个timer，而进行多次调用的是它的返回值
        };
        this.$bus.$on('itemImageLoad', this.itemImageListener);
      }, */
      methods: {
        /**
         * 事件监听相关的方法
         */
        tabClick(index){                                      //tabControl1和tabControl2都可以触发此函数
          switch(index){
            case 0: 
              this.currentType = 'pop';
              break;
            case 1:
              this.currentType = 'new';
              break;
            case 2:
              this.currentType = 'sell';
              break;
          }
          this.$refs.tabControl1.currentIndex = index;        //保证点tabControl2后，tabControl1能跟着改变
          this.$refs.tabControl2.currentIndex = index;        //保证点tabControl1后，tabControl2能跟着改变
          /* if(this.isTabFixed){                             //实现比如浏览了很多'流行'商品后，点击'新款'后可以直接返回'新款'的第一个商品处。不过一般不需要这个功能
            this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 0);
          } */
        },
        backClick(){
          // this.$refs.scroll.scroll.scrollTo(0, 0, 500);     这样做又对better-scroll产生了依赖，应该使用下面的做法
          this.$refs.scroll.scrollTo(0, 0);                   //把返回顶部的具体操作封装到Scroll组件的methods中，直接调用这个方法即可
        },
        contentScroll(position){
          this.isShowBackTop = position.y < -1000;            //决定backTop是否显示
          this.isTabFixed = position.y < -this.tabOffsetTop   //决定scroll外的tabControl1是否显示
        },
        loadMore(){
          this.getHomeGoods(this.currentType);
        },
        swiperImageLoad(){                                                //应该在tabControl上面的所有图片加载完成后，再获取offsetTop的值，保证图片位置的高度正确。这里只判断轮播图加载完成，所以有时候会有bug就是RecommentView或FeatureView中的图片此时还没加载出来，所以此时得到的offsetTop还不是正确的
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;        //offsetTop 得到的是tabControl到content顶部的距离，这个距离在滚动过程中是不变的，我们准备拿滚动的坐标和这个值进行比较
                                                                           // 组件.$el 可以得到组件模板中最外层的DOM
        },

        /**
         * 网络请求相关的方法
         */
        getHomeMultidata(){
          getHomeMultidata().then(res => {                    //对request又进行封装，使url相关内容不要和vue混在一起
            this.banner = res.data.banner.list;
            this.recommend = res.data.recommend.list;
          });
        },
        getHomeGoods(type){
          const page = this.goods[type].page + 1;             //每次调用都将该type的page属性值加1赋给page变量
          getHomeGoods(type, page).then(res => {
            this.goods[type].list.push(...res.data.list);     //将新请求的数据添加到该type的list数组尾
            this.goods[type].page += 1;                       //更新该type的page属性值
            this.$refs.scroll.finishPullUp();                 //激活下一次上拉加载更多
          });
        }
      }
  };
</script>

<style scoped>
  /* #home{
    padding-top: 44px;                          //nav不fixed定位了，所以不需要这个上内边距帮它占位置了(这个padding和nav的fixed定位都是不用better-scroll时才需要设置的)
  } */
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;                         //由于下面区域使用了better-scroll，所以下面区域的滚动不会把nav顶上去，nav不再需要固定定位
    left: 0;
    right: 0;
    top: 0;
    z-index: 999; */
  }
  .home-wrapper{
    height: calc(100vh - 93px);                 /*或者用绝对定位，top:44px，bottom:49px就把wrapper位置固定且拉开了，但是#home要固定高度height:100vh，否则就会因为scroll的脱标而收缩*/
    overflow: hidden;
  }
  .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    z-index: 999;                               /*设置层级的原因：为什么wrapper会把.fixed压住，wrapper又没设置定位，轮播图设置了，压住可以理解，为什么轮播图下面的也能压住？？？？？？？？*/
  }
</style>