module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "wcs-alamo",
      script    : "App.js",
      env: {
        PORT: 5001,
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "development",
	PORT: 5001
      }
    }
  ]
}

