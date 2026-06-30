const isLocalhost = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
  }
  return false;
};

const defaultProdApi = 'https://codme-backend.onrender.com';

export const apiBase = (
  import.meta.env.VITE_API_BASE_URL || 
  (isLocalhost() ? 'http://localhost:8000' : defaultProdApi)
).replace(/\/$/, '');

export const wsBase = (
  import.meta.env.VITE_WS_URL || 
  apiBase.replace(/^http/, 'ws')
).replace(/\/$/, '');
