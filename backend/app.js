const express = require("express");
const {PORT} =  require('./config');
const router = require('./Controllers/frienderController');
const app = express()

app.use(express.json())
app.use('/api', router);

app.get('*', function(req, res) {
  res.status(404).send("I hope you find what you're looking for one day!")
});

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    message: "There was an error with the reqest."
  })
});

app.listen(PORT, () => {console.log(`Backend server running on port ${PORT}`)});
