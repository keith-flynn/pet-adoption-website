
"use-strict";

const apiURL = "https://api.petfinder.com/v2/animals?type=dog";
const headersInfo = {
  Authorization: `Bearer ${ACCESS_TOKEN}`
};

async function fetchData() {
  const response = await fetch(apiURL, { method: "GET", headers: headersInfo });
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

      data.animals.forEach((animal) => {
          const itemDiv = document.createElement("div");

          const photo = document.createElement("img");
          photo.src = animal.photos.small;
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
