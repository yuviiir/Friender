const express = require("express");
const serviceFriender = require('./Services/frienderService');
const router = require('./Controllers/frienderController');
const app = express()
const port = 3002

app.use(express.json())
app.use('/api', router);

// catch 404 and forward to error handler
app.get('*', function(req, res) {
  res.status(404).send("I hope you find what you're looking for one day!")
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});

app.listen(port, () => {console.log(`Backend server running on port ${port}`)});
