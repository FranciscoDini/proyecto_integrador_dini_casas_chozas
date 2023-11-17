
let urlImages = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"

let queryString = location.search
let queryStringObj = new URLSearchParams(queryString)
let id = queryStringObj.get("id")
let genreName = queryStringObj.get("name")
let type = queryStringObj.get('type')


let tituloBusqueda = document.getElementById("genreName")

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTU0NGZhMTg1NTM1YTRlZjUzYmY1MDEyOTY1NWZhYyIsInN1YiI6IjY1NGU2Yjk2NWE1ZWQwMDBjNmFkYmJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QtTQeMXcBjmPiswQSnd3iTOx2Dc26Czti4dIcPWJdfQ'
  }
};

if (type == "movie"){
  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      
      if (data.results.length === 0) {
        tituloBusqueda.innerHTML = "No hay resultados para su busqueda";
      } else {
        tituloBusqueda.innerHTML = `Resultados de búsqueda para: ${genreName}`;}

      const movieListElement = document.getElementById('movieList');
      for (let i = 0; i < data.results.length; i++) {
          movieListElement.innerHTML += `
            <div class="peli">
                <a href="detail.html?tipo=movie&id=${data.results[i].id}">
                    <img src="${urlImages}${data.results[i].poster_path}" alt="">
                    <h3 class="tituloPeli">${data.results[i].title}</h3>
                </a>
            </div>
          `;
      }
    })
    .catch(err => console.error(err));
}else{
  fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    
    if (data.results.length === 0) {
      tituloBusqueda.innerHTML = "Error al buscar el genero";
    } else {
      tituloBusqueda.innerHTML = `Resultados de búsqueda para: ${genreName}`;}

    const movieListElement = document.getElementById('movieList');
    for (let i = 0; i < data.results.length; i++) {
        movieListElement.innerHTML += `
          <div class="peli">
              <a href="detail.html?tipo=tv&id=${data.results[i].id}">
                  <img src="${urlImages}${data.results[i].poster_path}" alt="">
                  <h3 class="tituloPeli">${data.results[i].name}</h3>
              </a>
          </div>
        `;
    }
  })
  .catch(err => console.error(err));
}