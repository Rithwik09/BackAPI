const {sendsum, checksum, checkEquation} = require('../controller/sums');
const generateEquation = require('../controller/problems')
const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());

router.get('/sendsum', sendsum);
router.get('/checksum', checksum);
router.post('/checkequation', checkEquation);
router.get('/getequation', generateEquation);

module.exports = router;