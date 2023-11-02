
"use-strict";

const apiURL = "https://api.petfinder.com/v2/animals?type=dog&page=1&limit=100";
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
     // Save the JSON data to a file
     const jsonData = JSON.stringify(data);
     const blob = new Blob([jsonData], { type: 'application/json' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = 'petfinder_results.json'; // Specify filename
     a.textContent = 'Download JSON';
     resultsContainer.appendChild(a);

     // Trigger the download (remove this if you don't want to auto-download)
     //a.click();
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
