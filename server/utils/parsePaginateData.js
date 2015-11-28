import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  MAX_PER_PAGE,
} from '../constants';

export const parsePaginateData = ({ page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE } = {}) => {
  return new Promise((resolve, reject) => {
    if (page < 1) {
      return reject(new Error(`page must be above 0`))
    }
    if (perPage > MAX_PER_PAGE) {
      return reject(new Error(`perPage must be below ${MAX_PER_PAGE}`));
    }

    resolve({
      limit: perPage,
      offset: (page - 1) * perPage,
    });
  });
};
