import axios from 'axios'
import { IAuthor } from '../../models'

export const getAuthorService = async () => {
  const { data, status } = await axios.get<IAuthor[]>(`${import.meta.env.VITE_BACKEND_URL}/api/author`)

  return { data, status }
}
