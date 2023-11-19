// MongoDB controller

const express = require('express');
const cors = require('cors');
const petRepo = require('./repos/petRepo');
const errorHelper = require('./helpers/errorHelpers');

const app = express();
// Not sure if I need this or if it hurts
//const port = process.env.PORT || 3000;

// Express Router object
let router = express.Router();

app.use(express.json());
app.use(cors());

router.get('/', async (req, res, next) => {
  try {
    const data = await petRepo.get();
    res.status(200).json({
      "status": 200,
      "statusText": 'OK',
      "message": 'All pets retrieved.',
      "isKeithCool": true,
      "data": data,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/search', async (req, res, next) => {
  const searchObject = {
    "id": req.query.id,
    "breed": req.query.breed,
    "size": req.query.size,
    "age": req.query.age,
    "gender": req.query.gender,
    "color": req.query.color,
    "name": req.query.name,
  };

  try {
    const data = await petRepo.search(searchObject);
    res.status(200).json({
      "status": 200,
      "statusText": 'OK',
      "message": 'All searched pets retrieved.',
      "data": data,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await petRepo.getById(req.params.id);

    if (data) {
      res.status(200).json({
        "status": 200,
        "statusText": 'OK',
        "message": 'Single pet retrieved.',
        "isKeithCool": true,
        "data": data,
      });
    } else {
      res.status(404).json({
        "status": 404,
        "statusText": 'Not Found',
        "message": `Pet ID: ${req.params.id} could not be found.`,
        "isKeithCool": true,
        "error": {
          "code": 'NOT_FOUND',
          "message": `Pet ID: ${req.params.id} could not be found.`,
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

// router prefixes all with /api/v1
app.use('/api/', router);

// Configure exception logger to console
app.use(errorHelper.logErrorsToConsole);
// Configure exception logger to file
app.use(errorHelper.logErrorsToFile);
// Configure client error handler
app.use(errorHelper.clientErrorHandler);
// Configure catch-all exception middleware last
app.use(errorHelper.errorHandler);

// Listen on port 5000
var server = app.listen(5000, function () {
  console.log('Node server is running on http://localhost:5000');
});
