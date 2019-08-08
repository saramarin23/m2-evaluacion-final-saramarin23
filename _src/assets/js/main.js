"use strict";

console.log(">> Ready :)");

const input = document.querySelector(".js-input");
const series = document.querySelector(".js-series_section");

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
      let results = "";
      for (let item of data) {
        console.log(item.show.image);
        results += `<div class="serie_element"><p class="show_title">${
          item.show.name
        }</p><img src="${item.show.image.medium}" /></div>`;
      }
      series.innerHTML = results;
    });
}

const btn = document.querySelector(".js-btn");

btn.addEventListener("click", handleFunction);
