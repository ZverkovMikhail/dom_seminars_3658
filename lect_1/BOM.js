"use strict";

console.log('navigator.userAgent = ', navigator.userAgent);
console.log('navigator.cookieEnabled = ', navigator.cookieEnabled);
console.log('navigator.doNotTrack = ', navigator.doNotTrack);
console.log('navigator.geolocation = ', navigator.geolocation);
navigator.geolocation.getCurrentPosition(
    position => {
        getCurrentCity(position.coords.latitude, position.coords.longitude)
            .then((info) => {

                appendToContainer(
                    `<div>Ближайший город ${info.cityName}, ${info.country}</div>
                           <div> расстояние до центра: ${info.distance} км.</div>`
                );
                console.log();
            }).catch((e) => {
             appendToContainer(`ERROR: ${e}`);
        });
    }, (positionError) => {
        appendToContainer(positionError.message);
    }
);

function appendToContainer(inner){
     const container = document.querySelector('.container');
                container.innerHTML += inner;
}
function getCurrentCity(lat, long) {
    return new Promise((resolve, reject) => {
        let minDistance = Infinity;
        let city = '';
        let country = '';
        for (const location of locations) {
            let dist = Math.abs(getDistanceFromLatLonInKm(lat, long, location.lat, location.lng));
            if (dist < minDistance) {
                minDistance = dist;
                city = location.city;
                country = location.country;
            }
        }
        resolve({country: country, cityName: city, distance: minDistance.toFixed(1)});
    });
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

const distanceMOWBKK = getDistanceFromLatLonInKm(
    55.45, 37.36, 13.45, 100.30
)
