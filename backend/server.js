const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const knex = require('knex');
require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const { handleRegister } = require('./controllers/register');
const { handleSignin } = require('./controllers/signin');
const { handleImage } = require('./controllers/image');
const { handleProfile } = require('./controllers/profile');
const { handleProxyImage } = require('./controllers/proxyImage');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST, // now uses hosted DB
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});




const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Smart Brain API running ✅'));

db.schema.hasTable('users').then(exists => {
  if (!exists) {
    return db.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('email').unique().notNullable();
      table.string('hash').notNullable();
      table.integer('entries').defaultTo(0);
      table.timestamp('joined');
    }).then(() => console.log('✅ Table users created'));
  }
});

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));
app.post('/signin', (req, res) => handleSignin(req, res, db, bcrypt));
app.put('/image', (req, res) => handleImage(req, res, db));
app.get('/profile/:id', (req, res) => handleProfile(req, res, db));

// ✅ Proxy route (new)
app.get('/proxy-image', async (req, res) => {
  try {
    const imageUrl = req.query.url;
    if (!imageUrl) return res.status(400).send('Missing image URL');

    const response = await fetch(imageUrl);
    if (!response.ok) return res.status(400).send('Failed to fetch image');

    const contentType = response.headers.get('content-type');
    res.set('Content-Type', contentType);
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy server error');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
