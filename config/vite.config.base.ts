import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [vue(), svgLoader({ svgoConfig: {} })],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    // extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    extensions: ['.ts', '.js'],
  },
  define: {
    'process.env': {},
  },
  server: {
    https: false, // 是否开启 https
    open: false, // 是否自动在浏览器打开
    cors: true, // 允许跨域  8月更新
    host: '0.0.0.0',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/style/global.scss";
        @import "@/assets/style/common.scss";
        @import "@/assets/style/font.scss";
        @import "@/assets/style/btn.scss";
        @import "@/assets/style/line.scss";
        `,
        javascriptEnabled: true,
      },
    },
  },
});
