
export async function getData() {
    const showId = 169;
    const API_URL = `https://api.tvmaze.com/shows/${showId}/episodes`;
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}