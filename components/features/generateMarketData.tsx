export const generateMarketData = (
  basePrice: number,
  range: number = 10,
  pointCount: number = 10
) => {
  return Array.from({ length: pointCount }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (pointCount - i - 1) * 3);
    return {
      date: date.toISOString().split("T")[0],
      price: basePrice + Math.random() * range - range / 2,
    };
  });
};
