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
            console.log('The compiler is starting a new compilation...')
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(pluginName, (data, callback) => {
                data.html = data.html.replace(/<head>/ig, (str) => str + this.remStr)
                callback(null, data)
            })
        })
    }
}

module.exports = RemWebpackPlugin;