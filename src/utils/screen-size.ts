// useScreenSize.ts
import { ref, onMounted, onUnmounted } from 'vue';

export enum Screen {
  Large,
  Medium,
  Small,
}
export const LargeWidth = 1440;

export function getScreenSize() {
  const currentScreenSize = ref<Screen>();

  const updateScreenSize = () => {
    const screenWidth = document.documentElement.clientWidth;
    // console.log("get size");
    // console.log(screenWidth);
    if (screenWidth >= 1440) {
      currentScreenSize.value = Screen.Large;
    } else if (screenWidth >= 834) {
      currentScreenSize.value = Screen.Medium;
    } else {
      currentScreenSize.value = Screen.Small;
    }
  };

  onMounted(() => {
    updateScreenSize(); // 初始设置
    window.addEventListener('resize', updateScreenSize); // 监听窗口大小变化
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize); // 清理监听器
  });

  return { currentScreenSize };
}
