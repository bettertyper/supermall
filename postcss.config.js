module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['ignore'],          //字符串数组。可以给需要忽略的标签添加ignore类，也可以直接把它自己的类放进来
      minPixelValue: 1,
      mediaQuery: false,
      exclude: [/TabBarItem/]                 //正则表达式数组
    }
  }
}