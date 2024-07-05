import axios from 'axios'
import { IAuthor } from '../../models'

export const postNewAuthorService = async (formData: Omit<IAuthor, 'id'>, token: string) => {
  const { data, status } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/author`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return { data, status }
}
