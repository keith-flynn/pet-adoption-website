"use-strict";

const apiURL = "http://localhost:5000/api/";

// Where the magic happens
async function fetchData(url = apiURL) {
  const response = await fetch(url, { method: "GET" });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
}

document.getElementById("fetchButton").addEventListener("click", async () => {
  try {
    const data = await fetchData();
    returnResults(data);
  } catch (error) {
    console.error(error);
  }
});

document.getElementById("searchButton").addEventListener("click", async () => {
  const searchField = document.getElementById("search-input").value;
  const searchURL = `http://localhost:5000/api/search?name=${searchField}`;
  
  try {
    const data = await fetchData(searchURL);
    returnResults(data);
  } catch (error) {
    console.error(error);
  }
});

// console log and call displayResults
function returnResults(data) {
  if (data) {
    console.log("API Response:", data);

    // Remove contents of main to display results after search
    const startingMainContent = document.querySelector("#main-starting-content");
    if (startingMainContent) {
      startingMainContent.remove();
    }

    displayResults(data);
  }
}

// Main function to display results
function displayResults(data) {
  const resultsContainer = document.getElementById("results-container");

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
    animalTextDiv.classList.add("all-animal-text")

    // Name
    const nameDiv = document.createElement("div");
    const nameText = document.createElement("p");
    nameText.classList.add("name-text")
    nameText.textContent = capitalizeWords(animal.name);
    nameDiv.appendChild(nameText);
    animalTextDiv.appendChild(nameDiv);
    
    // Other stats
    const animalStatsDiv = document.createElement("div");
    animalStatsDiv.classList.add("animal-stats")
    // Age
    const age = document.createElement("p");
    age.textContent = `Age: ${animal.age}`;
    animalStatsDiv.append(age);
    // Sex
    const sex = document.createElement("p");
    sex.textContent = `Sex: ${animal.gender}`;
    animalStatsDiv.appendChild(sex);
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
