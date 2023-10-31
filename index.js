// Controller - Express is cool
let express = require('express');
let app = express();
let petRepo = require('./repos/petRepo');

// Express Router object
let router = express.Router();

//let data = [6, 9]

// GET return all
router.get('/', function (req, res, next) {
  petRepo.get(function (data) {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "All pets retrieved.",
      "isKeithCool": true,
      "data": data
    });
  }, function(err) {
    next(err);
  });
});

// router prefixes all with /aip/v1
app.use('/api/', router);

// Listen on port 5000
var server = app.listen(5000, function () {
  console.log('Node server is running on http://localhost:5000');
});
