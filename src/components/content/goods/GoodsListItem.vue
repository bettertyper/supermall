<!-- 商品列表中的商品 -->
<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">          <!--绑定load事件，监听每张图片是否加载完成-->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      goodsItem: {
        type: Object,
        default(){
          return {};
        }
      }
    },
    computed: {
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img;      //Home和Detail都用到GoodsListItem，但是二者图片保存的位置不一样。注意：顺序不能换，因为如果show.img先判断的话，如果没有show属性却show.img肯定报错
      }
    },
    methods: {
      imageLoad(){
        //确保Home和Detail中不会监听到对方的GoodsListItem中的图片加载完成

        //方案1：
        /* if(this.$route.path.indexOf('/home') !== -1){
          this.$bus.$emit('homeItemImageLoad');                 //Home中绑定此事件的监听
        }else if(this.$route.path.indexOf('/detail') !== -1){
          this.$bus.$emit('detailItemImageLoad');               //Detail中绑定此事件的监听
        } */
        
        //方案2：
        //Home和detail中仍监听同一个事件，在Home的deactivated函数与Detail的destroyed函数中解绑该事件监听
        this.$bus.$emit('itemImageLoad');                       //向事件总线发射itemImageLoad事件

      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid);     //点击某个商品后，进行路由跳转，并携带商品的iid
      }
    }
  };
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }
</style>