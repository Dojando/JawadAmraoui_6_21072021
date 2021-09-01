// Definitions des variables
const photographeSection = document.getElementsByClassName("photographe-section")[0];
const tags = document.querySelectorAll('.header-navigation-item > a');

let fisheyeData;
let fisheyePhotographers = [];
let selectedTags = [];

// appel du fichier json fisheyedata
fetch("../FishEyeData.json")
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data);
    fisheyeData = data;
    fisheyePhotographers = fisheyeData.photographers;
    affichagePhotographe(fisheyePhotographers);
  })


// affichage dynamique des photopgraphes
function affichagePhotographe(photographersData) {
  photographeSection.innerHTML = ""
  for (let i in photographersData) {

    // recuperation des noms pour identifier les images de profils
    let nomSplit = photographersData[i].portrait.split(".");
    let nomComplet = nomSplit[0]+".png";

    // affichage dynamique des profils photographe
    photographeSection.innerHTML +=
      `<section class="bloc-photographe">
        <a class="lien-photographe" href="profil_photographe.html?id=${photographersData[i].id}">
          <img class="photographe-img" src="img/${nomComplet}" alt="vignette de ${photographersData[i].name}">
          <h2 class="photographe-nom">${photographersData[i].name}</h2>
        </a>
        <p class="photographe-lieu" lang="en">${photographersData[i].city}, ${photographersData[i].country}</p>
        <p class="photographe-slogan">${photographersData[i].tagline}</p>
        <p class="photographe-prix">${photographersData[i].price}€/jour</p>
        <div class="header-nav">
          <ul class="photographe-tags" aria-label="tags de ${photographersData[i].name}">
            
          </ul>
        </div>
      </section>`
    ;

    // affichage dynamique des tags pour chaques profils
    let tagsList = photographersData[i].tags;
    for (let n in tagsList) {
      const photographeTags = document.getElementsByClassName("photographe-tags")[i];
      photographeTags.innerHTML += 
      `<li tabindex="0" class="tags-item header-navigation-item-a">
          <span aria-hidden="true">#${tagsList[n]}</span>
          <span class="sr-only" lang="en">Tag ${tagsList[n]}</span>
      </li>`
    }
  }
}



// Filtrage des photographes par tag
for (let i = 0; i < tags.length; i++) {
  tags[i].addEventListener('click', function(e) {
    e.preventDefault();
    fisheyePhotographers = [];
    let selectedTag = tags[i].firstElementChild.innerText.split('#')[1].toLowerCase();
    // ajout et suppression des tags selectionné au tableau selectedTags
    if (selectedTags.indexOf(selectedTag) === -1) {
      selectedTags.push(selectedTag);
      tags[i].classList.add("selectedTag");
    }
    else if (selectedTags.indexOf(selectedTag) != -1) {
      selectedTags.splice(selectedTags.indexOf(selectedTag), 1);
      tags[i].classList.remove("selectedTag");
    }

    // si un photographe correspond aux tags selectionnés, il est ajouté au tableau fisheyePhotographers 
    for (let y in fisheyeData.photographers) {
      let valid = true;
      for (let t in selectedTags) {
        if (fisheyeData.photographers[y].tags.indexOf(selectedTags[t]) === -1) {  
          valid = false;
        }   
      }
      if (valid === true) {
        fisheyePhotographers.push(fisheyeData.photographers[y]);
      }
    }
    console.log(selectedTags);
    affichagePhotographe(fisheyePhotographers);
  })
}
