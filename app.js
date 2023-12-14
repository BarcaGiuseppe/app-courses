/** @format */

let username = '';
let courses = JSON.parse(localStorage.getItem('courses')) ? JSON.parse(localStorage.getItem('courses')) : []; // Array di oggetti con { id, srcImg, title, description, categories, author dove author corrisponde allo username loggato }
function createCourse({ title, description, srcImage, categories }) {
  courses.push({
    id: courses.length + 1,
    title,
    description,
    author: username,
    srcImage,
    categories,
  });
  localStorage.setItem('course', JSON.stringify(courses));
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
  console.log('aggiornato');
  localStorage.setItem('course', JSON.stringify(courses));
}

function deleteCourse(id) {
  courses = courses.filter(course => {
    return !(course.id === id);
  });
  console.log('eliminato');
  localStorage.setItem('course', JSON.stringify(courses));
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

//funzione che si occupa del login, nasconde il login e mostra logout e add
function showAdditionalButton() {
  const addButton = document.getElementById('addButton');
  const logoutButton = document.getElementById('logoutButton');
  const loginButton = document.getElementById('loginButton');
  const inputForm = document.getElementById('inputForm');
  addButton.style.display = addButton.style.display === 'none' ? 'block' : 'none';
  loginButton.style.display = loginButton.style.display === 'none' ? 'block' : 'none';
  logoutButton.style.display = logoutButton.style.display === 'block' ? 'none' : 'block';
  if (addButton.style.display === 'block') {
    inputForm.setAttribute('readonly', 'true');
    username = inputForm.value;
  } else {
    inputForm.removeAttribute('readonly');
    username = '';
  }
  populateHome();
}

//funzione chiamata onsubmit form add
function addCourse(event) {
  event.preventDefault();
  const saveButton = document.getElementById('saveButton');
  var title = document.getElementById('fTitle').value;
  var description = document.getElementById('fDescription').value;
  var srcImage = document.getElementById('fSrcImage').value;
  var categories = document.getElementById('fCategories').value;
  createCourse({ title: title, description: description, srcImage: srcImage, categories: categories.split(', ') });
  // Azzerare i valori dei campi dopo l'invio del form
  document.getElementById('fTitle').value = '';
  document.getElementById('fDescription').value = '';
  document.getElementById('fSrcImage').value = '';
  document.getElementById('fCategories').value = '';
  // Chiude la modale, jquery
  $('#exampleModal').modal('hide');
  populateHome();
}

function populateHome() {
  // carico elementi home
  const container = document.querySelector('.divModalDetails');
  container.innerHTML = '';
  let categories = getCategories();
  let coursesByCategory = '';
  if (categories.length > 0) {
    categories.forEach((elem, categoryIndex) => {
      coursesByCategory = getCoursesByCategory(elem);
      container.innerHTML += `<div><h4>${elem}</h4></div>`;
      let textHTML = `<div class="row">`;
      coursesByCategory.forEach((course, courseIndex) => {
        let obj = {
          title: course.title,
          description: course.description,
          srcImage: course.srcImage,
          categories: course.categories,
        };
        textHTML += `<div class="col-sm-3">
            <div class="card">
              <img
                class="card-img-top"
                src="${course.srcImage}"
                alt="IMG Course"
              />
              <div class="card-body">
                <h5 class="card-title">${course.title}</h5>
                <p class="card-text">${course.description.substring(0, 20) + '...'}</p>
                <button class="btn btn-primary my-2 my-sm-0" type="button" data-toggle="modal" data-target="#myModalDetail">Details</button>
              </div>
            </div>`;
        if (course.author === username) {
          textHTML += `<!-- Modal -->
            <div class="modal fade" id="myModalDetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="myModalLabel">Course Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="p-content">
                      <img
                      class="img-fluid"
                      src="${course.srcImage}"
                      alt="IMG Course"
                      style="max-width: 50%; height: auto;"
                      id="course-srcimage"
                      />
                      <p id="course-title">${course.title}</p>
                      <p id="course-description">Description: ${course.description}</p>
                      <p>Author: ${course.author}</p>
                      <p id="course-categories">Categories: ${course.categories.toString().replace(',', ', ')}</p>
                      <button type="button" class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#myModalUpdate" onclick="toggleView('${
                        course.id
                      }','${course.title}', '${course.description}', '${course.srcImage}', '${course.categories
                        .toString()
                        .replace(',', ', ')}')">Edit Course</button>
                      <button type="button" class="btn btn-danger" onclick="deleteC(${
                        course.id
                      })" data-dismiss="modal">Delete</button>
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        } else {
          textHTML += `<!-- Modal -->
            <div class="modal fade" id="myModal${categoryIndex}-${courseIndex}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="myModalLabel">Course Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="p-content">
                      <img
                      class="img-fluid"
                      src="${course.srcImage}"
                      alt="IMG Course"
                      style="max-width: 50%; height: auto;"
                      id="course-srcimage"
                      />
                      <p id="course-title">${course.title}</p>
                      <p id="course-description">Description: ${course.description}</p>
                      <p>Author: ${course.author}</p>
                      <p id="course-categories">Categories: ${course.categories.toString().replace(',', ', ')}</p>
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        }
      });
      textHTML += `</div>`;
      container.innerHTML += textHTML;
    });
  }
}

function deleteC(id) {
  console.log(id);
  deleteCourse(id);
  populateHome();
}
function toggleView(id, title, description, srcImage, categories) {
  const divModalEdit = document.getElementById('divModalEdit');
  divModalEdit.innerHTML = `<!-- Modal -->
  <div class="modal fade" id="myModalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="myModalLabel">Course Update</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <form id="editForm">
        <div class="form-group">
          <label for="editTitle">Title:</label>
          <input type="text" class="form-control" id="editTitle" value="${title}">
        </div>
        <div class="form-group">
          <label for="editDescription">Description:</label>
          <textarea class="form-control" id="editDescription">${description}</textarea>
        </div>
        <div class="form-group">
          <label for="editSrcImage">SrcImage:</label>
          <textarea class="form-control" id="editSrcImage">${srcImage}</textarea>
        </div>
        <div class="form-group">
          <label for="editCategories">Categories:</label>
          <textarea class="form-control" id="editCategories">${categories}</textarea>
        </div>
        <button type="button" class="btn btn-primary" onclick="saveChanges(${id})" data-dismiss="modal">Save Changes</button>
        <button type="button" class="btn btn-secondary"  data-dismiss="modal">Abort</button>
      </form>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function saveChanges(id) {
  const newTitle = document.getElementById('editTitle').value;
  const newDescription = document.getElementById('editDescription').value;
  const newSrcImage = document.getElementById('editSrcImage').value;
  const newCategories = document.getElementById('editCategories').value.split(', ');
  console.log('siamo in saveChanges' + id);
  editCourse({
    id: id,
    title: newTitle,
    description: newDescription,
    srcImage: newSrcImage,
    categories: newCategories,
  });
  populateHome();
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('loginButton').addEventListener('click', function () {
    validateForm();
  });

  function validateForm() {
    var inputField = document.getElementById('inputForm');
    var loginButton = document.getElementById('loginButton');

    if (inputField.value.trim() === '') {
      alert('Il campo non può essere vuoto!');
    } else if (inputField.value.length > 10) {
      alert('Il campo non può contenere più di 10 caratteri!');
    } else {
      showAdditionalButton();
    }
  }
  document.getElementById('logoutButton').addEventListener('click', function () {
    showAdditionalButton();
  });

  populateHome();
});
