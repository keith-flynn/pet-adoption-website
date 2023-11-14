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
  let joinedSearchURL = applySelectedCriteria();

  try {
    const data = await fetchData(joinedSearchURL);
    returnResults(data);
  } catch (error) {
    console.error(error);
  }
});

// console log and call displayResults
function returnResults(data) {
  if (data) {
    // DEBUG
    console.log("API Response:", data);

    const resultsContainer = document.getElementById("results-container")

    // Remove contents of main to display results after search
    const startingMainContent = document.querySelector(
      "#main-starting-content"
    );
    
    // DEBUG
    console.log(data.data.length);

    if (data.data.length > 0) {
      startingMainContent.remove();
      displayResults(data);
    } else {      
      const noResults = document.createElement("h2");
      noResults.textContent = "Sorry, your search returned no results."
      resultsContainer.appendChild(noResults);
    }

    const numberReturned = document.getElementById("number-returned");    
    const resultAmount = document.createElement("h3");
    resultAmount.textContent = `Your search returned ${data.data.length} results...`;

    numberReturned.appendChild(resultAmount);
    
    console.log(`Your search returned ${data.data.length} results...`);
  }
  
}

// Main function to display results
function displayResults(data) {
  const resultsContainer = document.getElementById("results-container");
  // if results container has elements, replace them. !!!
  if (resultsContainer.hasChildNodes()) {
    resultsContainer.replaceChildren();
  }

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

function populateBreeds() {
  const dogBreeds = [
    "Akbash",
    "Akita",
    "Alaskan Malamute",
    "American Bulldog",
    "American Bully",
    "American Eskimo Dog",
    "American Foxhound",
    "American Staffordshire Terrier",
    "Anatolian Shepherd",
    "Aussiedoodle",
    "Australian Cattle Dog",
    "Blue Heeler",
    "Australian Kelpie",
    "Australian Shepherd",
    "Basenji",
    "Basset Hound",
    "Beagle",
    "Beauceron",
    "Bedlington Terrier",
    "Belgian Shepherd / Malinois",
    "Bernedoodle",
    "Bernese Mountain Dog",
    "Bichon Frise",
    "Black and Tan Coonhound",
    "Black Labrador Retriever",
    "Black Mouth Cur",
    "Bloodhound",
    "Bluetick Coonhound",
    "Border Collie",
    "Borzoi",
    "Boston Terrier",
    "Bouvier des Flandres",
    "Boxer",
    "Boykin Spaniel",
    "Briard",
    "Brittany Spaniel",
    "Bull Terrier",
    "Bullmastiff",
    "Cairn Terrier",
    "Cane Corso",
    "Cardigan Welsh Corgi",
    "Carolina Dog",
    "Catahoula Leopard Dog",
    "Cattle Dog",
    "Cavalier King Charles Spaniel",
    "Cavapoo",
    "Chihuahua",
    "Chinese Crested Dog",
    "Chiweenie",
    "Chocolate Labrador Retriever",
    "Chow Chow",
    "Cockapoo",
    "Cocker Spaniel",
    "Collie",
    "Coonhound",
    "Corgi",
    "Dachshund",
    "Dalmatian",
    "Doberman Pinscher",
    "Dogo Argentino",
    "Dutch Shepherd",
    "English Bulldog",
    "English Coonhound",
    "English Pointer",
    "English Setter",
    "English Shepherd",
    "English Springer Spaniel",
    "Feist",
    "Flat-Coated Retriever",
    "Fox Terrier",
    "Foxhound",
    "French Bulldog",
    "German Pinscher",
    "German Shepherd Dog",
    "German Shorthaired Pointer",
    "German WireHaired Pointer",
    "Golden Retriever",
    "Goldendoodle",
    "Great Dane",
    "Great Pyrenees",
    "Greyhound",
    "Havanese",
    "Hound",
    "Husky",
    "Irish Setter",
    "Italian Greyhound",
    "Jack Russell Terrier",
    "Japanese Chin",
    "Labradoodle",
    "Labrador Retriever",    
    "Maltese",
    "Manchester Terrier",
    "Mastiff",
    "Miniature Dachshund",
    "Miniature Pinscher",
    "Miniature Poodle",
    "Miniature Schnauzer",
    "Mixed Breed",
    "Mountain Cur",
    "Mountain Dog",
    "Newfoundland Dog",
    "Norfolk Terrier",
    "Norweigan Elkhound",
    "Old English Sheepdog",
    "Papillon",
    "Patterdale Terrier",
    "Fell Terrier",
    "Pekingese",
    "Peruvian Inca Orchid",
    "Pharaoh Hound",
    "Pit Bull Terrier",
    "Plott Hound",
    "Pointer",
    "Pomeranian",
    "Pomsky",
    "Poodle",
    "Pug",
    "Puggle",
    "Rat Terrier",
    "Redbone Coonhound",
    "Retriever",
    "Rhodesian Ridgeback",
    "Rottweiler",
    "Rough Collie",
    "Saint Bernard",
    "Samoyed",
    "Schipperke",
    "Schnauzer",
    "Setter",
    "Shar-Pei",
    "Shepherd",
    "Shetland Sheepdog",
    "Shiba Inu",
    "Shih Tzu",
    "Siberian Husky",
    "Silky Terrier",
    "Smooth Collie",
    "Spaniel",
    "Staffordshire Bull Terrier",
    "Standard Schnauzer",
    "Terrier",
    "Treeing Walker Coonhound",
    "Weimaraner",
    "Westie",
    "Whippet",
    "White German Shepherd",
    "Wirehaired Terrier",
    "Yellow Labrador Retriever",
    "Yorkshire Terrier",
  ];

  const selectElement = document.getElementById("breed-dropdown");

  // Iterate through the array and create an option element for each breed
  dogBreeds.forEach((breed) => {
    const optionElement = document.createElement("option");
    optionElement.value = breed.toLowerCase(); // Set the value to lowercase for consistency
    optionElement.textContent = breed;
    selectElement.appendChild(optionElement);
  });
};

populateBreeds();

function applySelectedCriteria() {
  const emptySearchURL = "http://localhost:5000/api/search?";
  let allSearchCriteria = []

  const breedDropdown = document.getElementById("breed-dropdown");
  const breedSelected = (breedDropdown.value === "select") ? "" : "breed=" + `${breedDropdown.value}`;
  allSearchCriteria.push(breedSelected);

  const sizeDropdown = document.getElementById("size-dropdown");
  const sizeSelected = (sizeDropdown.value === "select") ? "" : "size=" + `${sizeDropdown.value}`;
  if (sizeSelected) {
  allSearchCriteria.push(sizeSelected);
  }

  const ageDropdown = document.getElementById("age-dropdown");
  const ageSelected = (ageDropdown.value === "select") ? "" : "age=" + `${ageDropdown.value}`;
  if (ageSelected) {
  allSearchCriteria.push(ageSelected);
  }

  const genderDropdown = document.getElementById("gender-dropdown");
  const genderSelected = (genderDropdown.value === "select") ? "" : "gender=" + `${genderDropdown.value}`;
  if (genderSelected) {
    allSearchCriteria.push(genderSelected);
  }

  const colorDropdown = document.getElementById("color-dropdown");
  const colorSelected = (colorDropdown.value === "select") ? "" : "color=" + `${colorDropdown.value}`;
  if (colorSelected) {
    allSearchCriteria.push(colorSelected);
  }

  const searchField = document.getElementById("search-input").value;
  if (searchField) {
    allSearchCriteria.push(`name=${searchField}`);
  }

  let joinedSearchURL = emptySearchURL + allSearchCriteria.join("&");  

  return joinedSearchURL;

};
