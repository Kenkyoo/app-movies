function navbar(container) {
    const nav = `                
                <nav class="navbar navbar-expand-lg fixed-top" aria-label="Thirteenth navbar example" id="navbar">
                  <div class="container-fluid">
                      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                      </button>
              
                      <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                          <a class="navbar-brand col-lg-3 me-0" href="#header">Centered nav</a>
                          <ul class="navbar-nav nav-masthead col-lg-6 justify-content-lg-center">
                              <li class="nav-item">
                                  <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="movies.html">Películas</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="series.html">Series</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#randomModal">Random Movies</a>
                              </li>
                          </ul>
                          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
                              <form class="d-flex" role="search">
                                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search">
                                  <button class="btn btn-outline-dark" type="submit">Search</button>
                              </form>
                              <div class="search-results-container">
                                  <ul class="list-group" id="resultsList"></ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </nav>
                `;
        container.innerHTML = nav;        
}

export {navbar}