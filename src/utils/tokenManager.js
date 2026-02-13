let cachedToken = null;
let tokenExpiry = null;

export const setToken = (token, expiresIn) => {
  cachedToken = token;
  tokenExpiry = Date.now() + expiresIn * 1000;
};

export const getToken = () => {
  if (!cachedToken || Date.now() >= tokenExpiry) {
    return null;
  }
  return cachedToken;
};
