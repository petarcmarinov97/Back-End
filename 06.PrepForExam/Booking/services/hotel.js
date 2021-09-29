const Hotel = require('../models/Hotel');

//Създаване на хотел
async function createHotel(hotelData){
    const hotel = new Hotel(hotelData);
    await hotel.save();

    return hotel;
}

//Взимане на всички хотели
async function getAllHotels(){
    const hotels= await Hotel.find({}).lean();

    return hotels;
}

//Взимане на хотел по ID
async function getHotelById(id){
    const hotel = await Hotel.findById(id).lean();

    return hotel;
}

module.exports={
    createHotel,
    getAllHotels,
    getHotelById
}