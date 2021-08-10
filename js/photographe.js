// récupération des éléments du DOM
const custom_dropdown = document.getElementById('custom_dropdown');
const dropdown_options = document.getElementById('dropdown_options');
const arrow = document.getElementById('arrow');

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