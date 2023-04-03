const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// 使用正确的路径加载Swagger YAML文件，无论是在开发还是生产环境
const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const apiDocsPath = isDev
  ? path.join(__dirname, 'api-docs', 'swagger.yaml')
  : path.join(__dirname, '..', 'dist/api-docs', 'swagger.yaml');

const swaggerDocument = YAML.load(apiDocsPath);

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
