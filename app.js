const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const params = {
    date: '',
};

const fetchImageOfTheDay = async () => {
    const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${params.date}`;

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
};

const renderData = (data) => {
    const nasaImageSection = document.querySelector('#nasa-image-section');

    if (data && data.media_type === 'video') {
        nasaImageSection.innerHTML = `
            <video controls autoplay class="min-w-full aspect-video">
                <source src="${data.url}" />
            </video>
            <figcaption class="text-xs text-gray-600 mb-4">${data.copyright ?? ''}</figcaption>
           <h4 class="text-xl mb-2">${data.title}</h4> 
            <p class="text-sm text-gray-100 leading-normal text-white/50">${data.explanation}</p>
        `;
    } else if (data && data.media_type === 'image') {
        nasaImageSection.innerHTML = `
            <img class="min-w-full" src="${data.url}" />
            <figcaption class="text-xs text-gray-600 mb-4">${data.copyright ?? ''}</figcaption>
            <h4 class="text-xl mb-2">${data.title}</h4> 
            <p class="text-sm text-gray-100 leading-normal text-white/50">${data.explanation}</p>
        `;
    } else {
        nasaImageSection.innerHTML = `
            <h3>Tundmatu andmetüüp</h3>
        `;
    }
};

const data = await fetchImageOfTheDay();
renderData(data);

const dateOfImageForm = document.querySelector('#dateOfImageForm');
dateOfImageForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    params.date = form.get('date');
    renderData(await fetchImageOfTheDay());
});
