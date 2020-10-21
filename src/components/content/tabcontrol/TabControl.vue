<!-- 中部选项卡 -->
<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      titles: {
        type: Array,
        default(){
          return [];
        }
      }
    },
    data(){
      return {
        currentIndex: 0
      };
    },
    methods: {
      itemClick(index){
        this.currentIndex = index;
        this.$emit('tab-click', index);
      }
    }
  };
</script>

<style scoped>
  .tab-control{
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
    text-align: center;
    font-size: 15px;
  }
  .tab-control-item span{
    padding: 5px;
  }

  /*下面两个选择器都是只有有active类的元素才生效*/
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>