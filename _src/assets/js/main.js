"use strict";

//import { format } from "url";

console.log(">> Ready :)");

let savedSeries = [];

const input = document.querySelector(".js-input");

function handleFunction(event) {
  event.preventDefault;
  searchSeries();
  //listenShow();
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

//   for (let item of divSerie) {
//     item.addEventListener("click", addToFavs);
//   }

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
  console.log(savedSeries);
}

function showData() {
  const series = document.querySelector(".js-series_section");
  let seriesToAdd = "";
  for (let item = 0; item < savedSeries.length; item++) {
    seriesToAdd += `<div class="serie_element"><p class="show_title">${
      savedSeries[item].name
    }</p><img class="show_image" src="${savedSeries[item].image}" /></div>`;
  }
  series.innerHTML = seriesToAdd;
  console.log(series);
}

const btn = document.querySelector(".js-btn");

btn.addEventListener("click", handleFunction);
