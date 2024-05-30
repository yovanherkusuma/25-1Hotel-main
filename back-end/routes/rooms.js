var express = require('express');
var router = express.Router();
const { getData, getDataId, createRoom, updateRoom } = require('../controller/roomController');

router.get('/', function(req, res, next) {
  res.send('nice');
});

// Define the route to fetch data
router.get('/get', getData);
router.get('/get/:id', getDataId);
router.post('/post', createRoom)
router.put('/put/remove/:id', updateRoom)


module.exports = router;