"use strict";

//import { format } from "url";

console.log(">> Ready :)");

let savedSeries = [];
let favoriteShows = [];

const input = document.querySelector(".js-input");

function handleFunction(event) {
  event.preventDefault;
  searchSeries();
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
    results.push({
      name: data[i].show.name,
      image: data[i].show.image.medium
    });
  }
  return results;
}

function saveData(data) {
  savedSeries = data;
  //console.log(savedSeries);
}

function showData() {
  const series = document.querySelector(".js-series_section");
  let seriesToAdd = "";
  for (let item = 0; item < savedSeries.length; item++) {
    seriesToAdd += `<div class="serie_element ${getFavoriteClassName(
      item
    )}" data-index="${item}"><p class="show_title">${
      savedSeries[item].name
    }</p><img class="show_image" src="${savedSeries[item].image}" /></div>`;
  }
  series.innerHTML = seriesToAdd;
  //console.log(series);
}

function getFavoriteClassName(item) {
  //Si es favorito le meto la clase, si no no
  return isThisShowFav(item) ? "show-item--fav" : "";
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
  } else {
    //Añadimos a favoritos
    addToFavorites(item);
  }
  showData();
  listenShow();
}

function showClicked(ev) {
  const currentTarget = ev.currentTarget;
  //   currentTarget.classList.toggle("show-item--fav");
  const showClickedIndex = parseInt(currentTarget.dataset.index);
  console.log(currentTarget); //Devuélveme el índice de lo que he clickado
  return showClickedIndex;
}

function addToFavorites(item) {
  favoriteShows.push(item);
  console.log("Added to favorites:", favoriteShows);
}

function isThisShowFav(item) {
  const numberIndex = favoriteShows.indexOf(item);
  if (numberIndex >= 0) {
    //Si existe
    console.log(`Check if numberIndex ${item} is fav >>`, true);
    return true;
  } else {
    //console.log(`Check if numberIndex ${item} is not fav >>`, false);
    return false;
  }
}

const btn = document.querySelector(".js-btn");

btn.addEventListener("click", handleFunction);
