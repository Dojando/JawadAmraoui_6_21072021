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
const portfolioFiltre = document.getElementById("portfolio_filtre");
const optionPopularite = document.getElementById('option_popularite');
const optionDate = document.getElementById('option_date');
const optionTitre = document.getElementById('option_titre');
const buttonLike = document.getElementsByClassName('button-like');
const likesValeur = document.getElementsByClassName('likes_valeur');



let urlSplit = location.href.split('id=');
let fisheyeData;
let fisheyeMedia = [];
let optionList = [optionPopularite, optionTitre, optionDate];
let mediaId = [];
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
        // Filtrer les medias du plus liké au moins liké (par défaut) 
        fisheyeMedia.sort(function(a, b) {
          return b.likes - a.likes;
        });
        portfolioFiltre.textContent = "Popularité";
        optionPopularite.setAttribute('aria-selected', 'true');
        optionDate.setAttribute('aria-selected', 'false');
        optionTitre.setAttribute('aria-selected', 'false');
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
  photographeTags.innerHTML = "";
  for (let i in fisheyeData.tags) {
    photographeTags.innerHTML +=
    `<li class="tags-item">
      <span class="sr-only" lang="en">Tag ${fisheyeData.tags[i]}</span>
      <a href="" lang="en">#${fisheyeData.tags[i]}</a>
    </li>`
  }
  console.log(fisheyeMedia);
  console.log(fisheyeData.name);

  portfolioMedia.innerHTML = "";
  mediaId = [];
  likesTotal = 0;
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
              <p class="likes_valeur">${fisheyeMedia[i].likes}</p>
              <button class="button-like">
                <img src="img/likes.png" alt="likes">
              </button>
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
              <p class="likes_valeur" id="${fisheyeMedia[i].id}">${fisheyeMedia[i].likes}</p>
              <button class="button-like">
                <img src="img/likes.png" alt="likes">
              </button>
            </div>
          </div>
        </div>
      </li>`
    }
    mediaId += fisheyeMedia[i].id;
    likesTotal += fisheyeMedia[i].likes;
  }
  totalLikes.textContent = likesTotal;
  likeMedias();
}

// script pour 'liké' les medias
function likeMedias() {
  for (let i = 0; i < fisheyeMedia.length; i++) {
    buttonLike[i].addEventListener('click', function(e) {
      fisheyeMedia[i].likes += 1;
      likesValeur[i].innerHTML = fisheyeMedia[i].likes;
      // re-calcul et affichage du nombre total de likes
      likesTotal = 0;
      for (y in fisheyeMedia) {
        likesTotal += fisheyeMedia[y].likes
      }
      totalLikes.textContent = likesTotal;
    })
  }
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


// script pour le filtre par date du dropdown
function filtreDate() {
  // Filtrer les medias du plus récent au plus vieux
  fisheyeMedia.sort(function(a, b) {
    let da = new Date(a.date);
    let db = new Date(b.date);
    return db - da;
  });
  portfolioFiltre.textContent = "Date";
  optionPopularite.setAttribute('aria-selected', 'false');
  optionDate.setAttribute('aria-selected', 'true');
  optionTitre.setAttribute('aria-selected', 'false');
  dropdown_options.style.display = "none";
  affichageProfilPhotographe();
}
optionDate.addEventListener('click', filtreDate());

// script pour le filtre par titre du dropdown
function filtreTitre() {
  // Filtrer les medias par titre (ordre alphabetique)
  fisheyeMedia.sort(function(a, b) {
    let ta = a.title.toLowerCase();
    let tb = b.title.toLowerCase();

    if (ta < tb) {
        return -1;
    }
    if (ta > tb) {
        return 1;
    }
    return 0;
  });
  portfolioFiltre.textContent = "Titre";
  optionPopularite.setAttribute('aria-selected', 'false');
  optionDate.setAttribute('aria-selected', 'false');
  optionTitre.setAttribute('aria-selected', 'true');
  dropdown_options.style.display = "none";
  affichageProfilPhotographe();
}
optionTitre.addEventListener('click', filtreTitre());

// script pour le filtre par popularité du dropdown
function filtrePopularite() {
  // Filtrer les medias du plus liké au moins liké
  fisheyeMedia.sort(function(a, b) {
    return b.likes - a.likes;
  });
  portfolioFiltre.textContent = "Popularité";
  optionPopularite.setAttribute('aria-selected', 'true');
  optionDate.setAttribute('aria-selected', 'false');
  optionTitre.setAttribute('aria-selected', 'false');
  dropdown_options.style.display = "none";
  affichageProfilPhotographe();
}
optionPopularite.addEventListener('click', filtrePopularite());


// ajout de l'attribut aria-activedescendant pour ARIA
for (let i in optionList) {
  optionList[i].addEventListener('focus', function(e) {
    dropdown_options.setAttribute('aria-activedescendant', `${optionList[i].id}`)
  });
  optionList[i].addEventListener('focusout', function(e) {
    dropdown_options.removeAttribute('aria-activedescendant');
  })
}


