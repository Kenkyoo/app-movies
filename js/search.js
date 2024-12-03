import { urlImages } from "./app.js";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDEzZGYyYTE2MjJhZDM1OTQyYzAwOTJmMGE0YmNjOCIsIm5iZiI6MTcyMDczODY4NS4yOTI0MjQsInN1YiI6IjY2MDVlYjI1NDE3YWFmMDE3ZDYwYjgxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxEcq0nW1wRruSlYsyDDQ0LFC618m_XINUJLh3lXF7I'
    }
  };
  

document.addEventListener("DOMContentLoaded", randomMovie);

function randomMovie() {
const modalBody = document.getElementById('modalBody');
 
fetch('https://api.themoviedb.org/3/movie/top_rated', options)
    .then(response => response.json())
    .then(response => {
        const results = response.results;
        const randomObject = Math.floor(Math.random() * results.length);
        const movie = results[randomObject];

        let modal = `
            <div class="row d-flex flex-column justify-content-center gap-2 text-center">
                <div class="col">
                  <h3>${movie.title}</h3>
                </div>
                <div class="col">
                  <img src="${urlImages}${movie.backdrop_path}" class="img-fluid rounded shadow-lg" alt="${movie.title}">
                </div> 
            </div>
            `;
        const infoMovie = document.getElementById('infoMovie'); 
        infoMovie.innerText = `${movie.overview}`;

        modalBody.innerHTML = modal;
        
        const randomBtn = document.getElementById('randomBtn');
        randomBtn.addEventListener("click", randomMovie);
    })
    .catch(err => console.error(err));  
}

document.getElementById("showInfo").addEventListener("click", function() {
  var div = document.getElementById("infoMovie");
  if (div.style.display === "none") {
      div.style.display = "block";
  } else {
      div.style.display = "none";
  }
});






