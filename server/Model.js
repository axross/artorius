import Sequelize from 'sequelize';

export const createModel = ({ config }) => {
  const sequelize = new Sequelize(
    config.DATABASE_NAME,
    config.DATABASE_USER,
    config.DATABASE_PASSWORD,
    {
      dialect: 'mysql',
      host: config.DATABASE_HOST,
      pool: config.DATABASE_POOL,
    }
  );

  sequelize.define('Session', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    accessToken: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true,
    },
    expiredAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }, {
    paranoid: true,
  });

  sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(32),
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(64),
      allowNull: false,
      defaultValue: 'noname',
    },
    imageUrl: {
      type: Sequelize.STRING(255),
    },
    bio: {
      type: Sequelize.TEXT,
    },
  }, {
    paranoid: true,
  });

  return {
    sequelize,
    model: sequelize.models,
  };
};
