interface RateLimitConfig {
  interval: number;
  uniqueTokenPerInterval?: number;
}

export function rateLimit({ interval, uniqueTokenPerInterval = 500 }: RateLimitConfig) {
  const tokens = new Map();
  
  return {
    check: async (req: Request, limit: number, token: string) => {
      const now = Date.now();
      const windowStart = now - interval;
      
      const tokenCount = tokens.get(token) || [0];
      const [tokenTimestamp, count] = tokenCount;
      
      if (tokenTimestamp < windowStart) {
        tokens.set(token, [now, 1]);
        return Promise.resolve();
      }
      
      if (count > limit) {
        return Promise.reject(new Error('Rate limit exceeded'));
      }
      
      tokens.set(token, [tokenTimestamp, count + 1]);
      return Promise.resolve();
    }
  };
} 