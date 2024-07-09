import Big from 'big.js';

/**
 * 将字符串解析为大整数，并将其除以 10 的 power 次方。
 * @param num - 要解析的数字
 * @param power - 10 的次方数
 * @param decimalPlaces - 保留的小数位数
 * @returns 计算结果
 * @throws 如果 numStr 不是有效的数字字符串
 */
export function DivBigPowerOfTen(
  num: number,
  power: number,
  decimalPlaces?: number | undefined,
): number {
  try {
    const bigNum = new Big(num);

    const powerOfTen = new Big(10).pow(power);

    const result = bigNum.div(powerOfTen);

    if (decimalPlaces != undefined) {
      // DecimalPlaces
      const roundedResult = result.round(decimalPlaces);
      return parseFloat(roundedResult.toString());
    }
    return parseFloat(result.toString());
  } catch (error) {
    throw new Error(`Invalid number: ${num}`);
  }
}

export function DivBigPowerStrOfTen(
  numStr: string,
  power: number,
  decimalPlaces?: number | undefined,
): number {
  try {
    const num = new Big(numStr);

    const powerOfTen = new Big(10).pow(power);

    const result = num.div(powerOfTen);

    if (decimalPlaces != undefined) {
      // DecimalPlaces
      const roundedResult = result.round(decimalPlaces);
      return parseFloat(roundedResult.toString());
    }
    return parseFloat(result.toString());
  } catch (error) {
    throw new Error(`Invalid number string: ${numStr}`);
  }
}

// Ex
try {
  const result = DivBigPowerStrOfTen('12345678901234567890', 10, 2);
  console.log(result); // 输出保留2位小数的结果
} catch (error) {
  console.error(error);
}
