import Toast from './Toast'

/*Vue.use(xxx)时会调用xxx的install方法，并向该方法中传入Vue*/

const obj = {};

obj.install = function(Vue){
  //创建组件构造器
  const toastConstructor = Vue.extend(Toast); 
  

  //使用new的方式创建组件对象
  const toast = new toastConstructor();           //created                
  //将组件对象手动挂载到某一个元素上(即指定el，内部会根据template创建新元素立马替换掉el)
  toast.$mount(document.createElement('div'));    //mounted


  //将组件模板中的元素插入到body元素尾
  document.body.appendChild(toast.$el);                       
  //在Vue原型上创建一个属性指向该组件对象，就可以在其他组件中直接this.$toast拿到这个组件对象
  Vue.prototype.$toast = toast;                               
}

export default obj
