const API_KEY="38e497c6c1a043d1341416e80915669f";

let mode="tmdb";
let selectedMovie=null;

function setMode(m){

mode=m;

document.getElementById("tmdb-mode").style.display=
m==="tmdb"?"block":"none";

document.getElementById("manual-mode").style.display=
m==="manual"?"block":"none";
}

document.getElementById("search")
.addEventListener("input",async(e)=>{

const query=e.target.value;

if(query.length<2){
document.getElementById("results").innerHTML="";
return;
}

const res=await fetch(
`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(query)}`
);

const data=await res.json();

let html="";

data.results.forEach(item=>{

if(!item.poster_path) return;

const title=item.title||item.name;

html+=`
<div class="card"
onclick="selectMovie(${item.id},'${title.replace(/'/g,"\\'")}','${item.poster_path}','${item.backdrop_path}')">

<img src="https://image.tmdb.org/t/p/w300${item.poster_path}">

<span>${title}</span>

</div>
`;

});

document.getElementById("results").innerHTML=html;

});

function selectMovie(id,title,poster,backdrop){

selectedMovie={
id,
title,
poster,
backdrop
};

alert(title+" seleccionada");
}

function generateLink(){

let link="";

if(mode==="tmdb"){

if(!selectedMovie){
alert("Selecciona una película");
return;
}

const video=
encodeURIComponent(
document.getElementById("video-url").value
);

link=
`player.html?title=${encodeURIComponent(selectedMovie.title)}&poster=https://image.tmdb.org/t/p/original${selectedMovie.poster}&backdrop=https://image.tmdb.org/t/p/original${selectedMovie.backdrop}&video=${video}`;

}else{

const title=
encodeURIComponent(document.getElementById("title").value);

const poster=
encodeURIComponent(document.getElementById("poster").value);

const backdrop=
encodeURIComponent(document.getElementById("backdrop").value);

const video=
encodeURIComponent(document.getElementById("manual-video").value);

link=
`player.html?title=${title}&poster=${poster}&backdrop=${backdrop}&video=${video}`;
}

document.getElementById("output").innerHTML=
`
<input value="${link}" readonly>
<button onclick="navigator.clipboard.writeText('${link}')">
Copiar
</button>
`;
}
