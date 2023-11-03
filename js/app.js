
"use-strict";

const apiURL = "http://localhost:5000/api/";


async function fetchData() {
  const response = await fetch(apiURL, { method: "GET"});
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
}

function displayResults(data) {
  if (data) {
    console.log('API Response:', data);

    const resultsContainer = document.getElementById('results-container');

    data.data.forEach((animal) => {
      const itemDiv = document.createElement('div');

      const photo = document.createElement('img');
      photo.src = animal.primary_photo_cropped.small;
      photo.alt = animal.name;
      itemDiv.appendChild(photo);

      const name = document.createElement('p');
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
