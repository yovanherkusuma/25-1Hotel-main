var express = require('express');
var router = express.Router();
const { getData, getDataId, createFacilities, updateFacilities } = require('../controller/facilitiesController');

router.get('/', function(req, res, next) {
  res.send('nice');
});

// Define the route to fetch data
router.get('/get', getData);
router.get('/get/:id', getDataId);
router.post('/post', createFacilities);
router.put('/put/:id', updateFacilities);


module.exports = router;