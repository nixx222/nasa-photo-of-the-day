// NASA API URL generator
function getNasaPhotoByDate(date) {
    const apiKey = 'DEMO_KEY'; // Replace with your NASA API key
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
    
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Error fetching data:', error));
}

// Generate dates for current day and three previous days
function getPreviousDates(daysBack) {
    const dates = [];
    for (let i = 0; i <= daysBack; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
}

// Fetch photos for multiple dates
function getNasaPhotos(daysBack) {
    const dates = getPreviousDates(daysBack);
    const photos = [];

    dates.forEach(date => {
        getNasaPhotoByDate(date)
            .then(photoData => {
                if (photoData) {
                    photos.push(photoData);
                    displayPhotos(photos); // Update the photo display as they are fetched
                }
            })
            .catch(error => console.error('Error fetching photo:', error));
    });
}

// Function to display photos in the container
function displayPhotos(photos) {
    const container = document.getElementById('nasa-photos-container');
    container.innerHTML = ''; // Clear the container first

    photos.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.classList.add('photo');
        photoElement.innerHTML = `
            <h3>${photo.title}</h3>
            <img src="${photo.url}" alt="${photo.title}" width="300">
            <p>${photo.explanation}</p>
        `;
        container.appendChild(photoElement);
    });
}

// Toggle button to show/hide photos
const toggleButton = document.getElementById('toggle-button');
const resetButton = document.getElementById('reset-button');
const title = document.getElementById('title');

toggleButton.addEventListener('click', function() {
    document.getElementById('nasa-photos-container').style.display = 'block';
    toggleButton.style.display = 'none'; // Hide the initial button
    resetButton.style.display = 'inline-block'; // Show the reset button
    title.classList.add('hide-border'); // Hide the border on title
    getNasaPhotos(3); // Get photos for today and the past three days
});

// Reset button to go back to the initial state
resetButton.addEventListener('click', function() {
    document.getElementById('nasa-photos-container').style.display = 'none';
    toggleButton.style.display = 'inline-block'; // Show the initial button
    resetButton.style.display = 'none'; // Hide the reset button
    title.classList.remove('hide-border'); // Show the border again
});
