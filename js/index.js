// Definitions des variables
let fisheyeData;
const photographeImg = document.getElementsByClassName("photographe-img")[0];
const photographeSection = document.getElementsByClassName("photographe-section")[0];

// appel du fichier json fisheyedata
fetch("../FishEyeData.json")
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data);
    fisheyeData = data;
    affichagePhotographe();
  })


// affichage dynamique des photopgraphes
function affichagePhotographe() {
  for (let i in fisheyeData.photographers) {
    console.log(fisheyeData.photographers[i])

    // recuperation des noms pour identifier les images de profils
    let nomSplit = fisheyeData.photographers[i].portrait.split(".");
    let nomComplet = nomSplit[0]+".png";

    // affichage dynamique des profils photographe
    photographeSection.innerHTML +=
      `<section class="bloc-photographe">
        <a class="lien-photographe" href="profil_photographe.html?id=${fisheyeData.photographers[i].id}">
          <img class="photographe-img" src="img/${nomComplet}" alt="">
          <h2 class="photographe-nom">${fisheyeData.photographers[i].name}</h2>
        </a>
        <p class="photographe-lieu" lang="en">${fisheyeData.photographers[i].city}, ${fisheyeData.photographers[i].country}</p>
        <p class="photographe-slogan">${fisheyeData.photographers[i].tagline}</p>
        <p class="photographe-prix">${fisheyeData.photographers[i].price}€/jour</p>
        <div class="header-nav">
          <ul class="header-nav-tags">
            
          </ul>
        </div>
      </section>`
    ;

    // affichage dynamique des tags pour chaques profils
    let tagsList = fisheyeData.photographers[i].tags;
    console.log(tagsList);
    for (let n in tagsList) {
      console.log(tagsList[n]);
      const tags = document.getElementsByClassName("header-nav-tags")[i];
      tags.innerHTML += 
      `<li class="header-navigation-item">
        <span class="sr-only" lang="en">Tag ${tagsList[n]}</span>
        <a href="#" lang="en">#${tagsList[n]}</a>
      </li>`
    }
    
  }
}