// knapsack.js

export const knapsack = (vehicles, capacity) => {
  const n = vehicles.length;

  const dp = Array(n + 1)
    .fill()
    .map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { hours, impact } = vehicles[i - 1];

    for (let w = 0; w <= capacity; w++) {
      if (hours <= w) {
        dp[i][w] = Math.max(
          impact + dp[i - 1][w - hours],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
};