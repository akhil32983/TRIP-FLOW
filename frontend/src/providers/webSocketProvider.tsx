import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";

import { WS_BASE_URL } from "@/config/environment";
import { useAuth } from "@/providers/authProvider";

interface WebSocketContextType {
    client: Client | null;
    isConnected: boolean;
    subscribe: (destination: string, callback: (message: IMessage) => void) => StompSubscription | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const [client, setClient] = useState<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const stompClient = new Client({
            brokerURL: `${WS_BASE_URL}/notifications`,
            reconnectDelay: 2000,
            heartbeatIncoming: 1000,
            heartbeatOutgoing: 1000,
            connectHeaders: {},
            onConnect: () => setIsConnected(true),
            onDisconnect: () => setIsConnected(false),
            onStompError: () => setIsConnected(false),
            onWebSocketError: () => setIsConnected(false),
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            if (stompClient.active) {
                stompClient.deactivate();
            }
        };
    }, [user]);

    const subscribe = useCallback((
        destination: string,
        callback: (message: IMessage) => void
    ): StompSubscription | null => {
        if (!client || !isConnected) return null;
        
        return client.subscribe(destination, callback);
    }, [client, isConnected]);

    return (
        <WebSocketContext.Provider value={{ client, isConnected, subscribe }}>
            {children}
        </WebSocketContext.Provider>
    );
};
