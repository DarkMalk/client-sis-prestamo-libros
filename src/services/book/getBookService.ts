import axios from 'axios'

export const getBookService = async () => {
  const { data, status } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/book`)

  return { data, status }
}
