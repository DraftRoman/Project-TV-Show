//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

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

window.onload = setup;
function formatEpisodeNumber(season,number) {
  return `\nS${season < 10 ? "0" : ""}${season}E${number < 10 ? "0" : ""}${number}`;
}
function formatEpisodeName(name) {
  const maxLength = 25;
  return name.length < maxLength ? name : `${name.substring(0, maxLength - 3)}...`;
}