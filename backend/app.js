const express = require("express");
const serviceFriender = require('./Services/frienderService');
const router = require('./Controllers/frienderController');
const app = express()
const port = 3002

app.use('/api', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(err.status || 404).json({
    message: "No such route exists"
  })
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});

app.listen(port, () => {console.log(`Backend server running on port ${port}`)});
