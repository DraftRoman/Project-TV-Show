const cache = {
  shows: null,
  episodes: {}
};

export async function getShows() {
    if (cache.shows) return cache.shows;
    
    const res = await fetch("https://api.tvmaze.com/shows");
    if (res.ok) {
        const data = await res.json();
        cache.shows = data;
        return data;
    }
    else {
        alert("API data couldn't be rendered Error");
        
        return null;
    }
}

export async function getEpisodes(showId) {
    const render = document.querySelector(".rendering");
    render.innerText = "🧪 Cooking up the episode list…";
    const loading = document.getElementById("loading");
    loading.style.display = "none";
    if (!cache.episodes[showId]) {
        errorBox.style.display = "grid";
        errorBox.textContent = "Oops — couldn't load the episodes. Please refresh.";
    return;
  }
    render.classList.remove("hidden");
    if (cache.episodes[showId]) {
        render.classList.add("hidden");
        return cache.episodes[showId];
    }
    const res = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
    if (res.ok) {
        const data = await res.json();
        cache.episodes[showId] = data;
        render.classList.add("hidden");
        return data;
    } else {
        alert("API data couldn't be rendered Error");
        render.innerText = `API data couldn't be rendered Error ${res.status}`;
        return null;
  }
}
    