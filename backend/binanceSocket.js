const path = require('path');
const WebSocket = require('ws');
const EventEmitter = require('events');
const protobuf = require('protobufjs');

class CryptoStreamService extends EventEmitter {
  constructor() {
    super();
    this.connection = null;
    this.protobufRoot = null;
    this.tradeMessageType = null;
  }

  async initializeProtobuf() {
    try {
      const protoPath = path.join(__dirname, 'trade.proto');
      this.protobufRoot = await protobuf.load(protoPath);

      const tradeNamespace = this.protobufRoot.lookup('Trade');

      this.tradeMessageType = tradeNamespace.lookupType('Trade.Trade');

    } catch (error) {
    }
  }

  async openStream() {

    if (!this.tradeMessageType) {
      await this.initializeProtobuf();
    }

    if (!this.tradeMessageType) {
      return;
    }

    if (this.connection && this.connection.readyState === WebSocket.OPEN) {
      return;
    }

    return new Promise((resolve, reject) => {
      const assets = ['solusdt', 'adausdt'];
      const endpoint = `wss://stream.binance.com:9443/stream?streams=${assets.map(a => `${a}@trade`).join('/')}`;


      this.connection = new WebSocket(endpoint);

      this.connection.on('open', () => {
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


          const validationError = this.tradeMessageType.verify(formatted);
          if (validationError) {
            throw new Error(validationError);
          }

          this.emit('trade', formatted);

        } catch (err) {
        }
      });

      this.connection.on('close', (code, reason) => {
      });

      this.connection.on('error', (err) => {
        reject(err);
      });
    });
  }

  closeStream() {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    } else {
    }
  }

  getTradeType() {
    return this.tradeMessageType;
  }
}

module.exports = CryptoStreamService;
