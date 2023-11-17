// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'
//
// // https://vitejs.dev/config/
// export default defineConfig({
//
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, './src')
//     },
//     //extensions: [".ts", ".js", ".vue", ".json", ".mjs"],
//     extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
//   },
//   server: {
//     https: false, // 是否开启 https
//     open: false, // 是否自动在浏览器打开
//     cors: true, // 允许跨域  8月更新
//     port: 3000, // 端口号
//     host: "127.0.0.1",
//     proxy: {
//       "/api": {
//         target: "", // 后台接口
//         changeOrigin: true,
//         secure: false, // 如果是https接口，需要配置这个参数
//         // ws: true, //websocket支持
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
//   // 引入第三方的配置
//   optimizeDeps: {
//     include: [],
//   },
// })
