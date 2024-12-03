const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDEzZGYyYTE2MjJhZDM1OTQyYzAwOTJmMGE0YmNjOCIsIm5iZiI6MTcyMDM5MjI4My42MjYzNjUsInN1YiI6IjY2MDVlYjI1NDE3YWFmMDE3ZDYwYjgxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WumHPLpwl2Rh9eaV29r1G9AIIo8U0SJAg62z6gaJHmA'
  }
};

const urlImages = 'https://image.tmdb.org/t/p/original/';

export function createElements(url, container, config) {
    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        const array = response.results.slice(0, 20);
        array.forEach(element => {
          let item = `
            <div class="d-flex flex-column gap-2">
              <div class="card p-0" style="cursor: pointer; width: 10rem;" data-bs-toggle="modal" data-bs-target="#modal${element.id}">
                <img src="${urlImages}${element.poster_path}" class="img-fluid rounded shadow" alt="${element[config.titleKey]}">
              </div>
              <div>
                <h5>${element[config.titleKey]}</h5>
                <p class="lead">${element[config.dateKey]}</p>
              </div>
            </div>  
          `;
          container.innerHTML += item;
          createModal(element, config);
        });
      })
      .catch(err => console.error(err));
  }
  export function showResults(array, container, config) {
    container.innerHTML = "";
  
    array.forEach(element => {
      let item = `
        <div class="d-flex flex-column gap-2">
          <div class="card p-0" style="cursor: pointer; width: 10rem;" data-bs-toggle="modal" data-bs-target="#modal${element.id}">
            <img src="${urlImages}${element.poster_path}" class="img-fluid rounded shadow" alt="${element[config.titleKey]}">
          </div>
          <div>
            <h5>${element[config.titleKey]}</h5>
            <p class="lead">${element[config.dateKey]}</p>
          </div>
        </div>  
      `;
      container.innerHTML += item;
      createModal(element, config);
    });
  }
  
    
export function createModal(element, config) {
    const modalContainer = document.getElementById('modalContainer');
    let modal = `
      <div class="modal fade" id="modal${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header text-center text-white">
              <h5 class="modal-title col-12" id="exampleModalLabel">${element[config.titleKey]}  (${element[config.dateKey]})</h5>
              <button type="button" class="btn-close btn-close-white me-3" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          <div class="modal-body p-0 m-0 h-100">
          <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column position-relative" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${urlImages}${element.backdrop_path});">
            <header class="position-absolute top-0 start-0 w-100">
              <div class="d-flex justify-content-around">
                <h3>Cover</h3>
                <nav class="nav nav-masthead justify-content-center">
                  <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Home</a>
                  <a class="nav-link fw-bold py-1 px-0" href="#">Features</a>
                  <a class="nav-link fw-bold py-1 px-0" href="#">Contact</a>
                </nav>
              </div>
            </header>
  
            <main class="position-absolute top-50 start-0 translate-middle-y text-white px-3">
                <h1 class="fw-bold mb-5">${element[config.titleKey]}</h1>
                <span>${element[config.dateKey]}</span>
                <p class="lead mb-5">${element.overview}</p>
                <span class="badge rounded-pill text-bg-primary p-2">Votes: ${element.vote_average}</span>
                <span class="badge rounded-pill text-bg-primary p-2">Popularity: ${element.popularity}</span>
                <span class="badge rounded-pill text-bg-primary p-2">Vote count: ${element.vote_count}</span>
                <p class="lead">
                  <a href="#" class="btn btn-lg btn-light fw-bold border-white bg-white mt-5">Ver mas</a>
                </p>
            </main>
            <div class="position-absolute bottom-0 end-0 me-2">     
              <img src="${urlImages}${element.poster_path}" class="img-thumbnail rounded" alt="${element[config.titleKey]}" width="200" height="200">     
            </div>
            <footer class="position-absolute bottom-0 start-0 ms-3">
              <p class="text-white">Original language: ${element.original_language}</p>
            </footer>
          </div>
          </div>
          </div>
        </div>
      </div>
    `;
    modalContainer.innerHTML += modal;
  }