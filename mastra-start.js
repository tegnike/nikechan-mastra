#!/usr/bin/env node

import { spawn } from 'child_process';

const args = ['dev', '--port', '4111'];
const mastra = spawn('npx', ['mastra', ...args], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production',
    HOST: '127.0.0.1',
    PORT: '4111'
  }
});

mastra.on('close', (code) => {
  console.log(`Mastra process exited with code ${code}`);
  process.exit(code);
});

process.on('SIGTERM', () => {
  mastra.kill('SIGTERM');
});

process.on('SIGINT', () => {
  mastra.kill('SIGINT');
}); 