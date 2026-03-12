import { getEpisodes, getShows } from "./app.js";

let allEpisodes = [];
const rootElem = document.getElementById("root");


async function setup() {
  const loading = document.getElementById("loading");
  loading.style.display = "block";
  const shows = await getShows();
  shows.sort((a, b) => a.name.localeCompare(b.name));
  loading.style.display = "none";
  displayShows(shows);
  showSelector(shows);
  setupSearch(shows, "shows");
  setupReturnButton(shows);
}

function setupReturnButton(shows) {
  const returnButton = document.getElementById("return-button");
  returnButton.addEventListener("click", () => handleReturnClick(shows));
}

function handleReturnClick(shows) {
  const freshShows = shows;
  displayShows(freshShows);
  showShowsSelector();
  returnButtonHidden()
  scrollUp()
  setupSearch(shows,"shows");
  showEpisodeSelectorHidden();
  document.getElementById("result-count").innerText = `Displaying ${freshShows.length} shows`;
}

function scrollUp() {
  const root = document.querySelector("body");
  root.scrollIntoView();

}
function showSelector(shows) {
  const showSelect = document.querySelector("#show-selector");
  shows.forEach(show => {
    const opt = document.createElement("option");
    opt.value = show.id;
    opt.textContent = show.name;
    showSelect.append(opt);
  });
  showSelect.addEventListener("change", async (event) => {
    const showId = event.target.value;
    const searchInput = document.getElementById("search-input");
    searchInput.value = ""; 
    if (showId === "all-shows") {
      displayShows(shows);
      setupSearch(shows,"shows");
      return;
    }
    hideShowSelector();
    showReturnButton();
    allEpisodes = await getEpisodes(showId);
    showEpisodeSelector();
    makePageForEpisodes(allEpisodes);
    setupSearch(allEpisodes,"episodes")
    episodeSelector(allEpisodes);
  })
  }

function makePageForEpisodes(episodeList) {
  cleanDisplay();

  const component = displayMovies(episodeList);
  component.forEach(element => {
    rootElem.append(element);
  });
}

function setupSearch(data,type) {
  const searchInput = document.getElementById("search-input");
  const resultCount = document.getElementById("result-count");
  searchInput.value = ""; 
  
  searchInput.addEventListener('keyup', (event) => {
    
    const searchText = event.target.value.toLowerCase();
    let filtered;
    if (type === "shows") {
      filtered = data.filter(show => {
        const name = show.name.toLowerCase();
        const summary = (show.summary || "").toLowerCase();
        const genres = show.genres.join(" ").toLowerCase();
        return (
          name.includes(searchText) ||
          summary.includes(searchText) ||
          genres.includes(searchText)
        );
      });
      displayShows(filtered);

      resultCount.innerText = `Displaying ${filtered.length} / ${data.length} shows`;

    } else {
      filtered = filterEpisodes(data, searchText);
      makePageForEpisodes(filtered);
      resultCount.innerText = `Displaying ${filtered.length} / ${data.length} episodes`;
    }
  })
}
function filterEpisodes(allEpisodes, searchText) {
  return allEpisodes.filter(episode => {
    const { name, summary } = episode;
    const episodeName = name.toLowerCase();
    const episodeSummary = (summary || "").toLowerCase();
    const searchTextLower = searchText.toLowerCase()
    return episodeName.includes(searchTextLower) || episodeSummary.includes(searchTextLower);
  })
}
function episodeSelector(allEpisodes) {
  const select = document.getElementById("episode-selector");
  select.innerHTML = ""
  const everyEpisode = document.createElement("option");
  everyEpisode.value = "all-episodes"
  everyEpisode.textContent = "All episodes"
  select.append(everyEpisode);

  allEpisodes.forEach(ep => {
    const opt = document.createElement("option");
    opt.value = ep.id;
    opt.textContent =
      `${ep.name} - S${ep.season.toString().padStart(2, "0")}E${ep.number.toString().padStart(2, "0")}`;

    select.append(opt);
  });

  select.addEventListener("change", (event) => {
    if (event.target.value == "all-episodes") {
      makePageForEpisodes(allEpisodes);
      return;
    }
    const episode = allEpisodes.find(ep => ep.id == Number(event.target.value))
    if (!episode) return;
    makePageForEpisodes([episode]);
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
    const img = image ? (useOriginalImage ? image.original : image.medium) : null;
    return movieComponent(name, season, number, summary, img);
  });
}
function displayShows(shows) {
  cleanDisplay();
  shows.forEach(show => {
    renderShowCard(show);
  });
  const resultCount = document.getElementById("result-count");
  resultCount.innerText = `Displaying ${shows.length} shows`;
}
function renderShowCard(show) {
  const { id, name, image, summary, averageRuntime, genres, rating } = show;
  
  const showElement = document.createElement("article");
    showElement.addEventListener("click", async () => {
    const searchInput = document.getElementById("search-input");
      searchInput.value = "";
      scrollUp();
      hideShowSelector();
      showReturnButton();
      showEpisodeSelector();
      allEpisodes = await getEpisodes(id);
      makePageForEpisodes(allEpisodes);
      setupSearch(allEpisodes, "episodes");
      episodeSelector(allEpisodes);
    });

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('show-title');
  const title = document.createElement("h2");
  const ratingElement = document.createElement("p");
  titleDiv.append(title, ratingElement);

  
  title.innerText = name;
  ratingElement.innerText = `Rating: ${rating.average || "N/A"}`;

  const detailsElement = document.createElement("div");
  const genresElement = document.createElement("p");
  const runTimeElement = document.createElement("p");
  detailsElement.append(genresElement, runTimeElement);
  genresElement.innerText = `Genres: ${genres.join(", ")}`;
  runTimeElement.innerText = `Run Time: ${averageRuntime} minutes`;

  const showSummary = document.createElement("p");
  const showImage = document.createElement("img");
  showSummary.innerHTML = summary;
  showImage.src = image.medium;
  showImage.setAttribute("alt", name);
  showElement.append(titleDiv, showImage, showSummary, detailsElement);
  rootElem.append(showElement);
}

function hideShowSelector() {
  const showSelectorContainer = document.getElementById("show-selector-container");
  showSelectorContainer.style.display = "none";
}
function showReturnButton() {
  const btn = document.getElementById("return-button");
  btn.style.display = "block";
}
function showEpisodeSelector() {
  document.getElementById("episode-selector-container").style.display = "flex";
}
function showShowsSelector() {
  document.getElementById("show-selector-container").style.display = "block"
}
function showEpisodeSelectorHidden() {
  document.getElementById("episode-selector-container").style.display = "none";
}
function returnButtonHidden() {
  document.getElementById("return-button").style.display = "none";
}
  
function movieComponent(name,season,number,summary, img){
  const movie = document.createElement("article");
  const title = document.createElement("h2");
  const movieSummary = document.createElement("p");
  const movieImage = document.createElement("img");
  
  title.innerText = `${formatEpisodeName(name)} ${formatEpisodeNumber(season,number)}`;
  movieSummary.innerHTML = summary;
  movieImage.src = img;
  movieImage.setAttribute("alt", title.innerText);
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