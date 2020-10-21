<!-- 可以使内部滚动 -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: null                                        //其他组件可能要拿到Scroll组件，来调用BScroll实例的一些方法，所以应该把BScroll实例保存起来
      };
    },
    mounted(){                                              //注意：mounted钩子中才把组件对象挂载到对应的模板上，这时才可以访问到模板中的DOM元素
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', (position) => {              //注意：用箭头函数，保证this为Scroll组件
          this.$emit('scroll', position);
        });
      }
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          // console.log('上拉加载');
          this.$emit('pulling-up');
        });
      }
    },
    methods: {
      scrollTo(x, y, time=500){                             
        this.scroll && this.scroll.scrollTo(x, y, time);                    //由于创建BScroll实例并赋值给this.scroll是在mounted函数中执行的，所以有些时候访问this.scroll很可能还是初始值null
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp();
      },
      refresh(){
        // console.log('刷新');
        this.scroll && this.scroll.refresh();
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0                               // BScroll实例.y ：当前滚动的y轴位置
      }
    }
  };
</script>

<style scoped>
  
</style>