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
const mediasLiens = document.getElementsByClassName('media_lien');
const lightboxContainer = document.getElementsByClassName('lightbox_container')[0];
const lightboxMedia = document.getElementsByClassName('lightbox_img')[0];
const fermerLightbox = document.getElementsByClassName('close_lightbox')[0];
const mediaPrecedent = document.getElementsByClassName('left_arrow')[0];
const mediaSuivant = document.getElementsByClassName('right_arrow')[0];
const buttonContact = document.getElementsByClassName('button-contact')[0];
const formulaireContact = document.getElementsByClassName('contact_form')[0];
const contactContainer = document.getElementsByClassName('contact_container')[0];
const closeForm = document.getElementsByClassName('close_form')[0];
const titreContact = document.getElementById('contact');


let urlSplit = location.href.split('id=');
let fisheyeData;
let fisheyeMedia = [];
let optionList = [optionPopularite, optionTitre, optionDate];
let likesTotal = 0;
let selectedMedia = 0;
let url = "../FishEyeData.json";

// appel du fichier json fisheyedata
getData();
function getData() {
  fetch(url)
    .then(function(res) {
      if (res.ok == false) {
        url = "https://dojando.github.io/JawadAmraoui_6_21072021/FishEyeData.json";
        getData();
      }
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
}


function affichageProfilPhotographe() {
  console.log(fisheyeData);
  // ajout dynamique des infos du photographe
  photographeNom.textContent = fisheyeData.name;
  photographeLieu.textContent = fisheyeData.city+", "+fisheyeData.country;
  photographeSlogan.textContent = fisheyeData.tagline;
  photographeImg.setAttribute("src", "../img/"+fisheyeData.portrait.split('.')[0]+".png");
  prixJour.textContent = fisheyeData.price+"€ / jour";
  titreContact.innerHTML = `Contactez-moi<br>${fisheyeData.name}`;

  // affichage dynamique des tags du photographe
  photographeTags.innerHTML = "";
  for (let i in fisheyeData.tags) {
    photographeTags.innerHTML +=
    `<li tabindex="0" class="tags-item header-navigation-item-a">
      <span aria-hidden="true">#${fisheyeData.tags[i]}</span>
      <span class="sr-only" lang="en">Tag ${fisheyeData.tags[i]}</span>
    </li>`
  }
  console.log(fisheyeMedia);
  console.log(fisheyeData.name);

  portfolioMedia.innerHTML = "";
  likesTotal = 0;
  for (let i in fisheyeMedia) {
    // affichage dynamique des photos
    if (fisheyeMedia[i].image != undefined) {
      portfolioMedia.innerHTML +=
      `<li>
        <a id="${fisheyeMedia[i].id}" class="media_lien" href="">
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
        <a id="${fisheyeMedia[i].id}" class="media_lien" href="">
          <video aria-label="${fisheyeMedia[i].alt}" aria-describedby="${fisheyeMedia[i].alt}">
            <source src="FishEye_Photos/Sample_Photos/${fisheyeData.name.split(' ')[0]}/${fisheyeMedia[i].video}" type="video/mp4">
            <p>${fisheyeMedia[i].alt}</p>
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
    likesTotal += fisheyeMedia[i].likes;
  }
  totalLikes.textContent = likesTotal;
  likeMedias();
  ajoutLightbox()
}

// script pour 'liké' les medias
function likeMedias() {
  for (let i = 0; i < fisheyeMedia.length; i++) {
    buttonLike[i].addEventListener('click', function() {
      fisheyeMedia[i].likes += 1;
      likesValeur[i].innerHTML = fisheyeMedia[i].likes;
      // re-calcul et affichage du nombre total de likes
      likesTotal = 0;
      for (let y in fisheyeMedia) {
        likesTotal += fisheyeMedia[y].likes
      }
      totalLikes.textContent = likesTotal;
    })
  }
}

// script pour le menu dropdown de la page photographe
custom_dropdown.addEventListener('click', function() {
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
optionDate.addEventListener('click', function filtreDate() {
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
});

// script pour le filtre par titre du dropdown
optionTitre.addEventListener('click', function filtreTitre() {
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
});

// script pour le filtre par popularité du dropdown
optionPopularite.addEventListener('click', function filtrePopularite() {
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
});


// ajout de l'attribut aria-activedescendant pour ARIA
for (let i in optionList) {
  optionList[i].addEventListener('focus', function() {
    dropdown_options.setAttribute('aria-activedescendant', `${optionList[i].id}`)
  });
  optionList[i].addEventListener('focusout', function() {
    dropdown_options.removeAttribute('aria-activedescendant');
  })
}


// fonctionnement de la lightbox
function ajoutLightbox() {
  console.log(mediasLiens[0])
  for (let i = 0; i < mediasLiens.length; i++) {
    mediasLiens[i].addEventListener('click', function(e) {
      e.preventDefault();
      lightboxContainer.style.display = 'flex';
      // identification du media selectionné puis affichage
      for (let n = 0; n < fisheyeMedia.length; n++) {
        if (fisheyeMedia[n].id == mediasLiens[i].id) {
          selectedMedia = n;
          console.log(selectedMedia);
          affichageMediaLightbox(n);
          break;
        }
      }
    })
  }
}
// affichage du media dans la lightbox
function affichageMediaLightbox(mediaPosition) {
  if (fisheyeMedia[mediaPosition].image != undefined) {
    lightboxMedia.innerHTML = 
    `<img class="media_lightbox" tabindex="0" src="FishEye_Photos/Sample_Photos/${fisheyeData.name.split(' ')[0]}/${fisheyeMedia[mediaPosition].image}" alt="${fisheyeMedia[mediaPosition].alt}">
    <p>${fisheyeMedia[mediaPosition].title}</p>`
  }
  if (fisheyeMedia[mediaPosition].video != undefined) {
    lightboxMedia.innerHTML = 
    `<video aria-label="${fisheyeMedia[mediaPosition].alt}" class="media_lightbox" tabindex="0" src="FishEye_Photos/Sample_Photos/${fisheyeData.name.split(' ')[0]}/${fisheyeMedia[mediaPosition].video}" controls>
    <p>${fisheyeMedia[mediaPosition].alt}</p>
    </video>
    <p>${fisheyeMedia[mediaPosition].title}</p>`
  }
  const mediaLightbox = document.getElementsByClassName('media_lightbox')[0];
  mediaLightbox.focus();
}
// fonction pour fermer la lightbox
fermerLightbox.addEventListener('click', function() {
    selectedMedia = 0;
    lightboxContainer.style.display = 'none';
})

document.addEventListener('keydown', function (event) {
  if (getComputedStyle(lightboxContainer).display == "flex") {
    if (event.key === 'Escape') {
      selectedMedia = 0;
      lightboxContainer.style.display = 'none';
    }
  }
});

// fonction pour aller au media precedent
mediaPrecedent.addEventListener('click', function(e) {
  e.preventDefault();
  previousMedia();
});

document.addEventListener('keydown', function (event) {
  if (getComputedStyle(lightboxContainer).display == "flex") {
    if (event.key === 'ArrowLeft') {
      previousMedia();
    }
  }
});

function previousMedia() {
  if (selectedMedia > 0) {
    selectedMedia -= 1;
    console.log(selectedMedia);
    affichageMediaLightbox(selectedMedia)
  }
}

// fonction pour aller au media suivant
mediaSuivant.addEventListener('click', function(e) {
  e.preventDefault();
  nextMedia();
})

document.addEventListener('keydown', function (event) {
  if (getComputedStyle(lightboxContainer).display == "flex") {
    if (event.key === 'ArrowRight') {
      nextMedia();
    }
  }
});

function nextMedia() {
  if (selectedMedia < (fisheyeMedia.length - 1)) {
    selectedMedia += 1;
    console.log(selectedMedia);
    affichageMediaLightbox(selectedMedia)
  }
}



// affichage du formulaire de contact
buttonContact.addEventListener('click', function() {
  contactContainer.style.display = "flex";
  formulaireContact.focus();
})
// fermeture du formulaire de contact
closeForm.addEventListener('click', function() {
  contactContainer.style.display = "none";
})

document.addEventListener('keydown', function (event) {
  if (getComputedStyle(contactContainer).display == "flex") {
    if (event.key === 'Escape') {
      contactContainer.style.display = "none";
    }
  }
});

// recupertion des éléments du formulaire
const buttonForm = document.getElementsByClassName('button_form')[0];
const champPrenom = document.getElementById('first');
const champNom = document.getElementById('first');
const champEmail = document.getElementById('first');
const champMessage = document.getElementById('message');

let valeursForm = {};
// envoie des valeurs des champs dans la console
buttonForm.addEventListener('click', function() {
  valeursForm = {
    prenom: champPrenom.value,
    nom: champNom.value,
    email: champEmail.value,
    message: champMessage.value
  }
  console.log(valeursForm);
})
