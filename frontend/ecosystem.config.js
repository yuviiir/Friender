module.exports = {
  apps : [
    {
      name   : "frontend",
      script : "./frontend/server.js",
      env_production: {
        NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      }
    }
  ]
}
