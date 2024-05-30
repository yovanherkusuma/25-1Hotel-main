var express = require('express');
var router = express.Router();
const { getData, getDataId, createGalleries, updateGalleries } = require('../controller/galleriesController');

router.get('/', function(req, res, next) {
  res.send('nice');
});

// Define the route to fetch data
router.get('/get', getData);
router.get('/get/:id', getDataId);
router.post('/post', createGalleries);
router.put('/put/:id', updateGalleries);


module.exports = router;