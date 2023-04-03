require('dotenv').config();
const express = require('express');
// const swaggerSetup = require('./swagger');
const path = require('path');
const app = express();

// 静态资源
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/info',  (req, res)=>{
  return res.json({'name':'jerry'});
})

// 设置Swagger
// swaggerSetup(app);

// ...其他代码...
app.listen(8096, () => {
  console.log('Server listening on port 8096');
});
