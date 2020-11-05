const myFilmListRef = document.querySelector('.js-movie-list');
// const btnWatched = document.querySelector('.my-film-library-page__btn_watched');
// const btnQueue = document.querySelector('.my-film-library-page__btn_queue');
const plugRef = document.querySelector('.plug');

const clearList = () => {
  myFilmListRef.innerHTML = '';
  plugRef.classList.remove('plug-show');
};

//создает li согласно макета, вешает на нее слушателем функцию activeDetailsPage

const createLibraryCardFunc = (imgPath, filmTitle, movieId, voteAverage) => {
  const listItem = document.createElement('li');
  listItem.classList.add('movie-list__item');

  listItem.addEventListener('click', () => {
    activeDetailsPage(movieId, true);
  });

  const link = document.createElement('a');
  link.classList.add('movie-list__link');
  link.href = '#';

  const img = document.createElement('img');
  img.classList.add('movie-list__image');
  img.src = `https://image.tmdb.org/t/p/original${imgPath}`;
  img.alt = filmTitle;

  const text = document.createElement('p');
  text.classList.add('movie-list__text');
  text.textContent = filmTitle;

  const vote = document.createElement('span');
  vote.classList.add('movie-list__vote');
  vote.textContent = voteAverage;

  link.append(img, text, vote);

  listItem.appendChild(link);
  return listItem;
};

//создаем функцию drawQueueFilmLis

const drawQueueFilmList = () => {
  const fragment = document.createDocumentFragment();
  const queueFilms = localStorage.getItem('filmsQueue');
  const parsedQueueFilms = JSON.parse(queueFilms);

  btnQueue.classList.add('active-btn');
  btnWatched.classList.remove('active-btn');

  if (queueFilms !== null && parsedQueueFilms.length !== 0) {
    parsedQueueFilms.map(({ backdrop_path, title, id, vote_average }) => {
      fragment.appendChild(
        createLibraryCardFunc(backdrop_path, title, id, vote_average),
      );
    });

    clearList();
    myFilmListRef.appendChild(fragment);

    return;
  }

  myFilmListRef.innerHTML = '';
  plugRef.textContent = '“You do not have to queue movies to watch. Add them.”';
  plugRef.classList.add('plug-show');
};

//создаем функцию drawWatchedFilmList

const drawWatchedFilmList = () => {
  const fragment = document.createDocumentFragment();
  const watchedFilms = localStorage.getItem('filmsWatched');
  const parsedWatchedFilms = JSON.parse(watchedFilms);

  btnQueue.classList.remove('active-btn');
  btnWatched.classList.add('active-btn');

  if (watchedFilms !== null && parsedWatchedFilms.length !== 0) {
    parsedWatchedFilms.map(({ id, backdrop_path, title, vote_average }) => {
      fragment.appendChild(
        createLibraryCardFunc(backdrop_path, title, id, vote_average),
      );
    });

    clearList();
    myFilmListRef.appendChild(fragment);
    return;
  }

  myFilmListRef.innerHTML = '';
  plugRef.textContent =
    '“You do not have to watched movies to watch. Add them.”';
  plugRef.classList.add('plug-show');
};
