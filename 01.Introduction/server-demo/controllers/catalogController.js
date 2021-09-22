const database = require('../util/database');
const { layout, render } = require('../util/template');

module.exports = async (req, res) => {
    const catalogPage = await render('catalog' , {
        items: Object.entries(database.database).map(([id, i]) => `<li data-id="${id}">${i.name} - ${i.serial} <a href="/delete?id=${id}">[Delete]</a></li>`).join('')
    });
    res.write(await layout(catalogPage, 'Catalog'));
    res.end();
};