const express = require('express');
const router = express.Router();
const GToy = require('../models/gtoy');

router.get('/', async (req, res) => {
  const gtoys = await GToy.find();
  res.render('shop/girltoy', { gtoys });
});




module.exports = router;
