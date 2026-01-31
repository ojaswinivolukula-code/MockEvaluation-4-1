const request = {};
export const rateLimiter = (maxRequets, windowMs = 60 * 1000) => {
  return (req, res, next) => {
    const ip = req.ip;
    const currentTime = Date.now();
    if (!request[ip]) {
      request[ip] = {
        count: 1,
        startTime: currentTime,
      };
      return next();
    }
    const elapsed = currentTime - request[ip].startTime;
    if (elapsed > windowMs) {
      request[ip] = {
        count: 1,
        startTime: currentTime,
      };
      return next();
    }
    request[ip].count++;
    if (request[ip].count > maxRequets) {
      return res.json(429).json({
        message: "Rate limit excceded",
      });
    }
    next();
  };
};
