'use strict';

const months = ['January', 'February', 'March',
  'April','May','June','July','August','September','October','November','December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//get position
let map;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      console.log(`https://www.google.com/maps/@${lat},${long}z?entry=ttu`);
      const myCoords = [lat, long];
      map = L.map('map').setView(myCoords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
``    
//handling clicks on map
      map.on('click', function (mapEvent) {
        //show form
        form.classList.remove("hidden");
        inputDistance.focus();
        //show marks
        console.log(mapEvent.latlng);
        let latitude = mapEvent.latlng.lat;
        let longitude = mapEvent.latlng.lng;
        console.log(latitude, longitude);

        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent('Workout')
          .openPopup();
      });
    },
    function () {
      alert('Could not get your position!');
    }
  );
}

//
form.addEventListener("submit", (e) => {
//display the marker
})
