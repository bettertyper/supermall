<!-- 店铺信息下方商品详细介绍 -->
<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div v-for="(item,index) in detailInfo.detailImage" :key="index">
      <div class="info-key">{{item.key}}</div>
      <div class="info-list">
        <img v-for="(imageItem, imageIndex) in item.list" :key="imageIndex" :src="imageItem" @load="imgLoad" alt="">        <!--也叫item和index好像和外层的不冲突，可能优先找最近的-->
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default(){
          return {};
        }
      }
    },
    data(){
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      //使用全部加载完成再发送方式：但是如果有的图片一直加载不出来，就一直不刷新，不太好，还是防抖比较好
                                                            //注意：GoodsListItem中监听图片加载完成的情况是每个GoodsListItem只有一张图片，所以不能用这里的方法，只能每张图片都发射事件，然后在Home中防抖
      /* imgLoad(){
        if(++this.counter === this.imagesLength){           //每有一张图片加载完成时counter++，若counter等于imagesLength则发射事件
          this.$emit('image-load');
        }
      }, */

      //使用防抖方式：
      imgLoad(){
        this.$emit('image-load');
      }
    },
    /* watch: {
      detailInfo(){                                         //监听detailInfo的变化，detailInfo初始是{}，当数据请求过来后，detailInfo变为有数据的对象，触发此函数将imagesLength值改为数据中图片的数量
        this.imagesLength = this.detailInfo.detailImage[0].list.length;
      }
    } */
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
