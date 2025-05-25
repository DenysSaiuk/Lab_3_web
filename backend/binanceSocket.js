const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const EventEmitter = require('events');
const { execSync } = require('child_process');

class CryptoStreamService extends EventEmitter {
  constructor() {
    super();
    this.connection = null;
    this.tradeMessageType = null;

    this.ensureProtobufCache();
    const tradePb = require('./generated/trade_pb');
    this.tradeMessageType = tradePb.Trade.Trade;
  }

ensureProtobufCache() {
  const protoPath = path.join(__dirname, 'trade.proto');
  const generatedDir = path.join(__dirname, 'generated');
  const outputPath = path.join(generatedDir, 'trade_pb.js');

  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }

  try {
    execSync(`npx pbjs -t static-module -w commonjs -o "${outputPath}" "${protoPath}"`, {
      stdio: 'inherit',
    });
  } catch (err) {
    process.exit(1);
  }
}

  async openStream() {
    if (!this.tradeMessageType) {
      console.error('[WebSocket] tradeMessageType not loaded');
      return;
    }

    if (this.connection && this.connection.readyState === WebSocket.OPEN) {
      console.log('[WebSocket] Already connected');
      return;
    }

    return new Promise((resolve, reject) => {
      const assets = ['solusdt', 'adausdt'];
      const endpoint = `wss://stream.binance.com:9443/stream?streams=${assets.map(a => `${a}@trade`).join('/')}`;

      this.connection = new WebSocket(endpoint);

      this.connection.on('open', () => {
        console.log('[WebSocket] Binance stream connected');
        resolve();
      });

      this.connection.on('message', (rawData) => {
        try {
          const jsonData = JSON.parse(rawData);
          const rawTrade = jsonData.data;

          if (!rawTrade || !rawTrade.s || !rawTrade.p || !rawTrade.q || !rawTrade.T) {
            return;
          }

          const formatted = {
            stream: rawTrade.s.toLowerCase(),
            coin: rawTrade.s,
            price: rawTrade.p,
            quantity: rawTrade.q,
            tradeTime: rawTrade.T,
          };

          const errMsg = this.tradeMessageType.verify(formatted);
          if (errMsg) throw new Error(errMsg);

          this.emit('trade', formatted);
        } catch (err) {
          console.error('[WebSocket] Trade message error:', err.message);
        }
      });

      this.connection.on('close', (code, reason) => {
        console.log(`[WebSocket] Connection closed: ${code} ${reason}`);
      });

      this.connection.on('error', (err) => {
        console.error('[WebSocket] Connection error:', err.message);
        reject(err);
      });
    });
  }

  closeStream() {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
      console.log('[WebSocket] Connection closed manually');
    }
  }

  getTradeType() {
    return this.tradeMessageType;
  }
}

module.exports = CryptoStreamService;
