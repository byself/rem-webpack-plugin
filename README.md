

<div align="center">
<a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Rem Webpack Plugin</h1>

![NPM](https://img.shields.io/npm/v/rem-webpack-plugin)
 ![NPM](https://img.shields.io/badge/License-MIT-yellow.svg)

  <p>一款向html中插入rem自适应脚本的插件</p>
</div>

<h2 align="center">Install</h2>

```bash
  npm i --save-dev rem-webpack-plugin
```

```bash
  yarn add --dev rem-webpack-plugin
```

该插件依赖`html-webpack-plugin`。如未安装，请按照如下方式安装：
```bash
  npm i --save-dev html-webpack-plugin
```

```bash
  yarn add --dev html-webpack-plugin
```

<h2 align="center">Usage</h2>

**webpack.config.js**
```js
const RemWebpackPlugin = require('rem-webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  plugins: [
    new RemWebpackPlugin()
  ]
}

// width options
module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  plugins: [
    new RemWebpackPlugin({
        root: 50,
        rootWidth: 375,
        maxWidth: 600
    })
  ]
}
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`root`**|Number|100|如果使用了px2rem等类似的插件，请保持root配置一致|
|**`rootWidth`**|Number|750|页面基础宽度|
|**`maxWidth`**|Number|750|最大宽度，超过最大宽度时根节点的`fontsize`值不变|