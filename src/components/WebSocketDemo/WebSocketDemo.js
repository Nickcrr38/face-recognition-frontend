import { useEffect } from 'react';

const useWebSocket = () => {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5001/ws');

    ws.onopen = () => console.log('Connected to WebSocket');
    ws.onmessage = (event) => console.log('Received:', event.data);
    ws.onclose = () => console.log('WebSocket closed');
    ws.onerror = (err) => console.error('WebSocket error:', err);

    return () => ws.close();
  }, []);
};

export default useWebSocket;

