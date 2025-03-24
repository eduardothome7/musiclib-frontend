import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

const login = async (email, password) => {
  try {
    const response = await api.post("/auth/sign_in", { 
        email: email,
        password: password
     })

    return response.data
  } catch (error) {
    throw error
  }
}

const logout = async (authToken) => {
  try {
    const response = await api.delete("/auth/log_out", {
      headers: {
         "Content-Type": "application/json",
        Token: authToken
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}

const register = async(user) => {
  try {
    const response = await api.post("/auth/sign_up", user)

    return response.data
  } catch (error) {
    throw error
  }
}

export default {
  login,
  logout,
  register
}