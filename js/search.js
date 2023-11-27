"use-strict";
import {
  dogBreeds,
  dogColors,
  catBreeds,
  catColors,
  animalSizes,
  animalAges,
} from "./dropdownArrays.js";

const apiURL = "http://localhost:5000/api/";
let searchShouldProceed = true;

// Fetch request
async function fetchData(url = apiURL) { // empty API URL if none is provided
  const response = await fetch(url, { method: "GET" });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
}

// Clear Results button reloads page
const refreshPage = () => {
  location.reload();
};
document.getElementById("clearButton").addEventListener("click", refreshPage);

// console log returned JSON object and call displayResults
function returnResults(data) {
  if (data) {
    const mainStartingContent = document.getElementById(
      "main-starting-content"
    );
    const resultsContainer = document.getElementById("results-container");

    // Change contents of main if any results are returned
    if (data.data.length > 0) {
      // Remove main-starting-content if it is still in DOM
      if (mainStartingContent) {
        mainStartingContent.remove();
      }

      displayResults(data);
    } else {
      // Message for no results returned
      resultsContainer.replaceChildren(); // Remove existing results
      const noResults = document.createElement("h2");
      noResults.textContent = "Sorry, your search returned no results.";
      resultsContainer.appendChild(noResults);
    }

    const numberReturned = document.getElementById("number-returned");
    if (numberReturned.hasChildNodes()) {
      numberReturned.replaceChildren();
    }

    const resultAmount = document.createElement("h3");
    resultAmount.textContent = `Your search returned ${data.data.length} results...`;
    numberReturned.appendChild(resultAmount);
  }
}

