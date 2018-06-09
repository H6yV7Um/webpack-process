# DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead

- 条件1：使用webpack4.x
- 条件2：使用extract-text-webpack-plugin插件

## 解决办法：
将 extract-text-webpack-plugin 换成 [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)