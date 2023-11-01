// Controller - Express is cool
let express = require('express');
let app = express();
let petRepo = require('./repos/petRepo');

// Express Router object
let router = express.Router();

// Middleware support for JSON parsing in request object
app.use(express.json());

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

// Create GET/search?id=n&name=str to search for pies by 'id' and/or 'name'
router.get('/search', function (req, res, next) {
  let searchObject = {
    "id": req.query.id,
    "name": req.query.name
  };

  petRepo.search(searchObject, function (data) {
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "All searched pets retrieved.",
      "data": data
    });
  }, function (err) {
    next(err);
  });
});


// Get by ID
router.get('/:id', function (req, res, next) {
  petRepo.getById(req.params.id, function (data) {
    if (data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "Single pet retrieved.",
        "isKeithCool": true,
        "data": data
      });
    }
    else {
      res.status(404).json({
        "status": 404,
        "statusText": "Not Found",
        "message": "Pet ID: " + req.params.id + " could not be found.",
        "isKeithCool": true,
        "error": {
          "code": "NOT_FOUND",
          "message": "Pet ID: " + req.params.id + " could not be found."
        }
      });
    }
  }, function(err) {
    next(err);
  });
});

router.post('/', function (req, res, next) {
  petRepo.insert(req.body, function (data) {
    res.status(201).json({
      "status": 201,
      "statusText": "Created",
      "message": "New Pet Added.",
      "data": data
    });
  }, function (err) {
      next(err);
  });
})

// router prefixes all with /aip/v1
app.use('/api/', router);

// Listen on port 5000
var server = app.listen(5000, function () {
  console.log('Node server is running on http://localhost:5000');
});
