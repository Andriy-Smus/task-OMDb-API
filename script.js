// Titles: https://omdbapi.com/?s=thor&page=1&apikey=189d02f
// details: http://www.omdbapi.com/?i=tt3896198&apikey=189d02f

const movieSearchBox = document.querySelector('.movie-search');
const searchList = document.querySelector('.blocks');
const resultGrid = document.querySelector('.result-bt-more');


async function loadMovies(searchTerm){
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=189d02f`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
  let searchTerm = (movieSearchBox.value).trim();
  if(searchTerm.length > 0){
      loadMovies(searchTerm);
  }
}

function displayMovieList(movies){
  searchList.innerHTML = "";
  for(let idx = 0; idx < movies.length; idx++){
    let movieListItem = document.createElement('div');
    movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
    movieListItem.classList.add('block');
    if(movies[idx].Poster != "N/A")
      moviePoster = movies[idx].Poster;
    movieListItem.innerHTML = `
    <img src="${moviePoster}" alt="">
    <div class="heading">${movies[idx].Title}</div>
    <div class="style">${movies[idx].Type}</div>
    <div class="year">${movies[idx].Year}</div>
    <button class="bt-more">More details</button>
    `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails(){
  const searchListMovies = document.querySelectorAll('.block');
  searchListMovies.forEach(movie => {
    movie.querySelector('.bt-more').addEventListener('click', async () => {
      const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=189d02f`);
      const movieDetails = await result.json();
      displayMovieDetails(movieDetails);
    });
  });
}


function displayMovieDetails(details){
  document.querySelector('.result-bt-more').classList.remove('hide');
  resultGrid.innerHTML = `
  <div class="box-result">
    <div class="box-res">
      <img src="${(details.Poster)}" alt="">
      <div class="movie-inf">
        <h2 class="movie-title">${details.Title}</h2>
        <p class="movie-misc-info">${details.Rated} ${details.Year} ${details.Genre}</p>
        <p class="plot">${details.Plot}</p>
        <p class="writer"><b>Written by:</b> ${details.Writer}</p>
        <p class="director"><b>Directed by:</b> ${details.Director}</p>
        <p class="actors"><b>Starring:</b> ${details.Actors}</p>
        <p class="boxOffice"><b>BoxOffice:</b> ${details.BoxOffice}</p>
        <p class="awards"><b>Awards:</b> ${details.Awards}</p>
        <p class="ratings"><b>Ratings:</b></p>
        <p class="internetMovieDatabase">Internet Movie Database ${details.Ratings[0].Value}</p>
        <p class="rottenTomatoes">Rotten Tomatoes ${details.Ratings[1].Value}</p>
        <p class="metacritic">Metacritic ${details.Ratings[2].Value}</p>
      </div>
    </div>
  </div>
  `;

  document.querySelector('.result-bt-more').addEventListener('click', () => {
    if(event.target.className == "result-bt-more"){
      document.querySelector('.result-bt-more').classList.add('hide');
    } 
  });
}

document.querySelector('.movie-search').addEventListener('input', (event) => {
  if(event.target.value !== '') document.querySelector('.uil-times').classList.remove('hide');
  else document.querySelector('.uil-times').classList.add('hide');
})
document.querySelector('.movie-search').addEventListener('focus', (event) => {
  if(event.target.value !== '') document.querySelector('.uil-times').classList.remove('hide');
  else document.querySelector('.uil-times').classList.add('hide');
})
document.querySelector('.uil-times').addEventListener('click', () => {
  document.querySelector('.movie-search').value = '';
})



