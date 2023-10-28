
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
      const animals = data.animals;

      animals.forEach((item) => {
          const itemDiv = document.createElement("div");
          itemDiv.textContent = item.name; // any property

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
