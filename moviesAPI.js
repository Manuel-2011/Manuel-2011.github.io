// This script is to fetch the top 5 popular movies at the moment from 
// imdb api and to then fetch the movies title and image to display them in
// a slider


let firstMovie = true; //variable to recognize the first movie slide

// initialize the variables to use and fetch the apis when the html is loaded
const recomButtton = document.querySelector('.main-button');
const carousel = document.querySelector('.carousel-track');
getMovies();




// Fetch the top 5 more popular movies at the moment
function getMovies() {
    console.log("fetching api");
        fetch("https://imdb8.p.rapidapi.com/title/get-most-popular-movies?purchaseCountry=US&homeCountry=US&currentCountry=US", {
	                "method": "GET",
	                "headers": {
		            "x-rapidapi-host": "imdb8.p.rapidapi.com",
		            "x-rapidapi-key": rapidApiKey
                    }
                    })
                    .then((resp) => resp.json())
                    .then(resp => resp.slice(0,5))
                    .then(resp => {
                        setTimeout(displayMovies(resp), 1) // wait 1 sec before calling the other api because the api only supports 5 calls in 1 second.
                    })
}

// For each movie fetch its title informatio and its poster image
function displayMovies(movies) {
    console.log(movies);
    for (let i=0; i < movies.length; i++) {
        const movieId = cleanTitle(movies[i]);
        fetch(`https://imdb8.p.rapidapi.com/title/get-plots?tconst=${movieId}`, {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-host": "imdb8.p.rapidapi.com",
		"x-rapidapi-key": rapidApiKey
	    }
        })
            .then(resp => resp.json())
            .then(addMoviesHMTL)
            // when the last movie is added to the html shows the "get movie recommendations" button
            .then(() => {
                if (i+1 === movies.length) {
                    recomButtton.style.display = 'block';
                }
            })
    }
    // function to clean the title info to fetch the api
    function cleanTitle(stringT) {
        let begins = stringT.indexOf('/', 1) + 1;
        let title = stringT.slice(begins, stringT.length - 1);
        return title;
    }
}

// function that adds the movies data to the html with the classes to make the slider work
function addMoviesHMTL(data) {
    const title = data.base.title;
    const movieImage = data.base.image.url;
    const movieSlide = document.createElement('li');
    movieSlide.className = "carousel-slide"
    if (firstMovie) { // add the current-slide class to the first movie to make the slider work
        movieSlide.classList.add('current-slide');
        firstMovie = false;
    }
    movieSlide.innerHTML = `
    <h4>${title}</h4>
    <img src=${movieImage} alt=${title}>
    `
    carousel.appendChild(movieSlide);
}
