"use strict";

//import { format } from "url";

console.log(">> Ready :)");

const savedSeries = [];

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
      console.log(data);
      data = formatData(data);
      //saveData(data);
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
  const results = [];
  for (let i = 0; i < data.length; i++) {
    results.push({
      name: data[i].show.name,
      image: data[i].show.image.medium
    });
  }
  console.log(results);
}

// function saveData(data) {
//   let savedSeries = data;
//   console.log(savedSeries);
// }

// function listenShow() {
//   const showDiv = document.querySelectorAll();
// }

// function addToFavs(event) {
//   console.log(event.currentTarget);
// }

const btn = document.querySelector(".js-btn");

btn.addEventListener("click", handleFunction);
