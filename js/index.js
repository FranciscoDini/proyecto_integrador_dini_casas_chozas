let urlImages = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"

let queryString = location.search
let queryStringObj = new URLSearchParams(queryString)
let busqueda = queryStringObj.get("busqueda")

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTU0NGZhMTg1NTM1YTRlZjUzYmY1MDEyOTY1NWZhYyIsInN1YiI6IjY1NGU2Yjk2NWE1ZWQwMDBjNmFkYmJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QtTQeMXcBjmPiswQSnd3iTOx2Dc26Czti4dIcPWJdfQ'
  }
};
fetch(`https://api.themoviedb.org/3/movie/popular?`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const movieListElement = document.getElementById('pelisList');
    for (let i = 0; i < data.results.length; i++) {
        movieListElement.innerHTML += `
          <div class="peli">
              <a href="detail.html?tipo=movie&id=${data.results[i].id}">
                  <img src="${urlImages}${data.results[i].poster_path}" alt="">
                  <h3 class="tituloPeli">${data.results[i].title}</h3>
                  <p>${data.results[i].release_date}</p>
              </a>
          </div>
        `;
    }
  })
  .catch(err => console.error(err));


fetch(`https://api.themoviedb.org/3/tv/popular?`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const movieListElement = document.getElementById('seriesList');
    for (let i = 0; i < data.results.length; i++) {
        movieListElement.innerHTML += `
          <div class="peli">
              <a href="detail.html?tipo=tv&id=${data.results[i].id}">
                  <img src="${urlImages}${data.results[i].poster_path}" alt="">
                  <h3 class="tituloPeli">${data.results[i].name}</h3>
                  <p>${data.results[i].first_air_date}</p>
              </a>
          </div>
        `;
    }
  })
  .catch(err => console.error(err));

fetch(`https://api.themoviedb.org/3/movie/top_rated?`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const movieListElement = document.getElementById('qualifiedList');
    for (let i = 0; i < data.results.length; i++) {
        movieListElement.innerHTML += `
          <div class="peli">
              <a href="detail.html?tipo=movie&id=${data.results[i].id}">
                  <img src="${urlImages}${data.results[i].poster_path}" alt="">
                  <h3 class="tituloPeli">${data.results[i].title}</h3>
                  <p>${data.results[i].release_date}</p>
              </a>
          </div>
        `;
    }
  })
  .catch(err => console.error(err));