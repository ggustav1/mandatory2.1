const credentials = require("./config/mysqlCredentials.js");
// const { knexSnakeCaseMappers } = require('objection');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: credentials.database,
      host: credentials.host,
      user:     credentials.user,
      password: credentials.password,
      // host: credentials.host
    },
    // ...knexSnakeCaseMappers()
  }

};
