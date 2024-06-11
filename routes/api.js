const {sendsum, checksum} = require('../controller/sums');
const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());

router.get('/sendsum', sendsum);
router.get('/checksum', checksum)

module.exports = router;