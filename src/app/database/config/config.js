require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.USER,
    "password": process.env.PASS,
    "database": process.env.DB,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "timezone": "-03:00"
  },
  "test": {
    "username": process.env.USER,
    "password": process.env.PASS,
    "database": process.env.DB,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "timezone": "-03:00"
  },
  "production": {
    "username": process.env.USER,
    "password": process.env.PASS,
    "database": process.env.DB,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "timezone": "-03:00"
  }
}
