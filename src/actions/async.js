import "whatwg-fetch";

// T&LC application page
const BASE_URL = "https://data.cityofnewyork.us/resource/xtra-f75s.json";

// Pulls info for a specified application
// @param {string} appNumber
// @return Promise
export const fetchApplication = (appNumber) => (
  fetch(`${BASE_URL}?app_no=${appNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
);
