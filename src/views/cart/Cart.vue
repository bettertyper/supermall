<!-- 购物车页 -->
<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartListLength}})</div>
    </nav-bar>
    <scroll class="cart-wrapper" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      CartList,
      CartBottomBar,
      NavBar,
      Scroll
    },
    computed: {
      ...mapGetters(['cartListLength'])
    },
    activated(){
      this.$refs.scroll.refresh();          //添加商品后better-scroll的计算高度并没有变，所以每次切换到cart应该先刷新
    }
  };
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  .cart-wrapper{
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>