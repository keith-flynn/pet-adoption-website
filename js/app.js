require("dotenv").config();

("use-strict");

document.getElementById("fetchButton").addEventListener("click", () => {
  const accessToken = process.env.ACCESS_TOKEN;
  const apiURL = "https://api.petfinder.com/v2/animals";

  // Header with 0auth Bearer token
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  // Perform fetch request
  fetch(apiURL, { method: "GET", headers })
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
