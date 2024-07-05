import axios from 'axios'
import { IGenre } from '../../models'

export const postNewGenreService = async (formData: Omit<IGenre, 'id'>, token: string) => {
  const { data, status } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/genre`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return { data, status }
}
