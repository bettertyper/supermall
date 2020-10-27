<!-- 购物车列表 -->
<template>
  <div class="cart-lsit">
    <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"></cart-list-item>
  </div>
</template>

<script>
  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      CartListItem
    }
  }
</script>

<style scoped>
  
</style>