// websocket provider
import { createContext, useContext } from "react";

import { default as useWs, ReadyState } from "react-use-websocket";
import WebsocketEventProxy from "../websocket/ws-event-proxy";
import { dynamicLogger } from "@/hooks/dynamic-logger";

interface WebSocketContextProps {
  connectionStatus: string;
  sendMessage: (message: string) => void;
  lastMessage: unknown;
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null);

interface WebSocketProviderProps {
  url: string;
  children: React.ReactNode;
}

function WebSocketProvider({ url, children }: WebSocketProviderProps) {
  const dynLogger = dynamicLogger();
  dynLogger.name = "Socket";
  dynLogger.color = "#ae1ee7";
  const socketConnection = useWs(url, {
    shouldReconnect: () => true,
    onOpen: () => dynLogger.log("Established connection with WebSocket"),
    onClose: () => dynLogger.log("Disconnected from WebSocket"),
    onError: () => dynLogger.error("Error with WebSocket connection"),
    reconnectInterval: 3000,
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[socketConnection.readyState];

  return (
    <WebSocketContext.Provider
      value={{
        connectionStatus,
        sendMessage: socketConnection.sendMessage,
        lastMessage: socketConnection.lastJsonMessage,
      }}
    >
      <WebsocketEventProxy>{children}</WebsocketEventProxy>
    </WebSocketContext.Provider>
  );
}

export default WebSocketProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
