import { useEffect, useRef } from "react";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/ws`;

const useAuctionSocket=(auctionId, onMessage) => {
    const handlerRef = useRef(onMessage)

    useEffect(() => {
        handlerRef.current = onMessage
    }, [onMessage])

    useEffect(() => {
        if (!auctionId) return

        let ws, retryTimer, closedByUs = false;
        const connect = () => {
            ws = new WebSocket(`${BASE_URL}/${auctionId}`);
            ws.onopen = () => handlerRef.current({ type: 'connected' })
            ws.onmessage = (e) => handlerRef.current(JSON.parse(e.data))
            ws.onclose = (e) => {
                if (!closedByUs && e.code < 4000) {
                    retryTimer = setTimeout(connect, 2000);
                }
            }
        }

        connect();

        return () => {
            closedByUs = true
            clearTimeout(retryTimer)
            ws?.close();
        }
    }, [auctionId])
}

export { useAuctionSocket }
