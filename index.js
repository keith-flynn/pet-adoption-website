// Express is cool
let express = require('express');
let app = express();

// Express Router object
let router = express.Router();

// GET return all
router.get('/', function (req, res, next) {
  res.send("Apple");
});

// router prefixes all with /aip/v1
app.use('/api/', router);

// Listen on port 5000
var server = app.listen(5000, function () {
  console.log('Node server is running on http://localhost:5000');
});
