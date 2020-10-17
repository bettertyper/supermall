<!-- 推荐菜单栏 -->
<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommend" :key="index">
      <a href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      recommend: {
        type: Array,
        default(){
          return [];
        }
      }
    }
  };
</script>

<style>
  .recommend{
    display: flex;
    padding: 10px 0 20px 0;
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .recommend-item img{
    width: 65px;
    vertical-align: middle;
    margin-bottom: 10px;
  }
</style>