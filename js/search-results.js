
let urlImages = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"

let queryString = location.search
let queryStringObj = new URLSearchParams(queryString)
let busqueda = queryStringObj.get("busqueda")

let tituloBusqueda = document.getElementById("queryTitle")

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTU0NGZhMTg1NTM1YTRlZjUzYmY1MDEyOTY1NWZhYyIsInN1YiI6IjY1NGU2Yjk2NWE1ZWQwMDBjNmFkYmJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QtTQeMXcBjmPiswQSnd3iTOx2Dc26Czti4dIcPWJdfQ'
  }
};

fetch(`https://api.themoviedb.org/3/search/movie?query=${busqueda}&include_adult=false&language=en-US&page=1`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data)

    if (data.results.length === 0) {
      tituloBusqueda.innerHTML = "No hay resultados para su busqueda";
    } else {
      tituloBusqueda.innerHTML = `Resultados de búsqueda para: ${busqueda}`;}
    
    const movieListElement = document.getElementById('movieList');
    for (let i = 0; i < data.results.length; i++) {
        movieListElement.innerHTML += `
          <div class="peli">
              <a href="detail.html?id=${data.results[i].id}">
                  <img src="${urlImages}${data.results[i].poster_path}" alt="">
                  <h3 class="tituloPeli">${data.results[i].title}</h3>
              </a>
          </div>
        `;
    }
  })
  .catch(err => console.error(err));