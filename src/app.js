require('dotenv').config();
const express = require('express');
const app = express();
const swaggerSetup = require('./swagger');

// ...其他代码...

// 设置Swagger
swaggerSetup(app);

// ...其他代码...

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
