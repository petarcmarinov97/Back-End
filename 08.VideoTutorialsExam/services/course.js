const Course = require('../models/Course');

//Създаване на Course
async function createCourse(courseData){
    const course = new Course(courseData);
    await course.save();

    return course;
}

//Взимане на всички Courses
async function getAllCourses(){
    const courses= await Course.find({}).lean();

    return courses;
}

//Взимане на Course по ID
async function getCourseById(id){
    const course = await Course.findById(id).lean();

    return course;
}

module.exports={
    createCourse,
    getAllCourses,
    getCourseById
}