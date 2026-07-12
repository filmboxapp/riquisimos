const TMDB_KEY = "38e497c6c1a043d1341416e80915669f";

let mode = "tmdb";

function setMode(m){

mode = m;

document.getElementById("tmdb-mode").style.display =
m==="tmdb" ? "block":"none";

document.getElementById("manual-mode").style.display =
m==="manual" ? "block":"none";

}

async function generateLink(){

if(mode==="tmdb"){

const id =
document.getElementById("tmdb-id").value;

const video =
document.getElementById("video-url").value;

const data =
await fetch(
`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}&language=es-MX`
);

const movie =
await data.json();

const link =
`player.html?title=${encodeURIComponent(movie.title)}
&poster=https://image.tmdb.org/t/p/original${movie.poster_path}
&backdrop=https://image.tmdb.org/t/p/original${movie.backdrop_path}
&video=${encodeURIComponent(video)}`;

document.getElementById("result").innerHTML =
`<a href="${link}" target="_blank">${link}</a>`;

}

}
