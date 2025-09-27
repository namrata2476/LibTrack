const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db');
const Request = require('./models/Request');
const User = require('./models/User');
const Log = require('./models/Log');

const requests = require('./routes/requests');
const hostel = require('./routes/hostel');
const librarian = require('./routes/librarian');
const auth = require('./routes/auth');
const jwt = require('jsonwebtoken');

// simple auth middleware
function authMiddleware(req, res, next){
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  const token = authHeader.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = payload; next();
  } catch(e){
    return res.status(401).json({ error: 'Invalid token' });
  }
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/requests', requests);
app.use('/api/hostel', hostel);
app.use('/api/librarian', librarian);
app.use('/api/auth', auth);

// protect request creation to authenticated students
app.post('/api/requests', authMiddleware, async (req, res, next) => next());


app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log('Server listening on', PORT));
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();
