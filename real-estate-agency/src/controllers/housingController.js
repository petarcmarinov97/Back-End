const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');

const housingService = require('../services/housingService');

//Get All Housings and Render Them
router.get('/', async ( req, res ) => {
    let housings = await housingService.getAll();

    res.render('housing', { housings });
})

//Get Create form for Housing
router.get('/create', isAuth, ( req, res ) => {
    res.render('housing/create');
})

//Create Housing
router.post('/create', isAuth, async ( req, res ) => {
    try{
        await housingService.create({...req.body, owner: req.user._id});
        
        res.redirect('/housing');
    }catch(error){
        res.render('housing/create', {error: getErrorMessage(error) } )
    }

})

//Get Housing's Details
router.get('/:housingId/details', async ( req, res ) => {
    let housing = await housingService.getOne(req.params.housingId);
    let housingData = await housing.toObject();
    
    let isOwner = housingData.owner == req.user?._id;

    let tenants = housing.getTenants();

    let isAvailable = housing.availablePieces > 0;
    let isRented = housing.tenants.some(x => x._id == req.user._id);

    res.render('housing/details', { ...housingData, isOwner, tenants, isAvailable, isRented })
})

//Add Tenant to a Housing
router.get('/:housingId/rent', isOwner, async ( req, res ) => {
    await housingService.addTenant( req.params.housingId, req.user._id );

    res.redirect(`/housing/${req.params.housingId}/details`);
});

//Delete Housing
router.get('/:housingId/delete', notOwner, async ( req, res ) => {
    await housingService.delete(req.params.housingId);

    res.redirect('/housing')
})

//Edit Housing
router.get('/:housingId/edit', notOwner, async ( req, res ) => {
    let housing = await housingService.getOne(req.params.housingId);

    res.render('housing/edit', {...housing.toObject()});
})

router.post('/:housingId/edit', notOwner, async ( req, res ) => {
    await housingService.updateOne(req.params.housingId, req.body);

    res.redirect(`/housing/${req.params.housingId}/details`)
})

async function isOwner( req, res, next ){

    let housing = await housingService.getOne(req.params.housingId);

    if(housing.owner == req.user._id){
        res.redirect(`/housing/${req.params.housingId}/details`);
    }else{
        next();
    }
}

async function notOwner( req, res, next ){

    let housing = await housingService.getOne(req.params.housingId);

    if(housing.owner != req.user._id){
        next();
    }else{
        res.redirect(`/housing/${req.params.housingId}/details`);

    }
}

function getErrorMessage(error){
    let errorNames = Object.keys(error.errors)
    if ( errorNames.length > 0 ){
        return error.errors[errorNames[0]]
    }else{
        return error.message
    }
}

module.exports = router;