const Course = require('../models/Course');
const User = require('../models/User');

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

async function editCourse( id, courseData ){
    const course = await Course.findById(id);

    course.title = courseData.title;
    course.imageUrl = courseData.imageUrl;
    course.description = courseData.description;
    course.isPrivate = courseData.isPrivate;
    
    return course.save();
}

async function deleteCourse(id){
    return Course.findByIdAndDelete(id)
}

async function enrollCourse( courseId, userId ){
    const user = await User.findById( userId );
    console.log(user);

    const course = await Course.findById(courseId);

    if(user._id == course.owner ){
        throw new Error('Cannot book your own Course!');
    }

    user.enrolledCourses.push(course);
    course.usersEnrolled.push(user);

    return Promise.all([user.save(), course.save()]);
}

module.exports={
    createCourse,
    getAllCourses,
    getCourseById,
    editCourse,
    deleteCourse,
    enrollCourse,
}