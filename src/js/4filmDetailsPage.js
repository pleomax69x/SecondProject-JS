// const addQueueButton = document.querySelector('#js-addQueueButton');
// const addWatchedButton = document.querySelector('#js-addWatchedButton');
const addRemoveWatched = document.querySelector ('.addRemoveWatched');
const addRemoveQueue = document.querySelector ('.addRemoveQueue');


function toggleToQueue() {
  let filmsQueueArr = [];
  let localStorageData = localStorage.getItem('filmsQueue');
  if (localStorageData !== null) {
    filmsQueueArr.push(...JSON.parse(localStorageData));
  }
  if (filmsQueueArr.find(el => el.id === selectFilm.id)) {
    filmsQueueArr = filmsQueueArr.filter(el => el.id !== selectFilm.id);
  } else {
    filmsQueueArr.push(selectFilm);
  }
  localStorage.setItem('filmsQueue', JSON.stringify(filmsQueueArr));
  monitorButtonStatusText();
}

function toggleToWatched() {
  let filmsWatchedArr = [];
  let localStorageData = localStorage.getItem('filmsWatched');
  if (localStorageData !== null) {
    filmsWatchedArr.push(...JSON.parse(localStorageData));
  }
  if (filmsWatchedArr.find(el => el.id === selectFilm.id)) {
    filmsWatchedArr = filmsWatchedArr.filter(el => el.id !== selectFilm.id);
  } else {
    filmsWatchedArr.push(selectFilm);
  }
  localStorage.setItem('filmsWatched', JSON.stringify(filmsWatchedArr));
  monitorButtonStatusText();
}

function showDetails(selectFilm) {
  let img = document.querySelector('.detailsImg');

  img.setAttribute(
    'src',
    `https://image.tmdb.org/t/p/w500${selectFilm.poster_path}`,
  );

  let title = document.querySelector('#js-detailsTitle');
  title.textContent = selectFilm.title;

  let tdVote = document.querySelector('#js-vote');
  tdVote.textContent = selectFilm.vote_average;

  let tdPopularity = document.querySelector('#js-popularity');
  tdPopularity.textContent = selectFilm.popularity;

  let tdOriginalTitle = document.querySelector('#js-originalTitle');
  tdOriginalTitle.textContent = selectFilm.original_title;

  let tdGenre = document.querySelector('#js-genre');
  tdGenre.textContent = String(
    genres
      .filter(el =>
        selectFilm.genre_ids.find(item => (el.id === item ? true : false)),
      )
      .reduce((acc, item) => acc + `${item.name}, `, ''),
  ).slice(0, -2);

  let detailsAboutText = document.querySelector('#js-detailsAboutText');
  detailsAboutText.textContent = selectFilm.overview;
  monitorButtonStatusText();
}

function monitorButtonStatusText() {
  let localStorageFilmsQueue = localStorage.getItem('filmsQueue');
  addRemove(localStorageFilmsQueue, 'queue', addRemoveQueue);
  
   let localStorageFilmsWatched = localStorage.getItem('filmsWatched');
  addRemove(localStorageFilmsWatched, 'watched', addRemoveWatched);
}

function addRemove(localStorageKey, textReplacement, selectorElem) {
  localStorageKey === null
    ? (selectorElem.textContent = `Add to ${textReplacement}`)
    : JSON.parse(localStorageKey).find(el => el.id === selectFilm.id)
    ? (selectorElem.textContent = `Delete from ${textReplacement}`)
    : (selectorElem.textContent = `Add to ${textReplacement}`);
}


