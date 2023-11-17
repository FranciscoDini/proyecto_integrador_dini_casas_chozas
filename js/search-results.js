localStorage.setItem('query', 'cars');
let buscado = localStorage.getItem('query')

//let tituloPagina = document.getElementById("queryTitle")
//tituloPagina.innerHTML += ` ${buscado}`;

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

fetch(`https://api.themoviedb.org/3/search/movie?query=${buscado}&include_adult=false&language=en-US&page=1`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const movieListElement = document.getElementById('movieList');
    for (let i = 0; i < data.results.length; i++) {
        movieListElement.innerHTML += `
        <section class="populares">
          <div class="peli">
              <a href="detail.html?id=${data.results[i].id}">
                  <img src="${urlImages}${data.results[i].poster_path}" alt="">
                  <h3 class="tituloPeli">${data.results[i].title}</h3>
              </a>
          </div>
        </section>
        `;
    }
  })
  .catch(err => console.error(err));


