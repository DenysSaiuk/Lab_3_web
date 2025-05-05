const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./authController');

const app = express();

// Дозвіл CORS
app.use(cors({
  origin: ['https://localhost:3001'],
  credentials: true,
}));

app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Привіт з HTTPS Express-сервера!');
});

// Опції TLS
const httpsOptions = {
  key: fs.readFileSync('C:\\Users\\Admin\\KPI\\Web\\Денис\\Lab_3_web\\casdoor\\keys\\localhost-key.pem'),
  cert: fs.readFileSync('C:\\Users\\Admin\\KPI\\Web\\Денис\\Lab_3_web\\casdoor\\keys\\localhost.pem'),
  minVersion: 'TLSv1.2',
  maxVersion: 'TLSv1.2',
  ciphers: [
    'TLS_RSA_WITH_AES_256_CBC_SHA256',
    'TLS_RSA_WITH_AES_256_CBC_SHA',
  ].join(':'),
  honorCipherOrder: true,
};

// Старт HTTPS сервера
https.createServer(httpsOptions, app).listen(3000, () => {
  console.log('HTTPS сервер запущено на https://localhost:3000');
});
