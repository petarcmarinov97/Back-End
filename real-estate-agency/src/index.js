const express = require('express');

const { PORT } = require('./constants');
const routes = require('./routes')
const { initDatabase } = require('./config/database-config');

const app = express();

require('./config/express-config')(app);
require('./config/hbs-config')(app);
// const hbsConfig = require('./config/hbs-config');
// hbsConfig(app);

app.use(routes);
initDatabase()
    .then(() =>{
        app.listen(PORT, () => console.log(`The app is running on http://localhost:${PORT}/`));
    })
    .catch(err => {
        console.log('Cannot connect database: ', err);
    })
