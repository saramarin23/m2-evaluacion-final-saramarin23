"use strict";

//import { parse } from "url";

//import { format } from "url";

console.log(">> Ready :)");

let savedSeries = [];
let favoriteShows = [];

let localFavs = JSON.parse(localStorage.getItem("Favorite shows"));
if (localFavs !== null) {
  favoriteShows = localFavs;
}

//const favoriteList = document.querySelector(".js-fav_list");

// function defaultFavorites() {
//   let localFavs = "";
//   for (const item of favoriteShows) {
//     localFavs += getFavoritesFromLocalStorage(item.name);
//   }
//   favoriteList.innerHTML = localFavs;
// }

// defaultFavorites();

const input = document.querySelector(".js-input");

function handleFunction(event) {
  event.preventDefault();
  const favsFromLocalStorage = getFavoritesFromLocalStorage();
  if (favsFromLocalStorage === null) {
    searchSeries();
  } else {
    favoriteShows = favsFromLocalStorage;
    showFavs();
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
    )}" data-id="${savedSeries[item].id}"><p class="show_title">${
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
  const id = showClicked(ev);
  if (isThisShowFav(id)) {
    //Borramos de favoritos
    removeFromFavorites(id);
  } else {
    //Añadimos a favoritos
    addToFavorites(id);
    console.log(showFavs(id));
  }
  showData();
  listenShow();
}

function showClicked(ev) {
  const currentTarget = ev.currentTarget;
  const showClickedID = parseInt(currentTarget.dataset.id);
  console.log(showClickedID); //Devuélveme el índice de lo que he clickado
  return showClickedID;
}

function addToFavorites(id) {
  debugger;
  for (const item of savedSeries) {
    if (item.id === id) {
      favoriteShows.push(item);
    }
  }
  console.log("Added to favorites:", favoriteShows);
}

//Si tengo favoriteShows.push(item); arriba y let showIndex = favoriteShows.indexOf(item); if (showIndex !== -1) {
// favoriteShows.splice(showIndex, 1); abajo, borra pero no añade

//Si tengo favoriteShows.push((savedSeries[item])); arriba y let showIndex = favoriteShows.indexOf(item); if (showIndex !== -1) {
// favoriteShows.splice(showIndex, 1); abajo, añade pero no borra

function removeFromFavorites(item) {
  for (const item of favoriteShows) {
    if (item.id !== id) {
      favoriteShows.splice(savedSeries[item].id);
    }
  }
  let showIndex = favoriteShows.indexOf(item);
  if (showIndex !== -1) {
    favoriteShows.splice(item, 1);
  }
  setFavoritesinLocalStorage();
  console.log("Remove from favorites array >> Favorites:", favoriteShows);
}

function isThisShowFav(id) {
  for (const item of favoriteShows) {
    if (item.id === id) {
      return true;
    }
  }
  return false;

  // const foundFav = savedSeries.indexOf(item);
  // console.log(item.name);
  // if (foundFav >= 0) {
  //   //Si existe
  //   console.log(`Check if numberIndex ${item.name} is fav >>`, true);
  //   return true;
  // } else {
  //   //console.log(`Check if show ${item} is not fav >>`, false);
  //   return false;
  // }
}

function showFavs() {
  const favoriteList = document.querySelector(".js-fav_list");
  let favoritesToShow = "";
  for (let item = 0; item < favoriteShows.length; item++) {
    favoritesToShow += `<li class="favorite_element" data-index="${item}", data-id"${
      favoriteShows[item].id
    }"><div class="title_fav"><p class="show_title">${
      favoriteShows[item].name
    }</p><button class="btn__remove-favorite">X</button></div><img class="fav_img" src="${
      favoriteShows[item].image
    }" /></li>`;
  }
  favoriteList.innerHTML = favoritesToShow;
  //console.log(favoriteList);
  setFavoritesinLocalStorage();
}

const btn = document.querySelector(".js-btn");

btn.addEventListener("click", handleFunction);
