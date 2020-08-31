const advertiserModel = global.appRequire('model.advertiser');
const adModel = global.appRequire('model.ad');

const getAds = (req,res) => {
    const advertiserName = req.query.name;
    advertiserModel.findOne({name : advertiserName}).populate('ads').exec((error,doc) => {
        if(error){
            return res.send({status : false, message : 'Something went wrong'});
        }
        if(!doc){
            return res.send({status : true, data : [], message : 'No data available'});
        }
        return res.send({status : true, data : doc, message : 'Successfull'});
    });
}

const setInteraction = (req,res) => {
    const id = req.params.id;
    adModel.findOneAndUpdate({_id : id},{$inc : {"clicks" : 1}}, (error) => {
        if(error){
            return res.send({status : false, message : 'Something went wrong'});
        }
        return res.send({status : true, data : [], message : 'Successfull'});
    });
}

const editCost = (req,res) => {
    const id = req.params.id;
    const cost = req.body.cost;
    adModel.findOneAndUpdate({_id : id},{$set : {"cost" : cost}}, (error) => {
        if(error){
            return res.send({status : false, message : 'Something went wrong'});
        }
        return res.send({status : true, data : [], message : 'Successfull'});
    });
}

module.exports = {
    getAds,
    setInteraction,
    editCost
}