// Main function to display results
function displayResults(data) {
  const resultsContainer = document.getElementById("results-container");
  // If results-container has existing elements, replace them with emptiness
  if (resultsContainer.hasChildNodes()) {
    resultsContainer.replaceChildren();
  }

  // Iterate through results
  data.data.forEach((animal) => {
    const returnAnimalDiv = document.createElement("div");
    returnAnimalDiv.classList.add("return-animal-container");

    // May be in an array, may be the only value
    const photoDiv = document.createElement("div");
    photoDiv.classList.add("return-photo-div");
    const photo = document.createElement("img");
    // File structure of photos in database necessitates a couple of checks first
    if (animal.primary_photo_cropped) {
      const firstPhoto = animal.primary_photo_cropped;
      if (firstPhoto.small) {
        photo.src = firstPhoto.medium;
      } else {
        // No 'small' property in the photo, load default image
        const defaultImageURL = "../images/no-photo.webp";
        photo.src = defaultImageURL;
        photoDiv.style.backgroundColor = "#0f4c75";
      }
    } else {
      // No photos available, load a default image
      const defaultImageURL = "../images/no-photo.webp";
      photo.src = defaultImageURL;
      photoDiv.style.backgroundColor = "#0f4c75";
    }
    // Photo
    photo.alt = animal.name;
    photoDiv.appendChild(photo);
    returnAnimalDiv.appendChild(photoDiv);

    // Name + stats:
    const animalTextDiv = document.createElement("div");
    animalTextDiv.classList.add("all-animal-text");

    // Name
    const nameDiv = document.createElement("div");
    const nameText = document.createElement("p");
    nameText.classList.add("name-text");
    nameText.textContent = capitalizeWords(animal.name);
    nameDiv.appendChild(nameText);
    animalTextDiv.appendChild(nameDiv);

    // Other stats
    const animalStatsDiv = document.createElement("div");
    animalStatsDiv.classList.add("animal-stats");
    // Age
    const age = document.createElement("p");
    age.textContent = `Age: ${animal.age}`;
    animalStatsDiv.append(age);
    // Gender
    const gender = document.createElement("p");
    gender.textContent = `Gender: ${animal.gender}`;
    animalStatsDiv.appendChild(gender);
    // Breeds
    const breed = document.createElement("p");
    if (animal.breeds.mixed) { // Breed or Breeds used if multiple
      breed.textContent = createDescription(animal.breeds, "Breeds");
    } else {
      breed.textContent = createDescription(animal.breeds, "Breed");
    }
    animalStatsDiv.append(breed);
    // Colors
    const color = document.createElement("p");
    color.textContent = createDescription(animal.colors, "Colors");
    animalStatsDiv.append(color);

    animalTextDiv.appendChild(animalStatsDiv);
    returnAnimalDiv.appendChild(animalTextDiv);

    // Create and append their petfinder link opened in another window
    const linkToPFDiv = document.createElement("div");
    linkToPFDiv.classList.add("link-to-pf");
    linkToPFDiv.innerHTML = `<a href="${animal.url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
    returnAnimalDiv.appendChild(linkToPFDiv);

    // Create and append the close button
    const closeButtonDiv = document.createElement("div");
    closeButtonDiv.classList.add("close-button");
    closeButtonDiv.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
    closeButtonDiv.addEventListener("click", () => {
      returnAnimalDiv.remove(); // Remove the animal container on close button click
    });
    returnAnimalDiv.appendChild(closeButtonDiv);

    resultsContainer.appendChild(returnAnimalDiv);
  });
}

// Capitalize the first letter of each word in a string
function capitalizeWords(input) {
  return input.replace(/\b\w+/g, function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

// Check data structure and append items to list
function createDescription(obj, label, separator = ", ") {
  const descriptionList = [];

  if (obj.primary) {
    descriptionList.push(obj.primary);
  }
  if (obj.secondary) {
    descriptionList.push(obj.secondary);
  }
  if (obj.tertiary) {
    descriptionList.push(obj.tertiary);
  }

  if (descriptionList.length > 0) {
    return `${label}: ${descriptionList.join(separator)}`;
  } else {
    return `${label}: Other`;
  }
}

// Toggle control (doggle toggle)
let petType = "dog";

// Dropdown reference array
const dropdowns = [
  "breed-dropdown",
  "size-dropdown",
  "age-dropdown",
  "gender-dropdown",
  "color-dropdown",
];

// Dog breeds and colors
const dropdownData = {
  "breed-dropdown": dogBreeds,
  "size-dropdown": animalSizes,
  "age-dropdown": animalAges,
  "gender-dropdown": ["Any", "Male", "Female"],
  "color-dropdown": dogColors,
};

// Cat breeds and colors
const catDropdownData = {
  "breed-dropdown": catBreeds,
  "size-dropdown": animalSizes,
  "age-dropdown": animalAges,
  "gender-dropdown": ["Any", "Male", "Female"],
  "color-dropdown": catColors,
};

// Function to populate a dropdown based on its ID and data array
function populateDropdown(dropdownId, data) {
  const selectElement = document.getElementById(dropdownId);

  // Clear existing options
  selectElement.innerHTML = "";

  // Iterate through the array and create an option element for each item
  data.forEach((item) => {
    const optionElement = document.createElement("option");
    optionElement.value = item.toLowerCase(); // Set the value to lowercase for consistency
    optionElement.textContent = item;
    selectElement.appendChild(optionElement);
  });
}

// Function to set the current pet type (dog or cat)
function setPetType(type) {
  petType = type;
  localStorage.setItem('petType', type);  // Save to local storage
  // Adjust dropdowns based on current pet type
  adjustDropdowns();
}

// Function to get the pet type from local storage
function getPetType() {
  return localStorage.getItem('petType') || 'dog';  // Default to 'dog' if not found
}

// Function to adjust dropdowns based on the current pet type
function adjustDropdowns() {
  for (const dropdownId in dropdownData) {
    if (Object.hasOwnProperty.call(dropdownData, dropdownId)) {
      const data = petType === "dog" ? dropdownData[dropdownId] : catDropdownData[dropdownId];
      populateDropdown(dropdownId, data);
    }
  }
}

// On page load, set the petType from local storage
petType = getPetType();
adjustDropdowns();

// Set the checkbox state based on the petType
const petToggleCheckbox = document.getElementById('toggle-checkbox');
petToggleCheckbox.checked = petType === 'cat';

// Regular expression to match only alphanumeric characters
function isAlphanumeric(input) {  
  const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
  return alphanumericRegex.test(input);
}

// Gather input from dropdowns (or ignore empty) to form the API URL
function applySelectedCriteria() {


  //const emptySearchURL = `http://localhost:5000/api/search?type=${petType}&`; // Main branch (dev)
  const emptySearchURL = `https://naptap.replit.app/api/search?type=${petType}&`; // deploy-replit branch



  let allSearchCriteria = [];

  dropdowns.forEach((dropdownId) => {
    const dropdown = document.getElementById(dropdownId);
    const selectedValue = dropdown.value;

    if (selectedValue.toLowerCase() !== "any" && selectedValue !== "select") {
      const criteria = `${dropdownId.replace(
        "-dropdown",
        ""
      )}=${selectedValue}`;
      allSearchCriteria.push(criteria);
    }
  });

  const searchField = document.getElementById("search-input").value.trim();
  if (searchField) {
    if (isAlphanumeric(searchField)) {
      // Only set searchShouldProceed to true if the search field is not empty and is alphanumeric
      searchShouldProceed = true;
      allSearchCriteria.push(`name=${searchField}`);
    } else {
      // Display a friendly modal for invalid input
      showModal("Invalid input. Please enter a valid search query.");
      searchShouldProceed = false;
    }
  }
  const joinedSearchURL = emptySearchURL + allSearchCriteria.join("&");

  return joinedSearchURL;
}

// Scroll to top buttion functionality
let scrollToTopButton = document.getElementById("scroll-to-top-button");

function scrollFunction() {
  if (
    document.body.scrollTop > 250 ||
    document.documentElement.scrollTop > 250
  ) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

// Scroll to top on click
function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Expand and Collapse button
const collapsibleButtons =
  document.getElementsByClassName("collapsible-button");

for (let i = 0; i < collapsibleButtons.length; i++) {
  collapsibleButtons[i].addEventListener("click", function () {
    this.classList.toggle("active");

    // Toggle the icon
    const iconElement = this.querySelector("i");

    iconElement.classList.toggle("fa-angles-down");
    iconElement.classList.toggle("fa-angles-up");

    let content = this.nextElementSibling;
    if (content.style.display === "flex") {
      content.style.display = "none";
    } else {
      content.style.display = "flex";
    }
  });
}

// Invalid input modal popup for Search by Name
function showModal(message) {
  const modal = document.getElementById('myModal');
  const modalMessage = document.getElementById('modal-message');

  modalMessage.textContent = message;
  modal.style.display = 'block';

  // Close the modal if the user clicks anywhere outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  // Close the modal if the user clicks the close button
  const closeButton = document.getElementsByClassName('close')[0];
  closeButton.onclick = function () {
    modal.style.display = 'none';
  };
}

// Search button event listeners
const searchButton = document.getElementById("searchButton");
// For clicks
searchButton.addEventListener("click", async () => {
  // Overlay for loading
  const loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.style.display = "flex"; // Display overlay becomes visible at the start of the fetch

  // Set to true by default at button click
  searchShouldProceed = true;
  
   // Add an artificial loading delay
   setTimeout(async () => {
    try {
      let joinedSearchURL = applySelectedCriteria();

      if (!searchShouldProceed) {
        loadingOverlay.style.display = "none"; // Hide loading overlay if the search should not proceed
        return; // Stop the search
      }

      const data = await fetchData(joinedSearchURL);
      returnResults(data);
    } catch (error) {
      console.error(error);
    }

    loadingOverlay.style.display = "none"; // Hide loading overlay after resolution
  }, 750); // Adjust the delay time in miliseconds
});
// For pressing Enter
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keypress", function (event) {
  // If the keypress is enter
  if (event.key === "Enter") {
    // Cancel the default action, if needed - IDK
    event.preventDefault();
    // Trigger button element with a click
    searchButton.click();
  }
});

// Scroll to top listener
scrollToTopButton.addEventListener("click", topFunction);

// When the user scrolls down 250px show the button
window.onscroll = function () {
  scrollFunction();
};

// Doggle toggle listener
const toggleCheckbox = document.querySelector('.switch input[type="checkbox"]');

toggleCheckbox.addEventListener('change', function() {
  // Check if the checkbox is checked
  if (this.checked) {
    // Checkbox is checked, set petType to 'cat'
    setPetType('cat');
  } else {
    // Checkbox is unchecked, set petType to 'dog'
    setPetType('dog');
  }
});
