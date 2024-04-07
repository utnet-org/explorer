import i18n from '@/lang';
export const timeDifference = (dateString: string) => {
  const now = new Date();
  const pastDate = new Date(dateString);
  const difference = now.getTime() - pastDate.getTime();
  const minutes = Math.floor(difference / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);
  return `${minutes}分${seconds}秒前`;
};

export const updateTimeAgo = (seconds: number) => {
  const pastDate = new Date(new Date().getTime() - seconds * 1000); // 当前时间减去随机时间
  const now = new Date();

  const diff = now.getTime() - pastDate.getTime();
  const minutes = Math.floor(diff / 60000);
  const remainingSeconds = Math.floor((diff % 60000) / 1000);
  const m = i18n.global.t('home.minute_abbreviate');
  const s = i18n.global.t('home.second_abbreviate');
  // const ago = i18n.global.t('home.ago');

  return `${minutes}${m} ${remainingSeconds}${s}`;
};

export function getTimeDiffFromTimestamp(timestampStr: string): string {
  debugger;
  const timestamp = BigInt(timestampStr);
  const currentTime = BigInt(Date.now());
  const timeDiff = currentTime - timestamp;

  // 转换为秒
  const seconds = Math.floor(Number(timeDiff) / 1000);

  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} 分 ${remainingSeconds} 秒前`;
  } else {
    return '刚刚';
  }
}
