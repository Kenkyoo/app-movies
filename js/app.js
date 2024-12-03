import { createElements, createModal } from './utils.js';
import { darkTheme } from "../components/theme.js";

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDEzZGYyYTE2MjJhZDM1OTQyYzAwOTJmMGE0YmNjOCIsIm5iZiI6MTcyMDM5MjI4My42MjYzNjUsInN1YiI6IjY2MDVlYjI1NDE3YWFmMDE3ZDYwYjgxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WumHPLpwl2Rh9eaV29r1G9AIIo8U0SJAg62z6gaJHmA'
  }
};

// Endpoints

// URLs de la API para películas y series
const topRatedMoviesUrl = 'https://api.themoviedb.org/3/movie/top_rated';
const topRatedSeriesUrl = 'https://api.themoviedb.org/3/tv/top_rated';


const moviesEndpoints = {  
  nowPlaying : 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
  popular : 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
  topRated : 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
  upcoming : 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'
}

 // Containers DOM

const moviesContainers = {
  nowPlaying : document.getElementById("nowPlayingContainer"),
  popular : document.getElementById("popularContainer"),
  topRated : document.getElementById("topRatedContainer"),
  upcoming : document.getElementById("upcomingContainer")
}

const seriesEndpoints = {
  airingToday : 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1',
  onTheAir : 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1',
  popular : 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
  topRated : 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1'
}

const seriesContainers = {
  airingToday : document.getElementById("airingTodayContainer"),
  onTheAir : document.getElementById("onTheAirContainer"),
  popular : document.getElementById("popularTvContainer"),
  topRated : document.getElementById("topRatedTvContainer")
}

const trendingSeriesEndpoints = {
  trendingSeriesDay: 'https://api.themoviedb.org/3/trending/tv/day?&language=en-US',
  trendingSeriesWeek: 'https://api.themoviedb.org/3/trending/tv/week?&language=en-US'
};

const trendingMoviesEndpoints = {
  trendingMoviesDay: 'https://api.themoviedb.org/3/trending/movie/day?&language=en-US',
  trendingMoviesWeek: 'https://api.themoviedb.org/3/trending/movie/week?&language=en-US'
};

const trendingMoviesContainers = {
  trendingMoviesDay: document.getElementById("trendingMoviesDay"),
  trendingMoviesWeek: document.getElementById("trendingMoviesWeek")
};

const trendingSeriesContainers = {
  trendingSeriesDay: document.getElementById("trendingSeriesDay"),
  trendingSeriesWeek: document.getElementById("trendingSeriesWeek")
};

export const urlImages = 'https://image.tmdb.org/t/p/original/';
const urlMovie = 'https://www.themoviedb.org/movie/';
const urlLogos = 'https://image.tmdb.org/t/p/original/';

const movieConfig = { titleKey: 'original_title', dateKey: 'release_date' };
  
const seriesConfig = { titleKey: 'original_name', dateKey: 'first_air_date' };

const toggleMenu = document.getElementById('toggleMenu');

