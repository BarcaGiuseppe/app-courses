/** @format */

class MarketPlace {
  constructor() {
    this.courses = [];
  }

  // Aggiungi un corso
  addCourse(title, description, tag, img, files, author) {
    this.courses.push({
      id: Math.random().toString(16).slice(2) + Date.now().toString(16),
      title,
      description,
      tag,
      img,
      author,
      files,
    });
  }

  // Visualizza i dati di tutti i corsi nel marketplace
  viewCourses() {
    return this.courses;
  }

  // Modifica i dati di uno studente
  updateCourse(id, ...data) {
    const course = this.courses.find(s => s.id === id);

    if (data) {
      console.log('spread operator: ' + data);
    }
  }

  // Rimuovi uno studente dal registro
  removeCourse(id) {
    this.courses = this.courses.filter(s => !(s.id === id));
  }
}

// Esempio di utilizzo della classe
const registro = new RegistroClasse();

registro.aggiungiStudente('Mario', 'Rossi');
registro.aggiungiVoto('Mario', 'Rossi', 8, 'Math', '2023-01-10');
console.log(registro.visualizzaStudenti()); // Restituisce tutti gli studenti nel registro

registro.modificaStudente('Mario', 'Rossi', 'Luigi', 'Verdi');
console.log(registro.visualizzaStudenti()); // Restituisce tutti gli studenti nel registro dopo la modifica

registro.rimuoviStudente('Luigi', 'Verdi');
console.log(registro.visualizzaStudenti()); // Restituisce tutti gli studenti nel registro dopo la rimozione
