//
const homeRef = document.querySelector('.js-home');
const libraryRef = document.querySelector('.js-library');

// три секции main
const homePageRef = document.querySelector('.homePage');
const filmLibraryRef = document.querySelector('.filmLibrary');
const detailsPageRef = document.querySelector('.detailsPage');

// кнопки watched and queue
const watchedRef = document.querySelector('.js-watched');
const queueRef = document.querySelector('.js-queue');

// пагинация
const prevRef = document.querySelector('prev');
const nextRef = document.querySelector('next');

//добавить удалить в очередь !!!!!!!!!!!!!!!!!! добавить селектор
// const addRemoveWatchedRef = document.querySelector('!!!!!!');
// const addRemoveQueueRef = document.querySelector('!!!!!!');

// глобальные переменные
const selectFilm = {};

function activeHomePage() {
  homePageRef.classList.remove('hide');
  filmLibraryRef.classList.add('hide');
  detailsPageRef.classList.add('hide');

  //   prevRef.addEventListener('click', call_prev_func);
  //   nextRef.addEventListener('click', call_next_func);
  // удалить ненужных 4 слушателя
}

function activeLibraryPage() {
  homePageRef.classList.add('hide');
  filmLibraryRef.classList.remove('hide');
  detailsPageRef.classList.add('hide');

  libraryRef.classList.add('selectPage');

  // drawQueueFilmList();
  queueRef.classList.add('active');
}

function activeDetailsPage() {
  homePageRef.classList.add('hide');
  filmLibraryRef.classList.add('hide');
  detailsPageRef.classList.remove('hide');
}

// activeHomePage();
activeLibraryPage();
// console.log(filmLibraryRef);
