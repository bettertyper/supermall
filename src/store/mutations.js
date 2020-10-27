import {ADD_COUNTER, ADD_TO_CART} from './mutations-types'

export default {
  //mutations中的方法应该简单，像下面在同一个方法中既能count++，又能把商品添加到cartList显然是复杂的，在devtools中这两个操作跟踪的是同一个方法，很不方便
  //复杂的逻辑应该放到actions中，简单的操作放到mutations中，然后在actions中提交mutaions。actions也可以执行同步操作
  /* addCart(state, payload){
    let oldProduct = null;
    for(let item of state.cartList){
      if(item.iid === payload.iid){
        oldProduct = item;          //注意：不能把payload赋给oldProduct，因为payload是新的对象，并不是数组中的那么item
      }
    }
    if(oldProduct){
      oldProduct.count += 1;        //不会出现undefined + 1的情况，因为能进入if说明必然进过else，即if中的count最小也是1
    }else{                          //for循环遍历完，oldProduct仍为null，说明数组中没有iid相同的
      payload.count = 1;            //为新商品添加属性count，并赋值为1
      state.cartList.push(payload); //将新商品push到数组中
    }
  } */

  [ADD_COUNTER](state, payload){
    payload.count++;
  },
  [ADD_TO_CART](state, payload){
    state.cartList.push(payload);
  }
}