//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  const main = document.createElement('main');
  main.className = 'main-content';
  document.body.appendChild(main);
  const header = document.createElement('header');
  main.appendChild(header);
  header.className = 'page-header';
  header.style.textAlign = 'center';
  const h1 = document.createElement('h1');
  h1.textContent = 'TV Show Project';
  h1.className = 'page-title';
  header.appendChild(h1);
  const p = document.createElement('p');
  p.textContent = 'A collection of my favorite TV show episodes';
  p.className = 'page-description';
  header.appendChild(p);
  const section = document.createElement('section');
  section.className = 'episode-list'; 
  main.appendChild(section);

  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  const section = document.querySelector('.episode-list');

  const title_episode = document.createElement('h3');
  title_episode.className = 'fi-title';
  title_episode.textContent = `${episodeList[0].name} ${SxxExx(episodeList[0].season, episodeList[0].number)}`;
  section.appendChild(title_episode);
  const img = document.createElement('img');
  img.src = episodeList[0].image.medium;
  section.appendChild(img);
  const summary = document.createElement('div');
  summary.innerHTML = episodeList[0].summary;
  section.appendChild(summary);
}

window.onload = setup;
function SxxExx(season, episode) {
  return `S${season < 10 ? "0" : ""}${season}E${episode < 10 ? "0" : ""}${episode}`;
}