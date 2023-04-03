module.exports = {
  development: {
    // url: URI,
    storage: './src/db/labranzas.sqlite',
    dialect: 'sqlite',
  },
  production: {
    // url: URI,
    storage: './src/db/labranzas.sqlite',
    dialect: 'sqlite',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
