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
function showAdditionalButton() {
  /* Crea un nuovo elemento pulsante
  var additionalButton = document.createElement('button');
  additionalButton.className = 'btn btn-outline-primary my-2 my-sm-0';
  additionalButton.type = 'button';
  additionalButton.textContent = 'Nuovo Pulsante';

  // Inserisci il nuovo pulsante prima del form nel DOM
  var form = document.getElementById('loginForm');
  form.parentNode.insertBefore(additionalButton, form);*/
  const addButton = document.getElementById('addButton');
  const logoutButton = document.getElementById('logoutButton');
  const loginButton = document.getElementById('loginButton');
  const inputForm = document.getElementById('inputForm');
  addButton.style.display = 'block';
  loginButton.style.display = 'none';
  logoutButton.style.display = 'block';
  inputForm.setAttribute('readonly', 'true');
}

function addCourse(event) {
  event.preventDefault();
  const saveButton = document.getElementById('saveButton');
  //saveButton.setAttribute('data-dismiss', 'modal');
  // Ottieni i valori dai campi di input e text area
  var title = document.getElementById('fTitle').value;
  var description = document.getElementById('fDescription').value;
  var srcImage = document.getElementById('fSrcImage').value;
  var categories = document.getElementById('fCategories').value;

  // Aggiungi qui la logica per utilizzare i valori (ad esempio, aggiungi il corso)
  createCourse({ title: title, description: description, srcImage: srcImage, categories: categories.split(', ') });
  // Azzerare i valori dei campi dopo l'invio del form
  document.getElementById('fTitle').value = '';
  document.getElementById('fDescription').value = '';
  document.getElementById('fSrcImage').value = '';
  document.getElementById('fCategories').value = '';

  // Chiudi la modale
  $('#exampleModal').modal('hide');
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('loginButton').addEventListener('click', function () {
    validateForm();
    //showAdditionalButton();
  });

  function validateForm() {
    var inputField = document.getElementById('inputForm');
    var loginButton = document.getElementById('loginButton');

    // Verifica se il campo di input è vuoto
    if (inputField.value.trim() === '') {
      // Mostra un alert
      alert('Il campo non può essere vuoto!');

      // Disabilita il pulsante di login
      //loginButton.disabled = true;
    } else if (inputField.value.length > 10) {
      // Verifica se il campo di input supera la lunghezza massima consentita
      // Mostra un alert
      alert('Il campo non può contenere più di 10 caratteri!');

      // Disabilita il pulsante di login
      //loginButton.disabled = true;
    } else {
      // Abilita il pulsante di login
      //loginButton.disabled = false;
      //alert('apposto');
      // Invia il modulo manualmente
      //document.getElementById('loginForm').submit();
      showAdditionalButton();
    }
  }
});
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
