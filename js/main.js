const BASE_URL = "https://api.example-app.com";
const ENDPOINT = "/users";

async function getUsers() {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINT}`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Users:", data);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
}

getUsers();