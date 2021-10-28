const HtmlWebpackPlugin = require('html-webpack-plugin');

const pluginName = "RemWebpackPlugin"

class RemWebpackPlugin {
    static defaultOptions = {
        root: 100,
        rootWidth: 750,
        maxWidth: 750
    };

    constructor(options = {}){
        this.options = {...RemWebpackPlugin.defaultOptions, ...options}
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
    `
    }

    apply(compiler){
        compiler.hooks.compilation.tap(pluginName, compilation => {
            let HtmlWebpackHooks = compilation.hooks.htmlWebpackPluginAfterHtmlProcessing;
            if(!HtmlWebpackHooks){
                HtmlWebpackHooks = HtmlWebpackPlugin.getHooks(compilation).beforeEmit;
            }
            HtmlWebpackHooks.tap(pluginName, (data, callback) => {
                data.html = data.html.replace(/<meta name="viewport".*>/, (str) => {
                    return str + this.remStr
                })
                callback && callback(null, data)
            })
        })
    }
}

module.exports = RemWebpackPlugin;