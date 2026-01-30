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
  const footer = document.createElement('footer');
  footer.className = 'page-footer';
  footer.innerHTML = 'The data has (originally) come from <a href="https://tvmaze.com/">TVMaze.com</a>';
  footer.style.textAlign = 'center';
  footer.style.color = 'gray';
  main.appendChild(footer);


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