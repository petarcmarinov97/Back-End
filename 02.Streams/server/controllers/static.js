const fs = require('fs');

module.exports = (req, res) => {
    const filename = req.url.slice(8);
    const file = fs.createReadStream(`./static/${filename}`);
    let type;
    if (filename.endsWith('css')) {
        type = 'text/css';
    } else if (filename.endsWith('jpg') || filename.endsWith('jpeg')) {
        type = 'image/jpeg';
    } else if (filename.endsWith('png')) {
        type = 'image/png';
    }

    file.on('error', () => {
        res.statusCode = 404;
        res.write('Not Found');
        res.end();
    });

    file.once('data', data => {
        res.writeHead(200, {
            'Content-Type': type
        });
        send(data);
        file.on('data', send);
    });
    file.on('end', () => res.end());

    function send(data) {
        res.write(data);
    }
};