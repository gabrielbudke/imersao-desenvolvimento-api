module.exports = {
  apps: [{
    name: "imersao-api",
    script: './src/app.js',
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
};
