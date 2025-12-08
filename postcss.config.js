// 项目根目录/postcss.config.js
export default {
  plugins: {
    // 1. 自动添加浏览器前缀（autoprefixer）
    autoprefixer: {
      // 配置需要兼容的浏览器（可选，默认使用 package.json 中的 browserslist）
      overrideBrowserslist: [
        'last 2 versions', // 兼容每个浏览器的最新两个版本
        '> 1%', // 覆盖全球使用率 >1% 的浏览器
        'iOS >= 10', // 兼容 iOS 10 及以上
        'Android >= 6', // 兼容 Android 6 及以上
      ],
    },

    // 2. px 转 vw 适配（postcss-px-to-viewport）
    'postcss-px-to-viewport': {
      viewportWidth: 1920, // 设计稿宽度（如手机设计稿通常为 375px 或 750px）
      viewportHeight: 1080, // 设计稿高度（可选，一般不影响）
      unitPrecision: 3, // 转换后的 vw 保留 3 位小数
      viewportUnit: 'vw', // 转换的目标单位（vw 最常用）
      selectorBlackList: ['.ignore', '.hairlines'], // 不转换的类名（如忽略 .ignore 类下的 px）
      minPixelValue: 1, // 小于 1px 的值不转换
      mediaQuery: false, // 不处理媒体查询中的 px
      exclude: [/node_modules/], // 排除 node_modules 目录（避免第三方组件被转换）
      // 针对不同文件设置不同 viewportWidth（可选，如 UI 组件库）
      // landscape: false, // 是否处理横屏
      // landscapeUnit: 'vw', // 横屏时的单位
      // landscapeWidth: 667 // 横屏时的视口宽度
    },
  },
}
