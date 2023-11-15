"use-strict";
import { dogBreeds, catBreeds } from  "./dropdownArrays.js";

const apiURL = "http://localhost:5000/api/";

// Fetch request
async function fetchData(url = apiURL) {
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
}
document.getElementById("clearButton").addEventListener("click", refreshPage);

// Search button event listeners
const searchButton = document.getElementById("searchButton");
// For clicks
searchButton.addEventListener("click", async () => {
  let joinedSearchURL = applySelectedCriteria();

  try {
    const data = await fetchData(joinedSearchURL);
    returnResults(data);
  } catch (error) {
    console.error(error);
  }
});
// For pressing Enter
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keypress", function(event) {
  // If the keypress is enter
  if (event.key === "Enter") {
    // Cancel the default action, if needed - IDK
    event.preventDefault();
    // Trigger button element with a click
    searchButton.click();
  }
}); 

// console log returned JSON object and call displayResults
function returnResults(data) {
  if (data) {
    // DEBUG
    console.log("API Response:", data);

    const mainStartingContent = document.getElementById("main-starting-content");
    const resultsContainer = document.getElementById("results-container");

    // DEBUG
    console.log(data.data.length);

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

    // DEBUG
    console.log(`Your search returned ${data.data.length} results...`);
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
    if (animal.photos && animal.photos.length > 0) {
      const firstPhoto = animal.photos[0];
      if (firstPhoto.small) {
        photo.src = firstPhoto.medium;
      } else {
        // No 'small' property in the photo, load default image
        const defaultImageURL = "../images/small-circle-transparent.png";
        photo.src = defaultImageURL;
      }
    } else {
      // No photos available, load a default image
      const defaultImageURL = "../images/small-circle-transparent.png";
      photo.src = defaultImageURL;
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
    if (animal.breeds.mixed) {
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

// Generate select elements for breeds-dropdown
function populateBreeds(animalType) {
  
  const selectElement = document.getElementById("breed-dropdown");

  // Iterate through the array and create an option element for each breed
  animalType.forEach((breed) => {
    const optionElement = document.createElement("option");
    optionElement.value = breed.toLowerCase(); // Set the value to lowercase for consistency
    optionElement.textContent = breed;
    selectElement.appendChild(optionElement);
  });
}

// DEBUG - IIFE or separate js file
populateBreeds(dogBreeds);

// DEBUG - iterate this
function applySelectedCriteria() {
  const emptySearchURL = "http://localhost:5000/api/search?";
  let allSearchCriteria = [];

  const breedDropdown = document.getElementById("breed-dropdown");
  const breedSelected =
    breedDropdown.value === "select" ? "" : "breed=" + `${breedDropdown.value}`;
  allSearchCriteria.push(breedSelected);

  const sizeDropdown = document.getElementById("size-dropdown");
  const sizeSelected =
    sizeDropdown.value === "select" ? "" : "size=" + `${sizeDropdown.value}`;
  if (sizeSelected) {
    allSearchCriteria.push(sizeSelected);
  }

  const ageDropdown = document.getElementById("age-dropdown");
  const ageSelected =
    ageDropdown.value === "select" ? "" : "age=" + `${ageDropdown.value}`;
  if (ageSelected) {
    allSearchCriteria.push(ageSelected);
  }

  const genderDropdown = document.getElementById("gender-dropdown");
  const genderSelected =
    genderDropdown.value === "select"
      ? ""
      : "gender=" + `${genderDropdown.value}`;
  if (genderSelected) {
    allSearchCriteria.push(genderSelected);
  }

  const colorDropdown = document.getElementById("color-dropdown");
  const colorSelected =
    colorDropdown.value === "select" ? "" : "color=" + `${colorDropdown.value}`;
  if (colorSelected) {
    allSearchCriteria.push(colorSelected);
  }

  const searchField = document.getElementById("search-input").value;
  if (searchField) {
    allSearchCriteria.push(`name=${searchField}`);
  }

  let joinedSearchURL = emptySearchURL + allSearchCriteria.join("&");

  return joinedSearchURL;
}

// Scroll to top buttion functionality
let scrollToTopButton = document.getElementById("scroll-to-top-button");

scrollToTopButton.addEventListener("click", topFunction);

// When the user scrolls down 250px show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

// Scroll to top on click
function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

