const HtmlWebpackPlugin = require("../virgoui/node_modules/html-webpack-plugin");

const pluginName = "RemWebpackPlugin";

class RemWebpackPlugin {
  static defaultOptions = {
    root: 100,
    rootWidth: 750,
    maxWidth: 750,
  };

  constructor(options = {}) {
    this.options = { ...RemWebpackPlugin.defaultOptions, ...options };
    this.remStr = `
    <script>
        (function () {
        function setRem() {
            var rootFontSize = ${this.options.root};
            var rootClientWidth = ${this.options.rootWidth};
            var ratio = rootClientWidth / rootFontSize;
            var clientWidth = window.document.documentElement.clientWidth;
            console.log(clientWidth)
            clientWidth = clientWidth < ${this.options.maxWidth} ? clientWidth : ${this.options.maxWidth};

            document.documentElement.style.fontSize = clientWidth / ratio + "px";

            
        }

        setRem();

        window.addEventListener("resize", setRem);
        })();
    </script>
    `;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      let HtmlWebpackHooksTap =
        compilation.hooks &&
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing;

      if (!HtmlWebpackHooksTap) {
        HtmlWebpackHooksTap =
          HtmlWebpackPlugin.getHooks(compilation).beforeEmit;
      }

      HtmlWebpackHooksTap.tap(pluginName, (data, callback) => {
        data.html = data.html.replace(/\r\n/g, "").replace(
          /<meta.+name="viewport".+\/>/gi,
          (str) => str + this.remStr
        );
        callback && callback(null, data);
      });
    });
  }
}

module.exports = RemWebpackPlugin;
