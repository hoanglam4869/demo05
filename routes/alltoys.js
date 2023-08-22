const express = require('express');
const router = express.Router();
const btoy = require('../models/btoy');
const gtoy = require('../models/gtoy');

router.get('/', async (req, res) => {
    const btoys = await btoy.find();
    const gtoys = await gtoy.find();
    const allToys = [...btoys, ...gtoys];
    res.render('admin/alltoys', { allToys });
});

router.get('/delete/:id', async (req, res) => {
    const toyId = req.params.id;
    console.log('Trying to delete toy with ID:', toyId);
    const btoyDeleted = await btoy.findByIdAndDelete(toyId);
    const gtoyDeleted = await gtoy.findByIdAndDelete(toyId);
    if (btoyDeleted || gtoyDeleted) {
        console.log('Toy deleted successfully.');
        res.redirect('/admin/alltoys');
    }
});

router.get('/add', function(req, res, next) {    
    res.render('admin/add', {});
});

router.post('/add', async function(req, res, next){
    const gender = req.body.bgender;
    const newToyData = {
        bname: req.body.bname,
        bcategory: req.body.bcategory,
        bimage: req.body.bimage,
        bdetail: req.body.bdetail,
        bprice: req.body.bprice,
        bquantity: req.body.bquantity
    };

    let newToy;

    if (gender === 'male') {
        newToy = new btoy(newToyData);
    } else if (gender === 'female') {
        newToy = new gtoy({
            gname: newToyData.bname,
            gcategory: newToyData.bcategory,
            gimage: newToyData.bimage,
            gdetail: newToyData.bdetail,
            gprice: newToyData.bprice,
            gquantity: newToyData.bquantity
        });
    }

    try {
        const savedToy = await newToy.save();
        res.redirect('/admin/alltoys');
    } catch (error) {
        console.error('Error adding new toy:', error);
    }
});

router.get('/update/:id', async (req, res) => {
    const toyId = req.params.id;
    const btoyToUpdate = await btoy.findById(toyId);
    const gtoyToUpdate = await gtoy.findById(toyId);

    if (btoyToUpdate) {
        res.render('admin/update', { toy: btoyToUpdate });
    } else if (gtoyToUpdate) {
        res.render('admin/update', { toy: gtoyToUpdate });
    } else {
        res.redirect('/admin/alltoys');
    }
});

router.post('/update/:id', async function(req, res, next) {
    const toyId = req.params.id;
    const updatedData = {
        bname: req.body.name,
        bcategory: req.body.category,
        bdetail: req.body.detail,
        bimage: req.body.image,
        bprice: req.body.price,
        bquantity: req.body.quantity,
        gname: req.body.name,
        gcategory: req.body.category,
        gdetail: req.body.detail,
        gimage: req.body.image,
        gprice: req.body.price,
        gquantity: req.body.quantity
    };

    try {
        await btoy.findByIdAndUpdate(toyId, updatedData);
        await gtoy.findByIdAndUpdate(toyId, updatedData);

        res.redirect('/admin/alltoys');
    } catch (error) {
        console.error('Error updating toy:', error);
    }
});



module.exports = router;
