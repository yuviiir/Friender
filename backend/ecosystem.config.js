module.exports = {
  apps : [
    {
      name   : "backend",
      script : "./app.js",
      env_production: {
        NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      }
    }
  ]
}
