'use strict';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    constructor () {

    }
    _getPosition () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              let lat = position.coords.latitude;
              let long = position.coords.longitude;
              console.log(
                `https://www.google.com/maps/@${lat},${long}z?entry=ttu`
              );
              const myCoords = [lat, long];
              map = L.map('map').setView(myCoords, 13);

              L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              }).addTo(map);

              // handling clicks on map
              map.on('click', function (mapE) {
                // show form
                mapEvent = mapE;
                form.classList.remove('hidden');
                inputDistance.focus();
              });
            },
            function () {
              alert('Could not get your position!');
            }
          );
        }
    }
    _loadMap() {}
    _showForm() {}
    _toggleElevationField() {}
    _newWorkout() {}
}


let map; let mapEvent;


// form submit event
form.addEventListener('submit', e => {
e.preventDefault();
//clear input fields
inputDistance.value=inputDuration.value=inputCadence.value=inputElevation.value="";
  // display the markers
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


inputType.addEventListener("change", function () {
    inputElevation.closest(".form-row").classList.toggle("form__row--hidden")
    inputCadence.closest('.form-row').classList.toggle('form__row--hidden');
})


const calculator = {
  value: 0,
  add: function (num) {
    this.value += num;
    console.log(this.value);
  },
};

const button = document.querySelector('.add-button');
button.addEventListener('click', calculator.add);
