async function fetchData() {
  try {
    const response = await fetch('http://localhost:5000/client'); // Adjust URL if needed
    
    // Check for successful response
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json(); // Parse the response as JSON
    return data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle errors here (optional)
  }
}

export default fetchData;
