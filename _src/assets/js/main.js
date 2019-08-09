"use strict";

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
    showFavs();
    searchSeries();
    showData();
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
  listenShow();
}

function getFavoriteClassName(item) {
  return isThisShowFav(savedSeries[item].id) ? "show-item--fav" : "";
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
    //console.log(showFavs(id));
  }
  showData();
}

function showClicked(ev) {
  const currentTarget = ev.currentTarget;
  const showClickedID = parseInt(currentTarget.dataset.id);
  //console.log(showClickedID); //Devuélveme el índice de lo que he clickado
  return showClickedID;
}

function addToFavorites(id) {
  for (const item of savedSeries) {
    if (item.id === id) {
      favoriteShows.push(item);
    }
  }
  console.log("Added to favorites:", favoriteShows);
  showFavs();
}

function removeFromFavorites(id) {
  for (let index = 0; index < favoriteShows.length; index++) {
    if (favoriteShows[index].id === id) {
      favoriteShows.splice(index, 1);
    }
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
  setFavoritesinLocalStorage();
  //   const removeBtn = document.querySelectorAll(".btn__remove-favorite");

  // Me da error porque está cogiendo el addEventListener como función

  //   function removeFavsFromList() {
  //   removeBtn.addEventListener("click", removeFavsFromList);
  //     for (let button of removeBtn) {
  //       getFavoritesFromLocalStorage(button);
  //       console.log(getFavoritesFromLocalStorage(button));
  //       removeFromFavorites(); //Es ID

  //       //   if (favoriteShows[index].id === id) {
  //       //     favoritesToShow.splice(item, 1);
  //       //   }
  //     }
  // removeFavsFromList();

  //Meter bucle y luego función intermedia
}

function startApp() {
  //Función que nos permite mostrar favoritos nada más comenzar
  let localFavs = JSON.parse(localStorage.getItem("Favorite shows"));
  if (localFavs !== null) {
    favoriteShows = localFavs;
    showFavs();
  }
}

startApp();

const btn = document.querySelector(".js-btn");

btn.addEventListener("click", handleFunction);
