import { navbar } from "../components/navbar.js";
import { createElements, createModal, showResults } from './utils.js';
import { darkTheme } from "../components/theme.js";


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDEzZGYyYTE2MjJhZDM1OTQyYzAwOTJmMGE0YmNjOCIsIm5iZiI6MTcyMDM5MjI4My42MjYzNjUsInN1YiI6IjY2MDVlYjI1NDE3YWFmMDE3ZDYwYjgxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WumHPLpwl2Rh9eaV29r1G9AIIo8U0SJAg62z6gaJHmA'
  }
};

const toggleMenu = document.getElementById('toggleMenu');
const header = document.getElementById('hero');
const container = document.getElementById('discoverMovies');
const selectYear = document.getElementById('selectYear');
const config = { titleKey: 'original_title', dateKey: 'release_date' };

// Endpoints

const discoverMovies = 'https://api.themoviedb.org/3/discover/movie';
const genresMovies = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

export function getGenres(url) {

fetch(url, options)
  .then(response => response.json())
  .then(response => {
    response.genres.forEach(genre => {
        const btnGroup = document.querySelector('.btn-group');
        const button = document.createElement('a');
        button.classList.add('btn', 'btn-primary');
        button.innerText = genre.name;
        button.id = genre.id.toString();
        btnGroup.appendChild(button);

        button.addEventListener('click', function() {
            const genreId = this.id; // Obtener el ID del género del botón clicado
            filterGenres(genreId);
          });
    });
  })
  .catch(err => console.error(err));
}

export function createSelectYears() {
   const selectYear = document.getElementById('selectYear');
    for (let index = 1920; index < 2030; index++) {
        const option = document.createElement('option');
        option.value = index;
        option.innerText = index;
        selectYear.appendChild(option)
    }
  }

export function selectFilter() {

  const selectElement = document.getElementById('sort');
  selectElement.addEventListener('change', function() {
    const selectedOption = this.value;

    switch (selectedOption) {
      case 'popularity':
        filterResults('popularity.desc');
        break;
      case 'votes':
        filterResults('vote_count.desc');
        break;
      case 'release_date':
        filterResults('revenue.desc');
        break;
      default:
        console.log('Selecciona una opción válida');
    }
  });
}

selectYear.addEventListener('change', function() {
  const selectedOption = this.value;

  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&year=${selectedOption}`;
  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      showResults(response.results, container, config);
    })
    .catch(err => console.error(err));
});

export function filterGenres(genreId, type = 'movie') {
  let endpoint = 'movie';
  if (type === 'tv') {
    endpoint = 'tv';
  }
  const url = `https://api.themoviedb.org/3/discover/${endpoint}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;

  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      showResults(response.results, container, config);
    })
    .catch(err => console.error(err));
}


export function filterResults(endpoint){

  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${endpoint}`;
  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      showResults(response.results, container, config);
    })
    .catch(err => console.error(err));
}

export const urlSearchMovies = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=';

const search = document.getElementById('search');

export function fetchData(url, query, callback) {
  fetch(`${url}${query || ''}`, options)
    .then(response => response.json())
    .then(response => {
      const results = response.results;
      callback(results);
    })
    .catch(err => console.error(err));
}

export function searchMovies() {
  const query = search.value;
  if (query.length > 0) {
    fetchData(urlSearchMovies, query, (results) => {
      showResults(results, container, config); // false indica que son películas
    });
  } else {
    container.innerHTML = '';
  }
}
search.addEventListener('input', searchMovies)

getGenres(genresMovies);
navbar(header);
createElements(discoverMovies, container, config);
createSelectYears();
selectFilter();
darkTheme(toggleMenu);
