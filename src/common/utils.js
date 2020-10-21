/**
* 防抖函数
*/
export function debounce(func, delay){
  let timer = null;
  return function(...args){
    if(timer)clearTimeout(timer);                                     //if(timer)只在第一次时为false，之后都为true，因为只有第一次时timer=null，而之后每一次判断时的timer都是上一个定时器的编号，即一个正整数
    timer = setTimeout(() =>{
      func.apply(this, args);                                         //apply主要是为了把args数组分解，this也会改变，调用func函数时，func内部this应该被apply变为调用function(...args)函数的对象，(在Home.vue中上面由于是refresh()，即应该是window/undefined，但是实际调用func(此处即Scroll组件的refresh方法)时，this仍然指向Scroll组件，说明vue内部又进行了一次this指向改变，来保证组件methods中的方法总是指向该组件，所以apply是无法改变组件中methods方法中的this的？？？？？？？？？)       
    },delay);
  };
}