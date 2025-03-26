import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL
})

const fetchArtists = async () => {
    try {
      const authToken = localStorage.getItem('authToken')

      const response = await api.get("/artists", {
        headers: {
          "Content-Type": "application/json",
          "Token": authToken
        }
      })
  
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const saveArtist = async (data) => {
    try {
      const authToken = localStorage.getItem('authToken')

      const response = await api.post("/artists", data, {
        headers: {
          "Content-Type": "application/json",
          "Token": authToken
        }
      })

      return response.data
    } catch (error) {
      throw error
    }
  }

export default {
  fetchArtists,
  saveArtist
}