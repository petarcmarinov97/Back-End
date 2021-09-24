//Its our middleware that have a job with the database

// [] Load and parse data file
// [] Provide Ability to:
    // [] - read all entries
    // [] - read single entry by ID
    // [] - add new entry
    // * [] - get matching entries by search criteria

const fs=require('fs/promises');
const uniqid=require('uniqid');

let data={};

/* Model structure */
/*
{
    "name":"string",
    "description":"string",
    "imageUrl":"string",
    "difficulty":"number"
    }
*/

async function init(){
    try{
        data = JSON.parse(await fs.readFile('./models/data.json'));
    }catch(err){
        console.error('Error reading database');
    }

    return (req, res, next) => {
        req.storage={
            getAll,
            getById,
            create,
            edit
        };
        next();
    };
}

async function getAll(query){
    let cubes=Object
    .entries(data)
    .map(([id, v]) => Object.assign({},{ id },v));

    //filter cubes by query params
    if(query.search){
        cubes = cubes.filter(c => c.name.toLowerCase().includes(query.search.toLowerCase()));
    }
    if(query.from){
        cubes=cubes.filter(c => c.difficulty >= Number(query.from))
    }
    if(query.to){
        cubes=cubes.filter(c => c.difficulty <= Number(query.to))
    }

    return cubes;
}

async function getById(id){
    const cube= data[id];
    if(cube){
        return Object.assign({},{ id }, cube);
    }else{
        return undefined;
    }
}

async function create(cube){
    const id=uniqid();
    data[id]=cube;
    await persist();
}

async function edit(id, cube){
    if(!data[id]){
        throw new ReferenceError(' No such ID in database');
    }
    data[id] = cube;
    
    await persist();
}

async function persist(){
    try{
        await fs.writeFile('./models/data.json',JSON.stringify(data, null, 2));
        console.log('>>> created new record');
    }catch(err){
        console.error('Error writing out database');
    }
}

//If we need them in the future
module.exports={
    init,
    getAll,
    getById,
    create,
    edit
}