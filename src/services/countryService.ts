import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/countries"; 

export const fetchCountries = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const fetchCountryDetails = async (code: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${code}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching country details:", error);
    throw error;
  }
};