function setHeroImage() {
  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    const firstMovie = response.results[0];
    const div = document.getElementById('hero');
    const heroTitle = document.getElementById('hero-title');
    const heroOverview = document.getElementById('hero-overview');
    div.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${urlImages}${firstMovie.backdrop_path})`;
    heroTitle.textContent = firstMovie.title;
    heroOverview.textContent = firstMovie.overview;    
  })
  .catch(err => console.error(err));
}

function carousel() {
  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    const carousel = document.getElementById("carousel");
    const object = response.results.slice(0, 5);
    let items = '';
    for (const iterator of object) {
        items += `
            <div class="carousel-item">
              <img src="${urlImages}${iterator.backdrop_path}" class="img-fluid rounded shadow-lg" alt="${iterator.title}">
              <div class="container">
                <div class="carousel-caption text-start">
                  <h1>${iterator.original_title}</h1>
                  <p class="opacity-75">${iterator.overview}</p>
                  <p><a class="btn btn-lg btn-primary" href="${urlMovie}${iterator.id}">Ver</a></p>
                </div>
              </div>
            </div> 
            `;
    }
    carousel.innerHTML = items;
    document.querySelector('.carousel-inner :first-child').classList.add('active');
  })
  .catch(err => console.error(err));
}



function providers() {
  const cols = document.getElementById("cols");
  const providersContainer = document.getElementById("providersContainer");

fetch('https://api.themoviedb.org/3/watch/providers/tv', options)
  .then(response => response.json())
  .then(providersData => {
    const results = providersData.results;
    const someResults = results.slice(0, 20);
    someResults.forEach(provider => {
      let div = "";

      div = `
             <div>
               <img class="img-fluid rounded-5" src="${urlLogos}${provider.logo_path}" alt="${provider.provider_name}" width="50" height="50">
             </div>
             `;
      cols.innerHTML += div;   
    });

    let items = "";

    const dataProviders = results.slice(0, 4);
  
    for (const iterator of dataProviders) {
    items += ` 
            <div class="col d-flex flex-column gap-2">
              <div class="d-inline-flex align-items-center justify-content-center">
               <img src="${urlLogos}${iterator.logo_path}" class="img-thumbnail rounded-5" width="100" height="100"/>
              </div>
              <h4 class="fw-semibold mb-0 text-body-emphasis">${iterator.provider_name}</h4>
              <p class="text-body-secondary">Series y películas que están disponibles en las plataformas de streaming</p>
            </div>
    `;
    }
    providersContainer.innerHTML = items;
  })
  .catch(err => console.error(err));
}

// URLs de los endpoints
const endpoint1 = 'https://api.themoviedb.org/3/trending/person/day?language=en-US';
const endpoint2 = 'https://api.themoviedb.org/3/trending/person/week?language=en-US';

// Contenedores
const container1 = document.getElementById('popularPeopleDay');
const container2 = document.getElementById('popularPeopleWeek');

function showTrendingPeople(url, container) {
  fetch(url, options)
  .then(response => response.json())
  .then(response => {
    const data = response.results.slice(0, 9);
    container.innerHTML = trendingPeople(data);
  })
  .catch(err => console.error(err));
}

function trendingPeople(data) {
  let items = "";
  data.forEach(element => {
    items +=  `      
      <div class="col-4 mb-5">
        <div class="card card-cover h-100  text-bg-dark rounded-4 shadow-lg" style="background-image: url(${urlImages}${element.profile_path});">
          <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
          
            <ul class="d-flex list-unstyled mt-auto">
              <li class="me-auto">
                <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
              </li>
              <li class="d-flex align-items-center me-3">
                <small>${element.known_for_department}</small>
              </li>
              <li class="d-flex align-items-center">
                <small>Popularity: ${element.popularity}</small>
              </li>
            </ul>
          </div>
        </div>
        <h3 class="fw-bold mb-4 mt-2">${element.name}</h3>
      </div>
     `; 
  });
  return items;
}

function showTopRatedList(url, container, itemType) {
  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      let items = "";
      response.results.forEach((item, index) => {
        index++;
        const title = itemType === 'movie' ? item.title : item.name;
        items += `
          <tr>
            <th scope="row">${index}</th>
            <td>${title}</td>
            <td>${item.vote_average}</td>
            <td>${item.vote_count}</td>
            <td>${item.popularity}</td>     
          </tr>
        `;
      });
      container.innerHTML = items;
    })
    .catch(err => console.error("Error fetching data: ", err));
}


const tBodyMovies = document.getElementById("tBodyMovies");
const tBodySeries = document.getElementById("tBodySeries");


function showPopularPersons() {
  fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    const container = document.getElementById('container');
    let items = "";
    response.results.forEach(element => {
      items += `
    <div class="d-flex text-body-secondary pt-3">
      <img class=" me-2 rounded img-fluid" src="${urlImages}${element.profile_path}" width="120" height="120">
      <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
        <div class="d-flex justify-content-between align-items-center">
          <strong class="text-gray-dark">${element.name}</strong>
          <a href="#">${element.popularity}</a>
        </div>
        <span class="d-block">${element.known_for_department}</span>
      </div>
    </div>
    `;
    });
    container.innerHTML = items;
  })
  .catch(err => console.error(err));
}

const urlSearch = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=';
const search = document.getElementById('search');
const resultsList = document.getElementById('resultsList');

function fetchData(url, query, callback) {
  fetch(`${url}${query || ''}`, options)
    .then(response => response.json())
    .then(response => {
      const results = response.results;
      callback(results);
    })
    .catch(err => console.error(err));
}


function showResults(results) {
  resultsList.innerHTML = '';

  results.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'gap-3', 'py-3', 'rounded-3');
      li.setAttribute('aria-current', 'true');
      li.setAttribute('data-movie-id', item.id);

      li.innerHTML = `
          <img src="${urlImages}${item.poster_path}" alt="${item.title}" width="32" height="32" class="rounded-circle flex-shrink-0">
          <div class="d-flex gap-2 w-100 justify-content-between">
              <div>
                  <h6 class="mb-0">${item.title} <span class="ms-2">(${item.release_date})</span></h6>
                  <p class="mb-0 opacity-75">${item.overview}</p>
              </div>
              <small class="opacity-50 text-nowrap">${item.vote_average}</small>
          </div>
      `;

      li.addEventListener('click', function(event) {
          event.preventDefault();
          const movieId = li.dataset.movieId;

          // Encuentra la película seleccionada en el array de resultados
          const selectedMovie = results.find(movie => movie.id == movieId);
          
          // Define la configuración del modal
          const config = {
              titleKey: 'original_title',
              dateKey: 'release_date'
          };
          
          // Crea el modal para la película seleccionada
          createModal(selectedMovie, config);
          
          // Abre el modal usando Bootstrap
          const modalElement = document.getElementById(`modal${selectedMovie.id}`);
          const modal = new bootstrap.Modal(modalElement);
          modal.show();

          resultsList.innerHTML = ''; // Limpiar la lista después de hacer clic
      });

      resultsList.appendChild(li);
  });
}

search.addEventListener('input', function() {
    const query = search.value;
    if (query.length > 0) {
        fetchData(urlSearch ,query, showResults);
    } else {
        resultsList.innerHTML = '';
    }
});


function initializeContent() {
  for (let key in moviesEndpoints) {
    createElements(moviesEndpoints[key], moviesContainers[key], movieConfig);
  }

  for (let key in seriesEndpoints) {
    createElements(seriesEndpoints[key], seriesContainers[key], seriesConfig);
  }
}

function showTrendingContent() {
  for (let key in trendingMoviesEndpoints) {
    createElements(trendingMoviesEndpoints[key], trendingMoviesContainers[key], movieConfig);
  }

  for (let key in trendingSeriesEndpoints) {
    createElements(trendingSeriesEndpoints[key], trendingSeriesContainers[key], seriesConfig);
  }
}

showTrendingContent();
showTopRatedList(topRatedMoviesUrl, tBodyMovies, 'movie');
showTopRatedList(topRatedSeriesUrl, tBodySeries, 'tv');
showTrendingPeople(endpoint1, container1);
showTrendingPeople(endpoint2, container2);
initializeContent();
setHeroImage();
carousel();
providers();
showPopularPersons();
darkTheme(toggleMenu);