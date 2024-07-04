export default class APIService {
  // Insert an article
  static CalculatePPP(body) {
    // Return the fetch promise chain
    return fetch("/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        // Check if the response is ok (status is in the range 200-299)
        if (!response.ok) {
          // Throw an error if the response is not ok to handle HTTP errors
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the response as JSON
        return response.json();
      })
      .then((output) => {
        // Return the entire response object instead of just output.data
        return output;
      })
      .catch((error) => {
        console.error("Error in CalculatePPP:", error);
        throw error; // Re-throw the error so the caller can handle it
      });
  }
}
