// Definitions des variables
const photographeImg = document.getElementsByClassName("photographe-img")[0];
const photographeSection = document.getElementsByClassName("photographe-section")[0];
const tags = document.querySelectorAll('.header-navigation-item > a');

let fisheyeData;
let fisheyePhotographers = [];

console.log(tags);
console.log(tags[0].innerText.split('#')[1].toLowerCase());

// appel du fichier json fisheyedata
fetch("../FishEyeData.json")
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data);
    fisheyeData = data;
    for (let i in fisheyeData.photographers) {
      fisheyePhotographers.push(fisheyeData.photographers[i])
    }
    affichagePhotographe();
  })


// affichage dynamique des photopgraphes
function affichagePhotographe() {
  photographeSection.innerHTML = ""
  for (let i in fisheyePhotographers) {
    console.log(fisheyePhotographers[i])

    // recuperation des noms pour identifier les images de profils
    let nomSplit = fisheyePhotographers[i].portrait.split(".");
    let nomComplet = nomSplit[0]+".png";

    // affichage dynamique des profils photographe
    photographeSection.innerHTML +=
      `<section class="bloc-photographe">
        <a class="lien-photographe" href="profil_photographe.html?id=${fisheyePhotographers[i].id}">
          <img class="photographe-img" src="img/${nomComplet}" alt="">
          <h2 class="photographe-nom">${fisheyePhotographers[i].name}</h2>
        </a>
        <p class="photographe-lieu" lang="en">${fisheyePhotographers[i].city}, ${fisheyePhotographers[i].country}</p>
        <p class="photographe-slogan">${fisheyePhotographers[i].tagline}</p>
        <p class="photographe-prix">${fisheyePhotographers[i].price}€/jour</p>
        <div class="header-nav">
          <ul class="photographe-tags">
            
          </ul>
        </div>
      </section>`
    ;

    // affichage dynamique des tags pour chaques profils
    let tagsList = fisheyePhotographers[i].tags;
    console.log(tagsList);
    for (let n in tagsList) {
      console.log(tagsList[n]);
      const photographeTags = document.getElementsByClassName("photographe-tags")[i];
      photographeTags.innerHTML += 
      `<li class="tags-item">
        <span class="sr-only" lang="en">Tag ${tagsList[n]}</span>
        <a href="" lang="en">#${tagsList[n]}</a>
      </li>`
    }
  }
}

// Filtrage des photographes par tag
for (let i = 0; i < tags.length; i++) {
  tags[i].addEventListener('click', function(e) {
    e.preventDefault();
    fisheyePhotographers = [];
    let selectedTag = tags[i].innerText.split('#')[1].toLowerCase();
    // si un photographe correspond au tag selectionné, il est ajouté au tableau fisheyePhotographers
    for (let y in fisheyeData.photographers) {
      for (let n in fisheyeData.photographers[y].tags) {
        if (selectedTag === fisheyeData.photographers[y].tags[n]) {
          fisheyePhotographers.push(fisheyeData.photographers[y]);
          break;
        }
      }
    }
    affichagePhotographe();
  })
}
