import { getData } from "./app.js";

async function setup() {
  const loading = document.getElementById("loading");
  const errorBox = document.getElementById("error");
  loading.style.display = "block";  
  const allEpisodes = await getData();
  loading.style.display = "none";

  if (!allEpisodes) {
    errorBox.style.display = "grid";
    errorBox.textContent = "Oops — couldn't load the episodes. Please refresh.";
    return;
  }

  makePageForEpisodes(allEpisodes);
  setupSearch(allEpisodes);
  episodeSelector(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const component = displayMovies(episodeList,rootElem);
  for(const element of component){
    rootElem.append(element);
  }
}

function setupSearch(allEpisodes) {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener('keyup', (event) => {
    const filteredEpisodes = filterEpisodes(allEpisodes, event.target.value);
    const rootElem = document.getElementById("root");
    rootElem.innerHTML = "";
    const component = displayMovies(filteredEpisodes, rootElem);
    for (const element of component) {
      rootElem.append(element);
    }
    const resultCount = document.getElementById("result-count");
    if (resultCount) {
      resultCount.innerText = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episodes`;

    }
  });
}
function filterEpisodes(allEpisodes, searchText) {
  return allEpisodes.filter(episode => {
    const { name, summary } = episode;
    const episodeName = name.toLowerCase();
    const episodeSummary = summary.toLowerCase();
    const searchTextLower = searchText.toLowerCase()
    return episodeName.includes(searchTextLower) || episodeSummary.includes(searchTextLower);
  })
}
function episodeSelector(allEpisodes) {
  const select = document.getElementById("episode-selector");
  for (const episode of allEpisodes) {
    const opt = document.createElement("option");
    opt.value = episode.name;
    opt.text = episode.name;
    select.add(opt, null);
  }
  select.addEventListener("change", (event) => {
    if (event.target.value == "all-episodes") {
      cleanDisplay();
      makePageForEpisodes(allEpisodes);
    } else {
      const matchedEpisodes = filterEpisodes(allEpisodes, event.target.value);
      cleanDisplay()
      const component = displayMovies(matchedEpisodes);
      const rootElem = document.getElementById("root");
      for (const element of component) {
        rootElem.append(element);
      }
    }
  })
}
function cleanDisplay() {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
}
function displayMovies(Episodes) {
  const useOriginalImage = Episodes.length === 1;
  return Episodes.map(episode => {
    const { name, season, number, summary, image } = episode;
    const img = useOriginalImage ? image.original : image.medium;
    return movieComponent(name, season, number, summary, img);
  });
}

function movieComponent(name,season,number,summary, medium){
  const movie = document.createElement("article");
  const title = document.createElement("h3");
  const movieSummary = document.createElement("p");
  const movieImage = document.createElement("img");
  
  title.innerText = `${formatEpisodeName(name)} - ${formatEpisodeNumber(season,number)}`;
  movieSummary.innerHTML = summary;
  movieImage.src = medium;
  movie.append(title,movieImage,movieSummary);
  return movie;
}
function formatEpisodeName(name) {
  const maxLength = 25;
  return name.length < maxLength ? name : `${name.substring(0, maxLength - 3)}...`;
}
function formatEpisodeNumber(season, number) {
  return `\nS${season < 10 ? "0" : ""}${season}E${number < 10 ? "0" : ""}${number}`;
}

window.onload = setup;