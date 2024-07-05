import axios from 'axios'
import { IBookInfo } from '../../models'

export const getBookInfoService = async (id: number) => {
  const { data, status } = await axios.get<IBookInfo[]>(`${import.meta.env.VITE_BACKEND_URL}/api/book/${id}`)

  return { data, status }
}
