export async function getdataShow(){
    const resp = await fetch("https://api.tvmaze.com/shows?page=0");
    const data = await resp.json();
    const showSelect = document.querySelector("#show-selector");
        data.map(element => {
            const {name,id}=element;
            const newshowOption = document.createElement("option");
            newshowOption.textContent = name;
            newshowOption.id = id;
            showSelect.append(newshowOption);
        });
        return data;
}

export async function getData(showID) {
    const API_URL = `https://api.tvmaze.com/shows/${showID}/episodes`;
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
