var express = require('express');
var router = express.Router();
var api = require("../controllers/apiv1")
/* GET users listing. */
router.all('/trigger/submit', api.submit);
router.all('/task/fetch', api.fetch);
router.all('/task/list', api.list);
module.exports = router;
