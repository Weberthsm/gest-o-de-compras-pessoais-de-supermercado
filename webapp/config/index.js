require('dotenv').config();

module.exports = {
  APP_PORT: process.env.WEBAPP_PORT || 4000,
  API_BASE_URL: process.env.BASE_URL_API || process.env.API_BASE_URL || process.env.BASE_URL || 'http://localhost:3000',
};
