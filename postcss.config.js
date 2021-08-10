module.exports = {
  plugins: {
    autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 1920, // UI设计稿的宽度
      viewportHeight: 1080, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'rem', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'rem', // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类名
      minPixelValue: 3, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      // include: /Test.vue/, // 如果设置了include，那将只有匹配到的文件才会被转换
      landscape: false, // 是否处理横屏情况
      landscapeUnit: 'vw', // 横屏时使用的单位
      landscapeWidth: 750 // 横屏时使用的视口宽度
    }
  }
}
/**
 * 注意：
 * style标签内嵌CSS样式不会发生转换
 * el-dialog的宽需要使用百分比，如 width="50%"
* */
