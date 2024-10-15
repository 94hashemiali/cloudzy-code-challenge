import {defineConfig} from "vite";
import postcssRTLCSS from "postcss-rtlcss";

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            postcssRTLCSS({})
          ]
        }
      }
    }
  }
})
