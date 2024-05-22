import i18n from '@/lang';

export function CompareTimestampNano(timestamp: number): string {
  const currentTime = Math.floor(Date.now() / 1000); // 当前时间戳（秒）
  const difference = Math.floor(currentTime - timestamp / 1e9); // 将纳秒转换为秒，并计算时间差
  const s = i18n.global.t('home.second_abbreviate');
  const m = i18n.global.t('home.minute_abbreviate');
  const h = i18n.global.t('home.hour_abbreviate');
  const d = i18n.global.t('home.day_abbreviate');
  if (difference >= 86400) {
    // 大于 24 小时
    const days = Math.floor(difference / 86400);
    const hours = Math.floor((difference % 86400) / 3600);
    return `${days} ${d} ${hours} ${h}`;
  } else if (difference >= 3600) {
    // 大于 60 分钟
    const hours = Math.floor(difference / 3600);
    const minutes = Math.floor((difference % 3600) / 60);
    return `${hours} ${h} ${minutes} ${m}`;
  } else if (difference >= 60) {
    // 大于 60 秒
    const minutes = Math.floor(difference / 60);
    const seconds = difference % 60;
    return `${minutes} ${m} ${seconds} ${s}`;
  } else {
    return '刚刚';
  }
}

export function CompareStrTimeNano(timestampStr: string): string {
  const timestamp = Number(timestampStr);
  return CompareTimestampNano(timestamp);
}
