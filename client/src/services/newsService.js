const API_URL = 'http://localhost:3001/news'; 

export const fetchNewsData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const data = await response.json();

    if (Array.isArray(data)) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; 
  }
};
