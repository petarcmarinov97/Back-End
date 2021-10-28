const Housing = require('../models/Housing');

exports.create = (housingData) => Housing.create(housingData);

//Take top tree in desending and take the first 3 of them
exports.getTopHouses = () => Housing.find().sort({createdAt: -1}).limit(3).lean();

//Get All Posts
exports.getAll = () => Housing.find().lean();

//Get One By Id
exports.getOne = (housingId) => Housing.findById(housingId).populate('tenants');

//Add tenant
exports.addTenant = async (housingId, tenantId) => {
    //let housing = await housingService.getOne(req.params.housingId);
    //housing.tenants.push(req.user._id);

    return Housing.findOneAndUpdate(
        {_id: housingId},
        {   $push: {tenants: tenantId},
            $inc: { availablePieces: -1 }
        });
}

//Delete housing by Id
exports.delete = (housingId) => Housing.findByIdAndDelete(housingId);

//Update housing by Id and the new Data
exports.updateOne = (housingId, housingData) => Housing.findByIdAndUpdate(housingId, housingData);