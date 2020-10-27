<!-- 购物车底部结算栏 -->
<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkbutton/CheckButton'

  export default {
    components: {
      CheckButton
    },
    computed: {
      totalPrice(){
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked;
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count;          //price是字符串，count是数值，相乘变数值
        }, 0).toFixed(2);
      },
      checkLength(){
        return this.$store.state.cartList.filter(item => item.checked).length;
      },
      isSelectAll(){
        if(this.$store.state.cartList.length === 0)return false;


        //return !(this.$store.state.cartList.filter(item => !item.checked).length);          没选中的商品个数不为0，则返回false；为0，则返回true。找到不选中的后还需要遍历整个数组，性能较低
        return !this.$store.state.cartList.find(item => !item.checked);                       //只要找到没选中的商品，就返回false；没找到，则返回true
      }
    },
    methods: {
      checkClick(){
        if(this.isSelectAll){                   //如果已经全选，则每个商品都变为不选中
          this.$store.state.cartList.forEach(item => item.checked = false);
        }else{                                  //如果不是全选，则每个商品都变为选中
          this.$store.state.cartList.forEach(item => item.checked = true);
        }
      },
      calcClick(){
        if(!this.checkLength){
          this.$toast.show('请选择要购买的商品');
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;
    display: flex;
    font-size: 14px;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-right: 5px;
  }
  .price{
    margin-left: 30px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    color: #fff;
    background-color: red;
    text-align: center;
  }
</style>