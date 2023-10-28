
"use-strict";

document.getElementById("fetchButton").addEventListener("click", () => {
  const accessToken = ACCESS_TOKEN;
  const apiURL = "https://api.petfinder.com/v2/animals?type=dog";

  // Header with 0auth Bearer token
  const headersInfo = {
    Authorization: `Bearer ${ACCESS_TOKEN}`
  };

  // Perform fetch request
  fetch(apiURL, { method: "GET", headers: headersInfo })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.error(`Request failed with status ${response.status}`);
        return null; // handle error
      }
    })
    .then((data) => {
      if (data) {
        console.log("API Response:", data);
      }
    })
    .catch((error) => {
      console.error("Request error:", error);
    });
});

