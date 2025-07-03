import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx}",
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy']
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/', 
  server: {
    // CSP para desenvolvimento - necessário 'unsafe-inline' para Vite HMR
    // IMPORTANTE: Este CSP é APENAS para desenvolvimento local
    // Em produção, o Firebase usa CSP restritivo sem 'unsafe-inline'
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com https://api.coingecko.com https://raw.githubusercontent.com; connect-src 'self' https://api.coingecko.com https://*.googleapis.com https://api.binance.com https://tharseo-backend-v2.onrender.com https://tharseo.zapto.org https://www.google-analytics.com https://analytics.google.com ws://localhost:5173 ws://127.0.0.1:5173; form-action 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self';"
    }
  },
});
