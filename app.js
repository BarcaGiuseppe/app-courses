/** @format */

let username = '';
const courses = []; // Array di oggetti con { id, srcImg, title, description, categories, author dove author corrisponde allo username loggato }

function createCourse({ title, description, srcImage, categories }) {
  courses.push({
    id: courses.length + 1,
    title,
    description,
    author: username,
    srcImage,
    categories,
  });
}

function editCourse({ id, title, description, srcImage, categories }) {}

function deleteCourse(id) {}

function detailCourse(id) {}

function getCoursesByCategory(category) {}

function getCategories() {}

const course = {
  title: 'HTML for beginner',
  description: 'Corso per principianti',
  srcImage: 'https://m.media-amazon.com/images/I/71e3s6py2HL._AC_UF1000,1000_QL80_.jpg',
  categories: 'Programmazione',
};
createCourse(course);

console.log(courses);
