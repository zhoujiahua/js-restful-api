import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './config/settings.js';

export const app = express();
const PORT = process.env.PORT || 8096;
const secretKey = process.env.SECRET_KEY || SECRET_KEY;

dotenv.config();

// 静态资源
app.use(express.static(path.join(process.cwd(), 'public')));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.use(express.json());

// Register user
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide both username and password' });
  }
  // TODO: Register user in database
  res.json({ message: 'User registered successfully' });
});

// Login user
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide both username and password' });
  }
  // TODO: Authenticate user against database
  // In this example, we're using a dummy user
  if (username !== 'admin' || password !== 'admin') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const user = { id: 1, username: 'admin' };
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

// Get user info
app.get('/api/userinfo', verifyToken, (req, res) => {
  const user = req.user;
  res.json({ id: user.id, username: user.username });
});

app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});
