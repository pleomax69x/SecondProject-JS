const homeRef = document.querySelector('.js-home');
const libraryRef = document.querySelector('.js-library');
const logoRef = document.querySelector('.site-logo');

// три секции main
const homePageRef = document.querySelector('#homePage_show');
const filmLibraryRef = document.querySelector('.js-filmLibrary');
const detailsPageRef = document.querySelector('#js-detailsPage');

// кнопки watched and queue с 5
const btnWatched = document.querySelector('.my-film-library-page__btn_watched');
const btnQueue = document.querySelector('.my-film-library-page__btn_queue');

//добавить удалить в очередь c 4
const addQueueButton = document.querySelector('#js-addQueueButton');
const addWatchedButton = document.querySelector('#js-addWatchedButton');

// глобальные переменные
let selectFilm;
function activeHomePage() {
  homePageRef.classList.remove('hide');
  filmLibraryRef.classList.add('hide');
  detailsPageRef.classList.add('hide');

  libraryRef.classList.remove('selectPage');
  homeRef.classList.add('selectPage');

  // fetchPopularMoviesList(pageNumber);
  // fetchGenres();

  pagination.addEventListener('click', plaginationNavigation);
  form.addEventListener('submit', searchFilms);

  // section detailsPage
  addWatchedButton.removeEventListener('click', toggleToWatched);
  addQueueButton.removeEventListener('click', toggleToQueue);
  // section libraryPage
  btnWatched.removeEventListener('click', drawWatchedFilmList);
  btnQueue.removeEventListener('click', drawQueueFilmList);
}

function activeLibraryPage() {
  homePageRef.classList.add('hide');
  filmLibraryRef.classList.remove('hide');
  detailsPageRef.classList.add('hide');

  libraryRef.classList.add('selectPage');
  homeRef.classList.remove('selectPage');

  btnQueue.classList.add('active-btn');
  drawQueueFilmList();

  btnWatched.addEventListener('click', drawWatchedFilmList);
  btnQueue.addEventListener('click', drawQueueFilmList);

  // section activeHomePage
  pagination.removeEventListener('click', plaginationNavigation);
  form.removeEventListener('submit', searchFilms);
  // section detailsPage
  addWatchedButton.removeEventListener('click', toggleToWatched);
  addQueueButton.removeEventListener('click', toggleToQueue);
}

function activeDetailsPage(movieId, bool) {
  homePageRef.classList.add('hide');
  filmLibraryRef.classList.add('hide');
  detailsPageRef.classList.remove('hide');

  // selectFilm заполнить обьектом в зависимости либ или вотчед

  selectFilm = renderFilms.find(el => el.id === movieId);
  selectFilm.itsLibraryFilm = bool;

  showDetails(selectFilm);

  addWatchedButton.addEventListener('click', toggleToWatched);
  addQueueButton.addEventListener('click', toggleToQueue);

  // section activeHomePage
  pagination.removeEventListener('click', plaginationNavigation);
  form.removeEventListener('submit', searchFilms);
  // section libraryPage
  btnWatched.removeEventListener('click', drawWatchedFilmList);
  btnQueue.removeEventListener('click', drawQueueFilmList);
}

logoRef.addEventListener('click', activeHomePage);
homeRef.addEventListener('click', activeHomePage);
libraryRef.addEventListener('click', activeLibraryPage);

activeHomePage();

const btnUpRef = document.querySelector('.btn_up');
btnUpRef.addEventListener('click', goUp);
function goUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// console.log(innerWidth);
// innerWidth < 768;
