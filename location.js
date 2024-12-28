// Function to get the current position
function getPosition(options) {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};


document.addEventListener("DOMContentLoaded", () => {
    if (navigator.geolocation) {
        getPosition()
            .then((position) => {
                setBackgroundImage(dayImages);
                getWeatherByCoordinates(position.coords.latitude, position.coords.longitude)
                    .then(() => {
                        loadingScreen.classList.remove("flex");
                        loadingScreen.classList.add("none");
                        weatherApp.classList.remove("none");
                        weatherApp.classList.add("flex");
                    });
            })
            .catch((err) => {
                setBackgroundImage(dayImages);
                alert("You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating real-time weather.");
                checkWeather("Alwar", true);
                loadingScreen.classList.add("none");
                weatherApp.classList.add("flex");


            });
    } else {
        alert("Geolocation not available");
    }
});