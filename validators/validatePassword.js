export const validatePassword = password => {
  return new Promise((resolve, reject) => {
    if (typeof password !== 'string') {
      return reject(new TypeError('PASSWORD_INVALID_TYPE'));
    }
    if (password.length < 8) {
      return reject(new TypeError('PASSWORD_TOO_SHORT'));
    }
    if (password.length > 128) {
      return reject(new TypeError('PASSWORD_TOO_LONG'));
    }

    resolve(password);
  });
};
