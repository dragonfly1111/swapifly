module.exports = {
  apps: [
    {
      name: 'swapifly',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
