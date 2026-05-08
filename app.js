import { getSecretKey } from "./utils.js";

const API_KEY = await getSecretKey();
const params = {
    date: ''
};

const fetchImageOfTheDay = async () => {
    const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${params.date}`

    try {
        const response = await fetch(URL);

        if (!response.ok) {
            document.body.innerHTML = `Päring ebaõnnestus!`;
            return;
        }

        return await response.json();
    } catch (exception) {
        if (exception instanceof SyntaxError) {
            console.log(exception);
        }
    }
}

const renderData = (data) => {
    const nasaImageSection = document.querySelector("#nasa-image-section");

    if (data && data.media_type === "video") {
        nasaImageSection.innerHTML = `
            <video width="600px" controls autoplay>
                <source src="${data.url}" />
            </video>
            <figcaption>${data.copyright ?? ""}</figcaption>
            <h1>${data.title}</h1>
            <p>${data.explanation}</p>
        `
    } else if (data && data.media_type === "image") {
        nasaImageSection.innerHTML = `
            <img width="600px" src="${data.url}" />
            <figcaption>${data.copyright ?? ""}</figcaption>
            <h1>${data.title}</h1> 
            <p>${data.explanation}</p>
        `
    } else {
        nasaImageSection.innerHTML = `
            <h3>Tundmatu andmetüüp</h3>
        `
    }
}

const data = await fetchImageOfTheDay();
renderData(data);

const dateOfImageForm = document.querySelector("#dateOfImageForm");
dateOfImageForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    params.date = form.get("date");
    renderData(await fetchImageOfTheDay());
});