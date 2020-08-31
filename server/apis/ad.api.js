const router = require('express').Router();
const adsController = global.appRequire('controller.ads');
router.get('/test',(req,res)=>{
    return res.send({status : 'OK'});
});

router.get('/', adsController.getAds);
router.put('/interaction/:id', adsController.setInteraction);
router.put('/updatecost/:id', adsController.editCost);

module.exports = router;