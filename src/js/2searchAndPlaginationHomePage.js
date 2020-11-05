const form = document.querySelector('#homePage__search');
const input = document.querySelector('#homePage__search-input');

const pagination = document.getElementById('homePage__pagination');
const prevBtn = pagination.querySelector('[data-action = "prev"]');
const nextBtn = pagination.querySelector('[data-action = "next"]');
const pageValue = pagination.querySelector('.homePage__value');

let inputValue = '';

pageValue.textContent = pageNumber;
const errorMessage = document.createElement('p');
errorMessage.setAttribute('id', 'homePage__search-error-message');
errorMessage.textContent = 'Sorry, no movie matches your request';
errorMessage.hidden = true;

form.append(errorMessage);

function plaginationNavigation(evt) {
  const target = evt.target;

  if (pageNumber === 2) {
    prevBtn.classList.add('hidden');
  }

  if (target === prevBtn) {
    pageNumber -= 1;
    pageValue.textContent = pageNumber;
    if (inputValue === '') {
      // jsList.innerHTML = '';
      movieListRef.innerHTML = '';

      fetchPopularMoviesList(pageNumber);
    } else {
      fetchFilms(inputValue, pageNumber);
    }
  }

  if (target === nextBtn) {
    pageNumber += 1;
    pageValue.textContent = pageNumber;
    prevBtn.classList.remove('hidden');

    if (inputValue === '') {
      // jsList.innerHTML = '';
      movieListRef.innerHTML = '';
      fetchPopularMoviesList(pageNumber);
    } else {
      fetchFilms(inputValue, pageNumber);
    }
  }
}

// начало нового кода
function searchFilms(evt) {
  pageNumber = 1;
  evt.preventDefault();
  errorMessage.hidden = true;
  inputValue = input.value;
  if (inputValue === '') {
    // jsList.innerHTML = '';
    movieListRef.innerHTML = '';
    fetchPopularMoviesList();
  } else {
    fetchFilms(inputValue, pageNumber);
  }
}
// конец нового кода

function fetchFilms(inputValue, pageNumber) {
  if (inputValue === '') {
    // return fetchPopularMoviesList(pageNumber);
    fetchPopularMoviesList();
  }

  // let API;
  // if (inputValue == '') {
  //   API = ` `;
  // } else {
  //   API = `
  //   `;
  // }

  // const API = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-Ru&page=${pageNumber}`;
  const API = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${inputValue}&page=${pageNumber}&include_adult=false`;

  fetch(API)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const arr = data.results;
      console.log(arr);
      if (inputValue !== '' && arr.length === 0) {
        errorMessage.hidden = false;
        fetchPopularMoviesList();
      }

      // jsList.innerHTML = '';
      movieListRef.innerHTML = '';
      // const listMarkup = document.createDocumentFragment();
      // arr.forEach(el => {
      //   renderFilms.push(el);
      //   if (el.backdrop_path != null) {
      //     createCardFunc(el.backdrop_path, el.title, el.id);
      //   } else if (el.poster_path != null) {
      //     createCardFunc(el.poster_path, el.title, el.id);
      //   } else {
      //     createCardFunc('logo', el.title, el.id);
      //   }
      // });

      const listMarkup = document.createDocumentFragment();
      arr.forEach(item => {
        renderFilms.push(item);
        listMarkup.appendChild(
          createCardFunc(item.backdrop_path, item.title, item.id),
        );
      });

      movieListRef.append(listMarkup);
    })
    .catch(error => console.log('ERROR' + error));

  input.value = '';
}