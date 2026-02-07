function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  const section = document.querySelector('.episode-list');
  const template = document.getElementById("episode-template");
  for (let episode of episodeList) {

    const {name, season, number, summary} = episode;
    const {medium} = episode.image
    const newCard = template.content.cloneNode(true);

    newCard.querySelector(".fi-title").textContent = `${formatEpisodeName(name)} ${formatEpisodeNumber(season,number)}`;
    newCard.querySelector("img").src = medium;
    newCard.querySelector(".fi-summary").innerHtml = summary;
    
    section.appendChild(newCard);
  }
}

function formatEpisodeNumber(season,number) {
  return `\nS${season < 10 ? "0" : ""}${season}E${number < 10 ? "0" : ""}${number}`;
}
function formatEpisodeName(name) {
  const maxLength = 25;
  return name.length < maxLength ? name : `${name.substring(0, maxLength - 3)}...`;
}

function filterEpisodes(episodeList,input){
  document.querySelector(".episode-list").innerHTML =`<template id="episode-template">
          <div class="divider">
            <h3 class="fi-title"></h3>
            <img class="episode-image" src="" alt="Episode Image" />
            <div class="fi-summary"></div>
          </div>
        </template>`;
    for (let episode of episodeList) {
        const {name, season, number, summary} = episode;
        const {medium} = episode.image;
        const newCard = document.querySelector('#episode-template').content.cloneNode(true);
        const newdiv = document.createElement("div");
        if((name.includes(input)) || (summary.includes(input))){
          newCard.querySelector(".fi-title").textContent = `${formatEpisodeName(name)} ${formatEpisodeNumber(season,number)}`;
          newCard.querySelector("img").src = medium;
          newCard.querySelector(".fi-summary").innerHtml = summary;
          newdiv.append(newCard);
        }

      document.querySelector(".episode-list").append(newdiv);
  }
}

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes); 

  const inputValue = document.querySelector(".ep-search-input");
  inputValue.addEventListener("keydown", () => {
    filterEpisodes(allEpisodes,inputValue.value);
  })

}
window.onload = setup;