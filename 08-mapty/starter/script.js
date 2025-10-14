'use strict';

//------------------------------------//
// 🧱 Workout Classes
//------------------------------------//
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
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

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

//------------------------------------//
// 🧭 App Class
//------------------------------------//
class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get user position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Event listeners
    document
      .querySelector('.form')
      .addEventListener('submit', this._newWorkout.bind(this));

    document
      .querySelector('.form__input--type')
      .addEventListener('change', this._toggleElevationField);

    document
      .querySelector('.workouts')
      .addEventListener('click', this._moveToPopup.bind(this));
  }

  //------------------------------------//
  // 🌍 Geolocation
  //------------------------------------//
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        this._loadDefaultMap.bind(this)
      );
  }

  //------------------------------------//
  // 🗺️ Load Map at User Location
  //------------------------------------//
  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(this.#map);

    // Map click
    this.#map.on('click', this._showForm.bind(this));

    // Render saved workouts
    this.#workouts.forEach(work => this._renderWorkoutMarker(work));
  }

  //------------------------------------//
  // 📍 Default Map (Manila Fallback)
  //------------------------------------//
  _loadDefaultMap() {
    const coords = [14.6042, 120.9822];
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  //------------------------------------//
  // 🧾 Show Input Form
  //------------------------------------//
  _showForm(mapE) {
    this.#mapEvent = mapE;
    const form = document.querySelector('.form');
    form.classList.remove('hidden');
    document.querySelector('.form__input--distance').focus();
  }

  //------------------------------------//
  // 🧩 Toggle Elevation Field
  //------------------------------------//
  _toggleElevationField() {
    document
      .querySelector('.form__input--elevation')
      .closest('.form__row')
      .classList.toggle('form__row--hidden');
    document
      .querySelector('.form__input--cadence')
      .closest('.form__row')
      .classList.toggle('form__row--hidden');
  }

  //------------------------------------//
  // 🏃 Add New Workout
  //------------------------------------//
  _newWorkout(e) {
    e.preventDefault();

    const type = document.querySelector('.form__input--type').value;
    const distance = +document.querySelector('.form__input--distance').value;
    const duration = +document.querySelector('.form__input--duration').value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Running
    if (type === 'running') {
      const cadence = +document.querySelector('.form__input--cadence').value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs must be positive numbers!');
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // Cycling
    if (type === 'cycling') {
      const elevation = +document.querySelector('.form__input--elevation').value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs must be positive numbers!');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add to workouts array
    this.#workouts.push(workout);

    // Render workout on map and list
    this._renderWorkout(workout);
    this._renderWorkoutMarker(workout);

    // Hide form and clear input fields
    this._hideForm();

    // Save to local storage
    this._setLocalStorage();
  }

  //------------------------------------//
  // 📍 Add Marker on Map
  //------------------------------------//
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  //------------------------------------//
  // 📝 Render Workout on Sidebar
  //------------------------------------//
  _renderWorkout(workout) {
    const form = document.querySelector('.form');

    // Use template literals (backticks)
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">KM</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">MIN</span>
        </div>
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">MIN/KM</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">SPM</span>
        </div>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">KM/H</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">M</span>
        </div>
      `;

    html += `</li>`;

    form.insertAdjacentHTML('afterend', html);
  }

  //------------------------------------//
  // 🎯 Move to Workout Marker
  //------------------------------------//
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      w => w.id === workoutEl.dataset.id
    );
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });
  }

  //------------------------------------//
  // 🧹 Hide Form and Reset
  //------------------------------------//
  _hideForm() {
    const form = document.querySelector('.form');
    form.classList.add('hidden');
    form.reset();
  }

  //------------------------------------//
  // 💾 Local Storage
  //------------------------------------//
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach(work => this._renderWorkout(work));
  }

  //------------------------------------//
  // 🗑 Reset Local Storage
  //------------------------------------//
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

//------------------------------------//
// 🚀 Initialize App
//------------------------------------//
const app = new App();
