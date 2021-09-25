const { MongoClient }=require('mongodb');

const connectionStr='mongodb://localhost:27017';

const client=new MongoClient(connectionStr, {
    useUnifiedTopology:true
});

client.connect(async (err) => {
    if(err != null){
        console.log('Something unexpected happened!');
        return;
    }

    console.log('Database connected');

    //Избиране базата данни myDB
    const db = client.db('myDB');
    
    //Избиране колекцията в базата данни courses
    const collection=db.collection('courses');

    //Търсене на определени данни без да слагаме филтриране
    const data = await collection.find({}).toArray();
    console.log(data);
    
    /*
        Ако не е async функция

        collection.find({}).toArray((err,data) => {
        console.log(data);
    });
    */
});


