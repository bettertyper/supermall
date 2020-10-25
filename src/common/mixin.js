import {debounce} from './utils'

//当多个组件想复用代码，可以使用混入。只是单纯代码的复用，里面的变量并不是各组件共享的，每个组件都是独立的
export const itemListenerMixin = {    //创建混入对象
  data(){                             //会把这些属性混入到使用了itemListenerMixin的组件的data中
    return {
      itemImageListener: null,
      refresh: null                   //因为Detail的methods中imageLoad也要使用debounce(this.$refs.scroll.refresh, 50)，所以直接保存在这里
    };
  },
  mounted(){                          //会把下面这些代码混入到使用了itemListenerMixin的组件的mounted函数中
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImageListener = () => {  
      this.refresh();                  //这样refresh就不是闭包了，因为this.refresh是组件data中的数据，并不是mounted函数的局部变量，但是都可以实现对debounce函数返回值的保存            
    };
    this.$bus.$on('itemImageLoad', this.itemImageListener);
  }
}


//混入组件：
// import BackTop from 'components/content/backtop/BackTop'
// export const backTopMixin = {
//   data(){
//     return {
//       isShowBackTop: false
//     };
//   },
//   components: {
//     BackTop
//   },
//   methods: {
//     backClick(){
//       this.$refs.scroll.scrollTo(0, 0);
//     },
//     /* contentScroll(position){                        注意：methods中的方法和生命周期函数混入时不一样，这儿的生命周期函数会和组件中的进行合并；而这儿的methods方法会和组件中的同名methods方法覆盖
//       this.isShowBackTop = position.y < -1000;
//     } */
//   }
// }