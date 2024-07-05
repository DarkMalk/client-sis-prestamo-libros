import axios from 'axios'

export const getUsersService = async (token: string) => {
  const { data, status } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return { data, status }
}
