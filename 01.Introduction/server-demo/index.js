const http = require('http');

const router = require('./router');

const aboutController = require('./controllers/aboutController');
const homeController = require('./controllers/homeController');
const catalogController = require('./controllers/catalogController');
const createController = require('./controllers/createController');
const deleteController = require('./controllers/deleteController');
const uploadController = require('./controllers/uploadController');

router.get('/', homeController);
router.get('/catalog', catalogController);
router.get('/about', aboutController);

router.post('/create', createController);

router.get('/delete', deleteController);

router.post('/upload', uploadController);

const port = 3000;
const server = http.createServer(requestHandler);

function requestHandler(req, res) {
    const url = new URL(req.url, 'http://localhost');
    console.log('>>>', req.method, req.url);
    const handler = router.match(req.method, url.pathname);
    handler(req, res);
}

server.listen(port, () => console.log('Server listenning on port ' + port));