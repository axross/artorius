import validator from 'is-my-json-valid';
import schema from './User.schema.json';

const __validate = validator(schema);

export const validateUser = json => {
  return new Promise((resolve, reject) => {
    if (!__validate(json)) {
      return reject(new TypeError('USER_JSON_SHAPE_INVALID'));
    }

    const user = {
      id: json.id,
      username: json.username,
      email: json.email,
      name: json.name,
      imageUrl: json.imageUrl,
      bio: json.bio,
    };

    return resolve(user);
  });
};
