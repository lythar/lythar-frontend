import { useCallback, useEffect } from "react";
import { indetifyStoreNameFromEventType } from "./ws-event-type-identifier";
import { useWebSocket } from "../wrappers/websocket-provider";
import { StoreType } from "@/types/globals";
import { useAllStores } from "../wrappers/stores-provider";
import { dynamicLogger } from "@/hooks/dynamic-logger";

interface WebsocketEventProxyProps {
  children: React.ReactNode;
}

const WebsocketEventProxy: React.FC<WebsocketEventProxyProps> = ({
  children,
}) => {
  const { lastMessage } = useWebSocket();
  const stores = useAllStores();

  const TlastMessage = lastMessage as {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  };

  const eventProxy = useCallback(() => {
    const message = TlastMessage;
    const dynLogger = dynamicLogger();

    if (!message) return;
    if (!stores) return dynLogger.error("Stores not found");

    const store = indetifyStoreNameFromEventType(message.type);

    if (!store)
      return dynLogger.warn(
        `Store or event register for event ${message.type} not found`
      );

    if (store in stores !== false) {
      stores[store as keyof StoreType].emit(message.type, message.data);
    }
  }, [TlastMessage, stores]);

  useEffect(() => {
    eventProxy();
  });

  return <>{children}</>;
};

export default WebsocketEventProxy;
