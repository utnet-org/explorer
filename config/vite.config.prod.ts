import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';
import configCompressPlugin from './plugin/compress';

export default mergeConfig(
  {
    mode: 'production',
    // plugins: [
    //   configCompressPlugin('gzip'),
    // ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // arco: ['@arco-design/web-vue'],
            // chart: ['echarts', 'vue-echarts'],
            chart: ['echarts'],
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  },
  baseConfig
);
