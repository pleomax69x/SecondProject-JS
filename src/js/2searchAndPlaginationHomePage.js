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
    resetPlagination();
    fetchPopularMoviesList(pageNumber);
  } else {
    resetPlagination();
    fetchFilms(inputValue, pageNumber);
  }
}
function eraseErroMesage() {
  errorMessage.hidden = true;
}

function resetPlagination() {
  movieListRef.innerHTML = '';
  pageValue.textContent = pageNumber;
  prevBtn.classList.add('hidden');
}

// конец нового кода

function fetchFilms(inputValue, pageNumber) {
  if (inputValue === '') {
    fetchPopularMoviesList();
  }

  const API = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${inputValue}&page=${pageNumber}&include_adult=false`;

  fetch(API)
    .then(response => response.json())
    .then(data => {
      const arr = data.results;
      if (inputValue !== '' && arr.length === 0) {
        errorMessage.hidden = false;
        setTimeout(eraseErroMesage, 3000);
        fetchPopularMoviesList(pageNumber);
      }

      movieListRef.innerHTML = '';

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
