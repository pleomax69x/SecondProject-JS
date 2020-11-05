'use strict';

//	Глобальные переменные
const apiKey = 'a983975bd7ff651e1c601fb29f627930';
const renderFilms = [];
const genres = [];
let pageNumber = 1;
//-----------------------
const movieListRef = document.querySelector('ul.movie-list');

function createCardFunc(imgPath, filmTitle, movieId) {
  const fragment = document.createDocumentFragment();

  const listItemRef = document.createElement('li');
  listItemRef.classList.add('movie-list__item');
  listItemRef.addEventListener('click', () => {
    activeDetailsPage(movieId, false);
  });

  const linkRef = document.createElement('a');
  linkRef.classList.add('movie-list__link');
  linkRef.href = '#';

  const imgRef = document.createElement('img');
  imgRef.classList.add('movie-list__image');
  imgRef.src = `https://image.tmdb.org/t/p/original${imgPath}`;
  if (imgPath === null) imgRef.src = '../images/No_image.png';
  imgRef.alt = filmTitle;

  const textRef = document.createElement('p');
  textRef.classList.add('movie-list__text');
  textRef.textContent = filmTitle;

  listItemRef.appendChild(linkRef);
  linkRef.appendChild(imgRef);
  linkRef.appendChild(textRef);
  fragment.appendChild(listItemRef);

  return fragment;
  // создаёт li согласно макета и вешает на неё слушателем функцию ActiveDetailsPage(movieId, itsLibraryFilm = false)
}

function fetchPopularMoviesList(pageNumber) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-Ru&page=${pageNumber}`;
  return fetch(url)
    .then(res => res.json())
    .then(({ results }) => {
      const listMarkup = document.createDocumentFragment();

      results.forEach(item => {
        renderFilms.push(item);
        listMarkup.appendChild(
          createCardFunc(item.backdrop_path, item.title, item.id),
        );
      });

      movieListRef.append(listMarkup);
    })
    .catch(console.log);
}

function fetchGenres() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

  return fetch(url)
    .then(res => res.json())
    .then(results => {
      results.genres.forEach(item => genres.push(item));
    });
  //Забирает жанры и кладёт их в переменную genres
}

fetchPopularMoviesList(pageNumber);
fetchGenres();
