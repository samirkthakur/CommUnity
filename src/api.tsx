import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${apiUrl}/api`

export const fetchEvents = async() => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events`)
        return response.data
    } catch (error) {
        console.error("Error fetching events: ", error)
        return []
    }
}