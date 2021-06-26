function loadItems(){
    var connection = new XMLHttpRequest();
    connection.responseType = 'json';
    connection.onreadystatechange = function () {
        if (connection.readyState === 4 && connection.status === 200) {
            const movies = connection.response;
            showData(movies);
        }
    };
    connection.open('GET', 'https://api.themoviedb.org/3/movie/popular?api_key=7a320bc424c0887f1d5a8c3ac93d0572&language=en-US&page=1');
    connection.send();
}

function showData(movies){
    var body = document.body;

    var list = document.querySelector('ul');

    for (let i = 0; i < movies.results.length; i++){
        var movie = movies.results[i];

        list.innerHTML += `
            <div class="idMovie" id="movie-${movie.id}">
                <div class="numMovie">  ${i + 1} </div>
                <div class="poster" href="#"> <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"> </div>
                <div class="dataMovie">
                    <div class="informationMovie">
                        <div class="space">
                            <a class="title" href="#"> ${movie.title} </a> (${movie.release_date}) 
                            <img class="county" src="USA.jpeg">
                        </div>
                        <a  class="space" id="director-${movie.id}"> </a>
                        <div id="actors-${movie.id}"></div>
                    </div>
                    <div class="votesMovie">
                        <a class="number"> ${movie.vote_average} </a> <br>
                        <a class="votes"> ${movie.vote_count} <i class="fas fa-user"></i></a>
                    </aside4>
                </div>
            </div>
        `;

        fetchDetails(movie.id);
    }
}

function fetchDetails(id){
    const connection2 = new XMLHttpRequest();
    connection2.responseType = 'json';
    
    connection2.onreadystatechange = function () {
        if (connection2.readyState === 4 && connection2.status === 200) {
            const director = connection2.response;
            var a_director = document.querySelector(`#director-${id}`);

            for (let j = 0; j < director.crew.length; j++) {
                if( director.crew[j].job === "Director") {
                   a_director.innerHTML = `<a class="director" href="#"> ${director.crew[j].name} </a> <br>`;
               }
            }

            const actors = connection2.response;
            var div_actors = document.querySelector(`#actors-${id}`);

            for (let k = 0; k < 10; k++) {
                if (k === 9) {
                    div_actors.innerHTML += `<a class="actor" href="#"> ${actors.cast[k].name}</a>... `;
                } else {
                    div_actors.innerHTML += `<a class="actor" href="#"> ${actors.cast[k].name}</a>, `;
                }
            }
        }
    };
    connection2.open('GET', "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=7a320bc424c0887f1d5a8c3ac93d0572");
    connection2.send();
}