const express = require('express');
const router = express.Router();
const BToy = require('../models/btoy');
const GToy = require('../models/gtoy');
const AToy = require('../models/atoy');

router.get('/', async (req, res) => {
    const btoys = await BToy.find();
    const gtoys = await GToy.find();
    const atoys = await AToy.find();
    const allToys = [...btoys, ...gtoys, ...atoys];
    res.render('admin/alltoys', { allToys });
});

router.get('/delete/:id', async (req, res) => {
    const toyId = req.params.id;
    console.log('Trying to delete toy with ID:', toyId);
    const btoyDeleted = await BToy.findByIdAndDelete(toyId);
    const gtoyDeleted = await GToy.findByIdAndDelete(toyId);
    const atoyDeleted = await AToy.findByIdAndDelete(toyId);
    if (btoyDeleted || gtoyDeleted || atoyDeleted) {
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
        newToy = new BToy(newToyData);
    } else if (gender === 'female') {
        newToy = new GToy({
            gname: newToyData.bname,
            gcategory: newToyData.bcategory,
            gimage: newToyData.bimage,
            gdetail: newToyData.bdetail,
            gprice: newToyData.bprice,
            gquantity: newToyData.bquantity
        });
    } else if (gender === 'animal') {
        newToy = new AToy({
            aname: newToyData.gname,
            acategory: newToyData.gcategory,
            aimage: newToyData.gimage,
            adetail: newToyData.gdetail,
            aprice: newToyData.gprice,
            aquantity: newToyData.gquantity
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
    const btoyToUpdate = await BToy.findById(toyId);
    const gtoyToUpdate = await GToy.findById(toyId);
    const atoyToUpdate = await AToy.findById(toyId);

    if (btoyToUpdate) {
        res.render('admin/update', { toy: btoyToUpdate });
    } else if (gtoyToUpdate) {
        res.render('admin/update', { toy: gtoyToUpdate });
    } else if (atoyToUpdate) {
        res.render('admin/update', { toy: atoyToUpdate });
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
        gquantity: req.body.quantity,
        aname: req.body.name,
        acategory: req.body.category,
        adetail: req.body.detail,
        aimage: req.body.image,
        aprice: req.body.price,
        aquantity: req.body.quantity
    };

    try {
        await BToy.findByIdAndUpdate(toyId, updatedData);
        await GToy.findByIdAndUpdate(toyId, updatedData);
        await AToy.findByIdAndUpdate(toyId, updatedData);

        res.redirect('/admin/alltoys');
    } catch (error) {
        console.error('Error updating toy:', error);
    }
});

module.exports = router;
