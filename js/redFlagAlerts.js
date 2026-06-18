
const dateElement = document.getElementById("date");

function formatDate() {
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  };

  const today = new Date();
  return today.toLocaleDateString("en-US", options);
}

dateElement.textContent = formatDate();