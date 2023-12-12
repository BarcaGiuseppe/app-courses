/** @format */

let username = '';
let courses = []; // Array di oggetti con { id, srcImg, title, description, categories, author dove author corrisponde allo username loggato }

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

function editCourse({ id, title, description, srcImage, categories }) {
  courses.find(course => {
    if (course.id === id) {
      course.title = title;
      course.description = description;
      course.srcImage = srcImage;
      course.categories = categories;
    }
  });
}

function deleteCourse(id) {
  courses = courses.filter(course => {
    !(course.id === id);
  });
}

function detailCourse(id) {
  let course = courses.filter(course => course.id === id);
  return course;
}

function getCoursesByCategory(category) {
  let coursesCat = [];
  coursesCat = courses.filter(course => course.categories.find(elem => elem === category));
  return coursesCat;
}

function getCategories() {
  let categories = [];
  courses.forEach(course => {
    categories = [...new Set([...categories, ...course.categories])];
  });
  return categories;
}

const course = {
  title: 'ANGULAR for beginner',
  description: 'Corso per principianti',
  srcImage: 'https://m.media-amazon.com/images/I/71e3s6py2HL._AC_UF1000,1000_QL80_.jpg',
  categories: ['Programmazione'],
};
const course2 = {
  title: 'ANGULAR for beginner',
  description: 'Corso per principianti',
  srcImage: 'https://m.media-amazon.com/images/I/71e3s6py2HL._AC_UF1000,1000_QL80_.jpg',
  categories: ['Ciaone', 'Bellaa'],
};
const course3 = {
  title: 'ANGULAR for beginner',
  description: 'Corso per principianti',
  srcImage: 'https://m.media-amazon.com/images/I/71e3s6py2HL._AC_UF1000,1000_QL80_.jpg',
  categories: ['Ciaone', 'Programmazione'],
};
createCourse(course);
createCourse(course2);
createCourse(course3);
//editCourse(1, course);
//deleteCourse(1);
//console.log(getCategories());
//console.log(getCoursesByCategory('Programmazione'));
//console.log(detailCourse(1));
//console.log(courses);
//console.log(course2.categories.find(elem => elem === 'Ciaone'));
