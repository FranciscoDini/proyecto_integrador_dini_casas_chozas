//Tomamos el id de localstorage
let queryString = location.search
let queryStringObj = new URLSearchParams(queryString)
let id = queryStringObj.get('id')
let type = queryStringObj.get('tipo')

function getGenerosSerie(generos) {
    let listaGeneros = [];

    for (let i = 0; i < generos.length; i++) {
        let enlace = document.createElement('a');
        enlace.href = `genres.html?id=${generos[i].id}`;
        enlace.textContent = generos[i].name;
        listaGeneros.push(enlace.outerHTML); // Usar outerHTML para obtener el contenido HTML del enlace
        console.log(enlace)
    }
    return listaGeneros;
}

//Guardamos en una variable la url generica para las fotos de portada
let urlImages = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTU0NGZhMTg1NTM1YTRlZjUzYmY1MDEyOTY1NWZhYyIsInN1YiI6IjY1NGU2Yjk2NWE1ZWQwMDBjNmFkYmJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QtTQeMXcBjmPiswQSnd3iTOx2Dc26Czti4dIcPWJdfQ'
    }
  };

if (type == "movie"){
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
                            <img id="favImg" src="./images/estrella-fav.png" alt="" class="fav">
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

                    fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?`, options)
                    .then(response => response.json())
                    .then(data => {
                      console.log(data)
                      const movieListElement = document.getElementById('recommendedList');
                      for (let i = 0; i < data.results.length; i++) {
                          movieListElement.innerHTML += `
                            <div class="peli">
                                <a href="detail.html?tipo=tv&id=${data.results[i].id}">
                                    <img src="${urlImages}${data.results[i].poster_path}" alt="">
                                    <h3 class="tituloPeli">${data.results[i].title}</h3>
                                    <p>${data.results[i].release_date}</p>
                                </a>
                            </div>
                          `;
                      }
                    })
                    .catch(err => console.error(err));
}else{
    fetch(`https://api.themoviedb.org/3/tv/${id}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            const detail = document.getElementById('detailContainer');
            const detailItem = document.createElement('article');
            detailItem.classList.add('detail')
            detailItem.innerHTML = `    
                <h1>${response.name}</h1>

                <img src="${urlImages}${response.poster_path}" class="portada">

                <div class="rating-favs">
                    <p>Rating: ${Math.round(response.vote_average * 100) / 100}</p>
                    <div class="detail-favoritos">
                        <p>Agregar a favoritos</p>
                        <img id="favImg" src="./images/estrella-fav.png" alt="" class="fav">
                    </div>
                </div>

                <div class="detail-info">
                <p>Estreno: ${response.first_air_date}</p>
                <div class="detailGenreContainer">${getGenerosSerie(response.genres)}</div>
                </div>
                <br>
                <p class="detal-description">${response.overview}</p>

            `;
            detail.appendChild(detailItem);

        })
        .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?`, options)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          const movieListElement = document.getElementById('recommendedList');
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
    }

document.getElementById('showRecommended').addEventListener('click', function () {
    let recommendedSection = document.getElementById('recommendedList');
    recommendedSection.style.display = 'flex';
})