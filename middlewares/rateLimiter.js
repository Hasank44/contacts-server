import rateLimit from "express-rate-limit";

export const rateLimiter = (max = 5, minutes = 1, useUserId = false) => {
  return rateLimit({
    windowMs: minutes * 60 * 1000,
    max,
    keyGenerator: req => {
      const identifier =
        useUserId && req.user?._id ? `user:${req.user._id}` : `ip:${req.ip}`;
      return `${identifier}:${req.baseUrl}${req.path}`;
    },
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: `Too many requests. Try again after ${minutes} minute(s).`,
    },
  });
};