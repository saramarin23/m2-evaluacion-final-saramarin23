"use strict";

//import { parse } from "url";

//import { format } from "url";

console.log(">> Ready :)");

let savedSeries = [];
let favoriteShows = [];

const input = document.querySelector(".js-input");

function handleFunction(event) {
  event.preventDefault();
  const favsFromLocalStorage = getFavoritesFromLocalStorage();
  if (favsFromLocalStorage === null) {
    searchSeries();
  } else {
    favoriteShows = favsFromLocalStorage;
    searchSeries();
    showData();
    listenShow();
  }
}

function setFavoritesinLocalStorage() {
  localStorage.setItem("Favorite shows", JSON.stringify(favoriteShows));
}
function getFavoritesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("Favorite shows"));
}

function searchSeries() {
  const inputValue = input.value;
  const url = `http://api.tvmaze.com/search/shows?q=${inputValue}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      //displayShowImage();
      data = formatData(data);
      saveData(data);

      showData();
      listenShow();
    });
}

function formatData(data) {
  let results = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].show.image === null) {
      results.push({
        name: data[i].show.name,
        image:
          "https://via.placeholder.com/210x295/ffffff/666666/?text=No%20Photo",
        id: data[i].show.id
      });
    } else {
      results.push({
        name: data[i].show.name,
        image: data[i].show.image.medium,
        id: data[i].show.id
      });
    }
  }
  return results;
}

function saveData(data) {
  savedSeries = data;
}

function showData() {
  const series = document.querySelector(".js-series_section");
  let seriesToAdd = "";
  for (let item = 0; item < savedSeries.length; item++) {
    seriesToAdd += `<div class="serie_element ${getFavoriteClassName(
      item
    )}" data-index="${item}", data-name"${
      savedSeries[item].name
    }"><p class="show_title">${
      savedSeries[item].name
    }</p><img class="show_image" src="${savedSeries[item].image}" /></div>`;
  }

  series.innerHTML = seriesToAdd;
  //console.log(series);
}

function getFavoriteClassName(item) {
  //Si es favorito le meto la clase, si no no
  return isThisShowFav(savedSeries[item]) ? "show-item--fav" : "";
}

function listenShow() {
  const serieDiv = document.querySelectorAll(".serie_element");
  for (const serie of serieDiv) {
    serie.addEventListener("click", favClick);
  }
}

function favClick(ev) {
  const item = showClicked(ev);
  if (isThisShowFav(item)) {
    //Borramos de favoritos
    removeFromFavorites(item);
  } else {
    //Añadimos a favoritos
    addToFavorites(item);
    showFavs();
  }
  showData();
  listenShow();
}

function showClicked(ev) {
  const currentTarget = ev.currentTarget;
  //   currentTarget.classList.toggle("show-item--fav");
  const showClickedIndex = parseInt(currentTarget.dataset.index);
  //const showClickedName = currentTarget.dataset.name;
  console.log(currentTarget); //Devuélveme el índice de lo que he clickado
  return showClickedIndex;
}

function addToFavorites(item) {
  favoriteShows.push(savedSeries[item]);
  console.log("Added to favorites:", favoriteShows);
}

function removeFromFavorites(item) {
  let showIndex = favoriteShows.indexOf(item);
  if (showIndex !== -1) {
    favoriteShows.splice(showIndex, 1);
  }
  console.log("Remove from favorites array >> Favorites:", favoriteShows);
}

function isThisShowFav(item) {
  //¿Y si metemos un bucle para buscar el id en el indexOf??
  const foundFav = favoriteShows.indexOf(item);
  if (foundFav >= 0) {
    //Si existe
    //console.log(`Check if numberIndex ${item} is fav >>`, true);
    return true;
  } else {
    //console.log(`Check if show ${item} is not fav >>`, false);
    return false;
  }
}

function showFavs() {
  const favoriteList = document.querySelector(".js-fav_list");
  let favoritesToShow = "";
  for (let item = 0; item < favoriteShows.length; item++) {
    favoritesToShow += `<li class="favorite_element ${getFavoriteClassName(
      item
    )}" data-index="${item}", data-name"${
      favoriteShows[item].name
    }"><p class="show_title">${
      favoriteShows[item].name
    }</p><img class="fav_img" src="${favoriteShows[item].image}" /></li>`;
  }
  favoriteList.innerHTML = favoritesToShow;
  setFavoritesinLocalStorage();
}

const btn = document.querySelector(".js-btn");

btn.addEventListener("click", handleFunction);
