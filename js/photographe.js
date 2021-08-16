// récupération des éléments du DOM
const custom_dropdown = document.getElementById('custom_dropdown');
const dropdown_options = document.getElementById('dropdown_options');
const arrow = document.getElementById('arrow');

const photographeNom = document.getElementsByClassName('photographe-details-nom')[0];
const photographeLieu = document.getElementsByClassName('photographe-details-lieu')[0];
const photographeSlogan = document.getElementsByClassName('photographe-details-slogan')[0];
const photographeTags = document.getElementsByClassName('header-nav-tags')[0];
const photographeImg = document.getElementsByClassName('photographe-img')[0];
const portfolioMedia = document.getElementsByClassName('portfolio_photographe_medias')[0];
const totalLikes = document.getElementById("total_likes_p");
const prixJour = document.getElementById("prix_jour");


let urlSplit = location.href.split('id=');
let fisheyeData;
let fisheyeMedia = [];
let likesTotal = 0;

// appel du fichier json fisheyedata
fetch("../FishEyeData.json")
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data);
    // recuperation des infos du photographe
    for (let i = 0; i < data.photographers.length; i++) {
      if (data.photographers[i].id == urlSplit[1]) {
        fisheyeData = data.photographers[i];
        // recuperation des medias du photographe
        for (let n in data.media) {
          if (data.media[n].photographerId == urlSplit[1]) {
            fisheyeMedia.push(data.media[n]);
          }
        }
        affichageProfilPhotographe();
      }
    }
  })

function affichageProfilPhotographe() {
  console.log(fisheyeData);
  // ajout dynamique des infos photographe
  photographeNom.textContent = fisheyeData.name;
  photographeLieu.textContent = fisheyeData.city+", "+fisheyeData.country;
  photographeSlogan.textContent = fisheyeData.tagline;
  photographeImg.setAttribute("src", "../img/"+fisheyeData.portrait.split('.')[0]+".png");
  prixJour.textContent = fisheyeData.price+"€ / jour";

  // affichage dynamique des tags du photographe
  for (let i in fisheyeData.tags) {
    photographeTags.innerHTML +=
    `<li class="header-navigation-item">
      <span class="sr-only" lang="en">Tag ${fisheyeData.tags[i]}</span>
      <a href="#" lang="en">#${fisheyeData.tags[i]}</a>
    </li>`
  }
  console.log(fisheyeMedia);
  console.log(fisheyeData.name);

  for (let i in fisheyeMedia) {
    // affichage dynamique des photos
    if (fisheyeMedia[i].image != undefined) {
      portfolioMedia.innerHTML +=
      `<li>
        <a href="#">
          <img src="FishEye_Photos/Sample_Photos/${fisheyeData.name.split(' ')[0]}/${fisheyeMedia[i].image}" alt="${fisheyeMedia[i].alt}">
        </a>
        <div class="media_detail">
          <p class="media_titre">${fisheyeMedia[i].title}</p>
          <div class="media_prix_likes">
            <p>${fisheyeMedia[i].price}€</p>
            <div class="media_likes">
              <p>${fisheyeMedia[i].likes}</p>
              <span>
                <img src="img/likes.png" alt="likes">
              </span>
            </div>
          </div>
        </div>
      </li>`
    }
    // affichage dynamique des videos
    if (fisheyeMedia[i].video != undefined) {
      portfolioMedia.innerHTML +=
      `<li>
        <a href="#">
          <video>
            <source src="FishEye_Photos/Sample_Photos/${fisheyeData.name.split(' ')[0]}/${fisheyeMedia[i].video}" type="video/mp4">
          </video>
        </a>
        <div class="media_detail">
          <p class="media_titre">${fisheyeMedia[i].title}</p>
          <div class="media_prix_likes">
            <p>${fisheyeMedia[i].price}€</p>
            <div class="media_likes">
              <p>${fisheyeMedia[i].likes}</p>
              <span>
                <img src="img/likes.png" alt="likes">
              </span>
            </div>
          </div>
        </div>
      </li>`
    }
    likesTotal += fisheyeMedia[i].likes;
  }
  totalLikes.textContent = likesTotal;
}

// script pour le menu dropdown de la page photographe
custom_dropdown.addEventListener('click', function(e) {
  if (getComputedStyle(dropdown_options).display == "none") {
    dropdown_options.style.display = "flex";
    arrow.setAttribute('src', 'img/arrow_open.png');
    custom_dropdown.setAttribute('aria-expanded', 'true');
  }
  else if (getComputedStyle(dropdown_options).display == "flex") {
    dropdown_options.style.display = "none";
    arrow.setAttribute('src', 'img/arrow_closed.png');
    custom_dropdown.setAttribute('aria-expanded', 'false');
  }
})

