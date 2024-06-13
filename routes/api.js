const {sendsum, checksum, getequ} = require('../controller/sums');
const generateEquation = require('../controller/problems')
const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());

router.get('/sendsum', sendsum);
router.get('/checksum', checksum);
router.get('/checkequation', getequ);
router.post('/getequation', generateEquation);

module.exports = router;