const express = require('express');
const router = express.Router();
const AToy = require('../models/atoy'); // Đảm bảo bạn đã import model AToy

router.get('/', async (req, res) => {
  const atoys = await AToy.find();
  console.log("Animal Toys:", atoys); // Thêm dòng này để xem dữ liệu gọi từ collection atoy
  res.render('shop/animaltoy', { atoys });
});

module.exports = router;
