import React, { useState, useEffect, useRef } from "react";
import protobuf from "protobufjs";
import axios from "axios";
import trade from "./trade.js";

interface TradeMessage {
  stream: string;
  coin: string;
  price: string;
  quantity: string;
  tradeTime: number;
}

const BinanceStreamToggle: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [lastTrades, setLastTrades] = useState<Record<string, TradeMessage>>(
    {}
  );
  const tradeTypeRef = useRef<protobuf.Type | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const startBinanceStream = async () => {
    await axios.post(
      "https://localhost:3000/start-binance-stream",
      {},
      { withCredentials: true }
    );
  };

  const stopBinanceStream = async () => {
    await axios.post(
      "https://localhost:3000/stop-binance-stream",
      {},
      { withCredentials: true }
    );
  };

  useEffect(() => {
    const Trade = (trade as any).Trade.Trade;
    tradeTypeRef.current = Trade;

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const ws = new WebSocket("wss://localhost:3000");
    ws.binaryType = "arraybuffer";

    ws.onopen = () => {
      startBinanceStream();
      setIsStreaming(true);
    };

    ws.onmessage = (event) => {
      try {
        const Trade = tradeTypeRef.current;
        if (!Trade) return;

        const message = Trade.decode(new Uint8Array(event.data));
        const object = Trade.toObject(message, {
          longs: Number,
          enums: String,
          bytes: String,
        }) as TradeMessage;
        console.log(object);
        setLastTrades((prev) => ({
          ...prev,
          [object.coin]: object,
        }));
      } catch (err) {
        console.error("Error decoding protobuf message:", err);
      }
    };

    ws.onclose = () => {
      setLastTrades({});
      setIsStreaming(false);
    };

    wsRef.current = ws;
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    stopBinanceStream();
    setIsStreaming(false);
    setLastTrades({});
  };

  return (
    <div>
      <h3>Binance Stream Controller</h3>
      <p>Status: {isStreaming ? "Streaming ON" : "Streaming OFF"}</p>

      {Object.keys(lastTrades).length === 0 && <p>Немає даних про трейди</p>}

      {Object.entries(lastTrades).map(([coin, trade]) => (
        <div key={coin}>
          <p>
            <strong>Монета:</strong> {trade.coin}
          </p>
          <p>
            <strong>Ціна:</strong> {trade.price}
          </p>
          <p>
            <strong>Кількість:</strong> {trade.quantity}
          </p>
          <p>
            <strong>Час:</strong> {new Date(trade.tradeTime).toLocaleString()}
          </p>
          <hr />
        </div>
      ))}

      <button onClick={connectWebSocket} disabled={isStreaming}>
        Turn ON
      </button>
      <button onClick={disconnectWebSocket} disabled={!isStreaming}>
        Turn OFF
      </button>
    </div>
  );
};

export default BinanceStreamToggle;
