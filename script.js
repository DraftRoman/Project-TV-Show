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
    const newCard = template.content.cloneNode(true);
    const titleElement = newCard.querySelector(".fi-title");
    titleElement.textContent = `${formatEpisodeName(episode)} ${formatEpisodeNumber(episode)}`;
    const img = newCard.querySelector('.episode-image');
    img.src = episode.image.medium;

    const summaryElement = newCard.querySelector('.fi-summary');
    summaryElement.innerHTML = episode.summary;
    section.appendChild(newCard);

  }
}

window.onload = setup;
function formatEpisodeNumber(episode) {
  return `\nS${episode.season < 10 ? "0" : ""}${episode.season}E${episode.number < 10 ? "0" : ""}${episode.number}`;
}
function formatEpisodeName(episode) {
  const maxLength = 25;
  return episode.name.length < maxLength ? episode.name : `${episode.name.substring(0, maxLength - 3)}...`;
}