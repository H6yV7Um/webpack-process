const path = require("path");
module.exports = function (source) {
  if (path.basename(this.resourcePath) === "index.js") {
    // 注入加载代码
    return `require("normalize.css");
        if (process.env.NODE_ENV === "development") {
          console.log("development....")
        require("./index.pug");
    };` + source;
  }
  return source
}
