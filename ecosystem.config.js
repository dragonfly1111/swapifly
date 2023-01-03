module.exports = {
  apps: [
    {
      name: 'swapifly',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env_production: {
        PORT: 3000,
        NODE_ENV: "production"
      },
      env_test: {
        PORT: 3001,
        NODE_ENV: "development"
      }
    }
  ]
}
