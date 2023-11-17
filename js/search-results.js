// localStorage.setItem('query', 'batman');
// let busqueda = localStorage.getItem('query')

// let tituloPagina = document.getElementById("queryTitle")
// tituloPagina.innerHTML += ` ${busqueda}`;

let urlImages = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"

//Funcion para guardar el Id de la peli en localStorage
// function saveMovieID(movieID){
//     localStorage.setItem('movieID', movieID)
// }
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
fetch(`https://api.themoviedb.org/3/search/movie?query=${busqueda}&include_adult=false&language=en-US&page=1`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const movieListElement = document.getElementById('movieList');
    for(let i = 0; i < data.results.length  ; i++){
        movieListElement.innerHTML+= `
        <div class="peli">
            <a href="detail-movie.html?id=${data.results[i].id}">
                <img src="./images/Peliculas/cars.jpg" alt="">
                <h3 class="tituloPeli">Cars - 2006</h3>
            </a>
        </div>
        `
    }
    // const movieResults = data.results.map(movie => ({
    //     title: movie.original_title,
    //     image: movie.poster_path,
    //     id: movie.id,
    // }))
    //                 movieResults.forEach((movie, index) => {
    //                     const listItem = document.createElement('li');
    //                     listItem.innerHTML = `    
    //                         <img src="${urlImages}${movie.image}" alt="${movie.title}"/>
    //                         <h3>${index + 1}. ${movie.title}</h3>
    //                     `;
    //                     //Agregar un event Listener para cuando se clickee la peli
    //                     listItem.addEventListener('click', function(){
    //                         saveMovieID(movie.id)
    //                         window.location.href = 'detail.html'
    //                     });

    //                     movieListElement.appendChild(listItem);
    //                 });
    })
  .catch(err => console.error(err));  


