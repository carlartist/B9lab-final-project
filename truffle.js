module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8546,
    gas: 1000000
  },
  networks: {
    "morden": {
      network_id: 2,
      test_timeout: 300000
    }
  }
};
