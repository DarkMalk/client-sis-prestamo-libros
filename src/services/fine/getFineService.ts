import axios from 'axios'
import { IFine } from '../../models'

export const getFineService = async (token: string) => {
  const { data, status } = await axios.get<IFine[]>(`${import.meta.env.VITE_BACKEND_URL}/api/fine`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return { data, status }
}
