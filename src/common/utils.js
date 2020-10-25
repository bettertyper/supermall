/**
* 防抖函数
*/
export function debounce(func, delay){
  let timer = null;
  return function(...args){
    if(timer)clearTimeout(timer);                                     //timer用到了闭包。if(timer)只在第一次时为false，之后都为true，因为只有第一次时timer=null，而之后每一次判断时的timer都是上一个定时器的编号，即一个正整数
    timer = setTimeout(() =>{
      func.apply(this, args);                                         //apply主要是为了把args数组分解，this也会改变，调用func函数时，func内部this应该被apply变为调用function(...args)函数的对象，(在Home.vue中上面由于是refresh()，即应该是window/undefined，但是实际调用func(此处即Scroll组件的refresh方法)时，this仍然指向Scroll组件，说明vue内部又进行了一次this指向改变，来保证组件methods中的方法总是指向该组件，所以apply是无法改变组件中methods方法中的this的？？？？？？？？？)       
    },delay);
  };
}


/**
 * 将Date实例格式化
 */
export function formatDate(date, fmt) {
  //获取年y：
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //获取月M、日d、时h(这里用的24小时制)、分m、秒s。扩展：实现12小时制，比如用H
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {                    //把str中字符的个数保持2位。例如：'5' -> '05'，'15' -> '15'
  return ('00' + str).substr(str.length);
};