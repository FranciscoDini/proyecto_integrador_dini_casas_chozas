
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

fetch(`https://api.themoviedb.org/3/genre/movie/list?include_adult=false&language=en-US&page=1`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    
    const movieListElement = document.getElementById('movieGenres');
    for (let i = 0; i < data.genres.length; i++) {
        movieListElement.innerHTML += `
          <a class="listedGenre"   href="detail-genres.html?type=movie&name=${data.genres[i].name}&id=${data.genres[i].id}">${data.genres[i].name}</a>
        `;
    }
  })
  .catch(err => console.error(err));

  

fetch(`https://api.themoviedb.org/3/genre/tv/list?`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    
    const movieListElement = document.getElementById('tvGenres');
    for (let i = 0; i < data.genres.length; i++) {
        movieListElement.innerHTML += `
          <a class="listedGenre" href="detail-genres.html?type=tv&name=${data.genres[i].name}&id=${data.genres[i].id}">${data.genres[i].name}</a>
        `;
    }
  })
  .catch(err => console.error(err));