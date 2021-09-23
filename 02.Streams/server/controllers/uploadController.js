const fs = require('fs/promises');
const formidable = require('formidable');


module.exports = (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        const filePath = files['uploaded-file'].path;
        const name = files['uploaded-file'].name;
        const targetPath = './uploads/' + name;

        await fs.rename(filePath, targetPath);

        res.writeHead(301, {
            'Location': '/catalog'
        });
        res.end();
    });
    // const target = fs.createWriteStream('./uploads/demo.txt');
    // req.on('data', data => console.log('>>>', data.toString()));
    // req.pipe(target);
};