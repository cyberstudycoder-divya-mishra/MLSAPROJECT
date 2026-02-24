const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=2";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const moiveBox = document.querySelector("#movie-box");

const getMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json()
    console.log(data);
    showMovies(data);
}
getMovies(APIURL);

const showMovies = (data)=>{
      moiveBox.innerHTML = "";
      data.results.forEach((result)=>{
         const imgpath = result.poster_path === null ? "img/image-missing.png" : IMGPATH + result.poster_path;
         const box = document.createElement("div");
         box.classList.add("box");
         box.innerHTML = `
         <img src="${imgpath}" alt="" />
         <div class="overlay">
          <div class="title">
            <h2>${result.original_title}</h2>
            <span>${result.vote_average}</span>
          </div>
          <h2>Overview:</h2>
          <p>
           ${result.overview}
          </p>
         </div>
         `
         moiveBox.appendChild(box);         
      })

}

document.querySelector("#search").addEventListener(
    "keyup",
    function(event){
        if (event.target.value != "") {
            getMovies(SEARCHAPI + event.target.value)
        } else {
            getMovies(APIURL);
        }
    }
)
/* ===== MOUSE PARALLAX ===== */
document.addEventListener("mousemove", (e) => {
    document.body.style.setProperty("--x", e.clientX + "px");
    document.body.style.setProperty("--y", e.clientY + "px");

    const moveX = (e.clientX / window.innerWidth - 0.5) * 40;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 40;

    document.body.style.setProperty("--moveX", moveX + "px");
    document.body.style.setProperty("--moveY", moveY + "px");

    /* Neon Cursor Trail */
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";
    document.body.appendChild(trail);

    setTimeout(() => trail.remove(), 200);
});

/* ===== CREATE STAR LAYERS ===== */
["star-layer1","star-layer2","star-layer3"].forEach(cls=>{
    const layer = document.createElement("div");
    layer.className = cls;
    document.body.appendChild(layer);
});

/* ===== SHOOTING STARS + SOUND ===== */
const shootSound = new Audio("https://www.soundjay.com/button/sounds/button-3.mp3");

setInterval(() => {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(star);

    shootSound.play();

    setTimeout(() => star.remove(), 1500);
}, 5000);

/* ===== CLICK EXPLOSION PARTICLES ===== */
document.addEventListener("click", (e) => {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = e.clientX + "px";
        particle.style.top = e.clientY + "px";

        const dx = (Math.random() - 0.5) * 200 + "px";
        const dy = (Math.random() - 0.5) * 200 + "px";

        particle.style.setProperty("--dx", dx);
        particle.style.setProperty("--dy", dy);

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 800);
    }
});
