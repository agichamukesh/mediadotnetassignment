const router = require('express').Router();

router.get('/test',(req,res)=>{
    return res.send({status : 'OK'});
});

router.use('/slots',require('./ad.api'));

module.exports = router;