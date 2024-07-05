import axios from 'axios'
import { IGenre } from '../../models'

export const getGenreService = async () => {
  const { data, status } = await axios.get<IGenre[]>(`${import.meta.env.VITE_BACKEND_URL}/api/genre`)

  return { data, status }
}
