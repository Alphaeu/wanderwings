// index.js

// Import required libraries (React, ReactDOM, etc.)
// This assumes you are using React for rendering components
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Main App component

// Import necessary styles
import './styles.css';

// Initialize Google Maps API if used for showing maps on the site
function initMap() {
  if (typeof google !== 'undefined') {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }
}

// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
  // Check if the root element exists and render the React app
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.render(<App />, rootElement);
  }

  // Initialize map if a map element exists
  const mapElement = document.getElementById('map');
  if (mapElement) {
    initMap();
  }

  // Handle dropdown interactions (for Bootstrap dropdowns)
  const dropdownButtons = document.querySelectorAll('.dropdown-toggle');
  dropdownButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      const dropdownMenu = this.nextElementSibling;
      dropdownMenu.classList.toggle('show');
    });
  });

  // Example of handling account-related actions
  const accountDropdown = document.getElementById('accountDropdown');
  if (accountDropdown) {
    accountDropdown.addEventListener('click', () => {
      // Handle user account dropdown logic here, if any
      console.log('Account dropdown clicked');
    });
  }

  // Example of handling the search flights functionality
  const searchFlightsLink = document.querySelector('a[href="/flights"]');
  if (searchFlightsLink) {
    searchFlightsLink.addEventListener('click', (e) => {
      e.preventDefault();
      // Implement search flight functionality here
      console.log('Search flights clicked');
    });
  }
});

// Axios example for making API calls
function fetchFlightData() {
  axios.get('/api/flights')
    .then(response => {
      console.log('Flight data:', response.data);
      // Update UI with flight data
    })
    .catch(error => {
      console.error('Error fetching flight data:', error);
    });
}

// Call fetchFlightData if needed
fetchFlightData();

// Example for initializing charts if using Chart.js
function initChart() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Initialize chart if chart element exists
const chartElement = document.getElementById('myChart');
if (chartElement) {
  initChart();
}

export default initMap;

