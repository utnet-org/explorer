import { createI18n } from 'vue-i18n'; // 导入 vue-i18n

// import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
// import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'; // element-ui lang
import enLocale from './en'; // 导入项目中用到的英文语言包
import zhLocale from './zh'; // 导入项目中用到的中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';

const messages = {
  en: {
    ...en,
    ...enLocale,
    // ...elementEnLocale,
  },
  zh: {
    ...zhCn,
    ...zhLocale,
    // ...elementZhLocale,
  },
};

const language = (navigator.language || 'en').toLocaleLowerCase(); // 这是获取浏览器的语言

document
  .querySelector('html')!
  .setAttribute(
    'lang',
    localStorage.getItem('language') || language.split('-')[0] || 'en',
  );

const i18n = createI18n({
  // locale: localStorage.getItem('language') || 'en', // 设置语种
  locale: 'en', // 设置语种
  messages, // 设置全局当地语言包,
  fallbackLocale: 'en',
  numberFormats: {
    //设置 数字本地化
    en: {
      currency: {
        //添加 $
        style: 'currency',
        currency: 'USD',
      },
    },
    zh: {
      currency: {
        //添加 ￥
        style: 'currency',
        currency: 'JPY',
        currencyDisplay: 'symbol',
      },
    },
  },
  dateTimeFormats: {
    //设置 日期时间本地化
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    zh: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
  },
});

export default i18n;
