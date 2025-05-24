export default {
  apps: [
    {
      name: 'mastra-production',
      script: './mastra-start.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: 4111,
        UV_THREADPOOL_SIZE: 16
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000
    }
  ]
}; 