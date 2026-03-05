const cache = {
  shows: null,
  episodes: {}
};

export async function getShows() {
    if (cache.shows) return cache.shows;
    const res = await fetch("https://api.tvmaze.com/shows");
    if (!res.ok) {
        console.error("Failed to fetch shows");
        return null;
    }
    const data = await res.json();
    cache.shows = data;
    return data;
}

export async function getEpisodes(showId) {
    if (cache.episodes[showId]) {
        return cache.episodes[showId];
    }
    const res = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
    if (!res.ok) {
    console.error("Failed to fetch episodes");
    return null;
    }
    const data = await res.json();
    cache.episodes[showId] = data;
    return data;
}
    