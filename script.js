const key = "75afcb95";
let currentPage;
let inputName = document.querySelector("#input");
let container = document.querySelector(".movie-container");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
 
let query="";

let timer;

async function movieData(e) {
  try {
    clearTimeout(timer);
    timer = await setTimeout(async () => {
      container.innerHTML = "";

      const url = `https://www.omdbapi.com/?&apikey=${key}&s=${e}&page=${currentPage}`;

      let res = await fetch(url);

      let data = await res.json();

      data.Search.forEach((element) => {
        // console.log(element);

        let div = document.createElement("div");
        div.className='img-div';
        div.innerHTML = `<img src="${element.Poster}" alt="" class="image">
        
<p class="title">${element.Title}</p>`;
        div.setAttribute('imdb',element.imdbID);
        container.appendChild(div);    
        
      });

      showDescription();

    }, 300);
    
    

  } catch (error) {
    console.error(error);
  }
}

inputName.addEventListener("keyup", (e) => {
  query = e.target.value;
  currentPage = 1;
  movieData(query);
});

// pageNext and prev

next.addEventListener("click", () => {
  if(query){
    currentPage++;
    movieData(query);
  }
  
});

prev.addEventListener("click", () => {
  if(query && currentPage>1){
    currentPage--;
    movieData(query);
  }
});


// description display

function showDescription(){
  let imgDivs = document.querySelectorAll('.img-div');  // Select all .img-div elements
  imgDivs.forEach(div => {
    div.addEventListener('click', (e) => {
      let id = div.getAttribute('imdb');  // Get imdb attribute from the clicked div
      displayDetails(id);
    });
  });
}


async function displayDetails(id) {
  let res = await fetch(`https://www.omdbapi.com/?&apikey=${key}&i=${id}`);
  let data =await res.json();
  console.log(data);
  let div = document.createElement('div');
  div.innerHTML=`<img src="${data.Poster}" alt="${data.Title}">
<p>Summary: ${data.Plot} </p>
<p>Actor name : ${data.Actors} </p>
<p>Release Date : ${data.Released}</p>
<p>IMDB Rating : ${data.imdbRating}</p>`
document.querySelector('body').appendChild(div);
}

