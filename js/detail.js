//Tomamos el id de localstorage
let queryString = location.search
let queryStringObj = new URLSearchParams(queryString)
let id = queryStringObj.get('id')

console.log(id)

//Guardamos en una variable la url generica para las fotos de portada
let urlImages = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTU0NGZhMTg1NTM1YTRlZjUzYmY1MDEyOTY1NWZhYyIsInN1YiI6IjY1NGU2Yjk2NWE1ZWQwMDBjNmFkYmJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QtTQeMXcBjmPiswQSnd3iTOx2Dc26Czti4dIcPWJdfQ'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        const detail = document.getElementById('detailContainer');
        const detailItem = document.createElement('article');
        detailItem.classList.add('detail')
        detailItem.innerHTML = `    
            <h1>${response.title}</h1>

            <img src="${urlImages}${response.poster_path}" class="portada">

            <div class="rating-favs">
                <p>Rating: ${Math.round(response.vote_average * 100) / 100}</p>
                <div class="detail-favoritos">
                    <p>Agregar a favoritos</p>
                    <img src="./images/estrella-fav.png" alt="" class="fav">
                </div>
            </div>

            <div class="detail-info">
            <p>Estreno: ${response.release_date}</p>
            <p>Duracion: ${response.runtime} min</p>
            <p>Drama/Suspenso</p>
            </div>
            <br>
            <p class="detal-description">${response.overview}</p>

        `;
        detail.appendChild(detailItem);

    })
    .catch(err => console.error(err));