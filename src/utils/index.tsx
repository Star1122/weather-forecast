export const isGoodDay = (condition: string, temp: number, humidity: number): boolean =>
  (
    condition === 'Sunny' &&
    temp >= 20 && temp <= 30 &&
    humidity >= 50 && humidity <= 70
  )