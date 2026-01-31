//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  const section = document.querySelector('.episode-list');
  console.log(episodeList)
  for (let episode of episodeList) {
    const divider = document.createElement('div');
    divider.className = 'divider';
    section.appendChild(divider);
    const title_episode = document.createElement('h3');
    title_episode.className = 'fi-title';
    const episodeTitle = episode.name.length < 25 ? episode.name : `${episode.name.substring(0, 22)}...`;
    title_episode.textContent = `${episodeTitle}\n${SxxExx(episode.season, episode.number)}`;
    divider.appendChild(title_episode);
    const img = document.createElement('img');
    img.src = episode.image.medium;
    divider.appendChild(img);
    const summary = document.createElement('div');
    summary.innerHTML = episode.summary;
    summary.style.color = 'white';
    divider.appendChild(summary);
  }
}

window.onload = setup;
function SxxExx(season, episode) {
  return `S${season < 10 ? "0" : ""}${season}E${episode < 10 ? "0" : ""}${episode}`;
}