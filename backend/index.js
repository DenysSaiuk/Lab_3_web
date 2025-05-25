const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./authController'); 
const cookieParser = require('cookie-parser');
const WebSocket = require('ws');
const CryptoStreamService = require('./binanceSocket'); 

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: ['https://localhost:3001'],
  credentials: true,
}));

app.use(express.json());
app.use('/auth', authRoutes);

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

const server = https.createServer(httpsOptions, app);
const wss = new WebSocket.Server({ server });

const binanceSocket = new CryptoStreamService();
let clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);

  const sendTrade = (tradeMessage) => {
    const tradeType = binanceSocket.getTradeType?.();
    if (!tradeType) return;

    try {
      const buffer = tradeType.encode(tradeMessage).finish();
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(buffer);
      }
    } catch (e) {
      console.error('Failed to encode/send trade:', e);
    }
  };

  const onTrade = (tradeMessage) => {
    sendTrade(tradeMessage);
  };

  binanceSocket.on('trade', onTrade);

  ws.on('close', () => {
    clients.delete(ws);
    if (clients.size === 0) {
      binanceSocket.closeStream();
    }
    binanceSocket.off('trade', onTrade);
  });
});

app.post('/start-binance-stream', async (req, res) => {
  if (!binanceSocket.ws || binanceSocket.ws.readyState !== WebSocket.OPEN) {
    await binanceSocket.openStream();
  }
  res.json({ message: 'Binance stream started' });
});

app.post('/stop-binance-stream', (req, res) => {
  binanceSocket.closeStream();
  res.json({ message: 'Binance stream stopped' });
});

server.listen(3000, () => {
  console.log('HTTPS сервер запущено на https://localhost:3000');
});
