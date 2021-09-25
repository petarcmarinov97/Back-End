const mongoose=require('mongoose');
start();

async function start(){
    const connectionStr='mongodb://localhost:27017/myDB';
    const client=await mongoose.connect(connectionStr,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });

    console.log('Database connected');

    //Създаваме как да изглежда модела на котката
    const catSchema= new mongoose.Schema({
        name:{type: String, required: true, unique:true},
        color:{type: String, required: true}
    });

    //Създаваме модел за една котка
    const Cat=mongoose.model('Cat', catSchema);
    
    //Създаваме нова котка по модела Cat, възприемаме го като клас
    const personSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        age: {
            type:Number,
            min:[0,'Age cannot be negative!']
        }
    });

    //Създаване на свойство fullName(property), което няма да влезе в базата данни
    personSchema.virtual('fullName').get(function(){
        return `${this.firstName} ${this.age}`;
    })

    //Закачаме функция/метод към методите, които могат да бъдат извикани 
    personSchema.methods.sayHi=function(){
        console.log(`My name is ${this.firstName} and I am ${this.age} years old.`);
    }
    
    const Person=mongoose.model('Person', personSchema);

    const person= new Person({
        age:-5
    })

    //Улавяне на грешно въведени полета
    try{
        await person.save();
    }catch(err){
        console.log('Caught the error');
        console.error('>>>', err.message);
    }

    /*
    //Взимаме данните !
    const people = await Person.find({});

    //Извикване на метода sayHi(method)
    people.forEach(p => p.sayHi());

    //Извикване на свойството fullName(property)
    people.map(p =>p.fullName).forEach(n => console.log(n));
    */

};