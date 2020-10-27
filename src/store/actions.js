import {ADD_COUNTER, ADD_TO_CART} from './mutations-types'

export default {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      let oldProduct = null;
      for(let item of context.state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item;
        }
      }
      if(oldProduct){
        context.commit(ADD_COUNTER, oldProduct);      //注意：commit是同步操作，就是在调用ADD_COUNTER，然后才会执行下面的resolve
        resolve('当前商品数量加1');                     
      }else{
        payload.count = 1;
        payload.checked = true;                       //添加到购物车时默认按钮选中
        context.commit(ADD_TO_CART, payload);
        resolve('添加了一个新商品');
      }
    });
  }
}