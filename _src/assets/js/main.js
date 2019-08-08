"use strict";

//import { format } from "url";

console.log(">> Ready :)");

let savedSeries = [];

const input = document.querySelector(".js-input");
//const series = document.querySelector(".js-series_section");

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
    });
}
//   let results = "";
//   for (let item of data) {
//     results += `<div class="serie_element"><p class="show_title">${
//       item.show.name
//     }</p><img class="show_image" src="${item.show.image.medium}" /></div>`;
//   series.innerHTML = results;
//   const divSerie = document.querySelectorAll(".serie_element");
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

const btn = document.querySelector(".js-btn");

btn.addEventListener("click", handleFunction);
