const express = require('express');
const router = express.Router();
const BToy = require('../models/btoy');

router.get('/', async (req, res) => {
  const btoys = await BToy.find();
  console.log("Boy Toys:", btoys); // Thêm dòng này để xem dữ liệu gọi từ collection btoy
  res.render('shop/boytoy', { btoys });
});

module.exports = router;
