//
const homeRef = document.querySelector('.js-home');
const libraryRef = document.querySelector('.js-library');
const logoRef = document.querySelector('.site-logo');

// три секции main
const homePageRef = document.querySelector('.homePage');
const filmLibraryRef = document.querySelector('.filmLibrary');
const detailsPageRef = document.querySelector('.detailsPage');

// кнопки watched and queue
const watchedRef = document.querySelector('.js-watched');
const queueRef = document.querySelector('.js-queue');

// пагинация потом удалить была сделана ранее
// const prevRef = document.querySelector('prev');
// const nextRef = document.querySelector('next');
// prevBtn;
// nextBtn;

//добавить удалить в очередь !!!!!!!!!!!!!!!!!! добавить селектор
// const addRemoveWatchedRef = document.querySelector('!!!!!!');
// const addRemoveQueueRef = document.querySelector('!!!!!!');

// глобальные переменные
const selectFilm = {};

function activeHomePage() {
  homePageRef.classList.remove('hide');
  filmLibraryRef.classList.add('hide');
  detailsPageRef.classList.add('hide');

  libraryRef.classList.remove('selectPage');
  homeRef.classList.add('selectPage');

  //   prevRef.addEventListener('click', call_prev_func);
  //   nextRef.addEventListener('click', call_next_func);

  // pagination.addEventListener('click', plaginationNavigation);
  // убрать со 2 файла 19 строка

  // удалить ненужных 4 слушателя
  // 1 addRemove from detailPage
  // 2 addRemove from detailPage
  // 3 watched from lib
  // 4 queue from lib
}

function activeLibraryPage() {
  homePageRef.classList.add('hide');
  filmLibraryRef.classList.remove('hide');
  detailsPageRef.classList.add('hide');

  libraryRef.classList.add('selectPage');
  homeRef.classList.remove('selectPage');

  // drawQueueFilmList();

  //  пересмотреть скорее всего отпала надобность
  // queueRef.classList.add('active');

  // watchedRef.addEventListener('click', fShowWatced);
  // queueRef.addEventListener('click', fShowQueue);

  // delete 4 listener
  // pagination 1
  // pagination.removeEventListener('click', plaginationNavigation);
  // form 2
  // form.removeEventListener('submit', searchFilms);
  // 3 addRemoveWatched
  // 4 addRemoveQueue
}

function activeDetailsPage(movieId, bool) {
  homePageRef.classList.add('hide');
  filmLibraryRef.classList.add('hide');
  detailsPageRef.classList.remove('hide');

  // selectFilm заполнить обьектом в зависимости либ или вотчед
  selectFilm.movieId = movieId;
  selectFilm.itsLibraryFilm = bool;

  showDetails(selectFilm);

  // addRemoveWatchedRef.addEventListener('click', addRemove);
  // addRemoveQueueRef.addEventListener('click', addRemove);

  // remove 4 listener
  // pagination 1
  // pagination.removeEventListener('click', plaginationNavigation);
  // form 2
  // form.removeEventListener('submit', searchFilms);
  // 3 watched from lib
  // 4 queue from lib
}

logoRef.addEventListener('click', activeHomePage);
homeRef.addEventListener('click', activeHomePage);
libraryRef.addEventListener('click', activeLibraryPage);

activeHomePage();
// activeLibraryPage();
// activeDetailsPage();
// console.log(filmLibraryRef);

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
