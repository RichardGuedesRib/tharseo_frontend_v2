export function getAssetColor(symbol: string): string {
  switch (symbol) {
    case "BTCUSDT":
      return "#F7931A";
    case "ETHUSDT":
      return "#6B7280";
    case "SOLUSDT":
      return "#B445EE";
    case "BNBUSDT":
      return "#F0B90B";
    case "USDT":
      return "#50AF95";
    default:
      return "#E4E4E7";
  }
}
