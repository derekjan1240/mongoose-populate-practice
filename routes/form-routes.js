const router = require('express').Router();

router.get('/machine', (req, res)=>{
    res.render('page/createPage', {form: "machineForm"});
});

router.get('/component', (req, res)=> {
    res.render('page/createPage', {form: "componentForm"});
});

router.get('/vendor', (req, res)=> {
    res.render('page/createPage', {form: "vendorForm"});
});


module.exports = router;