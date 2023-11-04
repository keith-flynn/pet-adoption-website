"use-strict";

const apiURL = "http://localhost:5000/api/";
//const apiURL = "http://localhost:5000/api/search?name=boris";

async function fetchData() {
  const response = await fetch(apiURL, { method: "GET" });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
}

function displayResults(data) {
  if (data) {
    console.log("API Response:", data);

    const resultsContainer = document.getElementById("results-container");

    data.data.forEach((animal) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("return-animal-container")

      const photo = document.createElement("img");
      if (animal.photos && animal.photos.length > 0) {
        const firstPhoto = animal.photos[0];
        if (firstPhoto.small) {
          photo.src = firstPhoto.small;
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
      photo.alt = animal.name;
      itemDiv.appendChild(photo);

      const name = document.createElement("p");
      name.textContent = animal.name;
      itemDiv.appendChild(name);
      resultsContainer.appendChild(itemDiv);
    });
  }
}

document.getElementById("fetchButton").addEventListener("click", async () => {
  try {
    const data = await fetchData();
    displayResults(data);
  } catch (error) {
    console.error(error);
  }
});
