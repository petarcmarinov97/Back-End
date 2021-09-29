const router = require('express').Router();

router.get('/',async (req, res) =>{
    const plays = await req.storage.getAllPlays();
    res.render('home',{ plays });
})

router.get('/sort', async (req,res) =>{
    const plays = await req.storage.getAllPlaysSorted();
    res.render('home', { plays });
})

module.exports = router;