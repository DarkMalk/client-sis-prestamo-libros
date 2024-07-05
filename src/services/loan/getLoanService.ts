import axios from 'axios'
import { ILoan } from '../../models'

export const getLoanService = async (token: string) => {
  const { data, status } = await axios.get<ILoan[]>(`${import.meta.env.VITE_BACKEND_URL}/api/loan`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return { data, status }
}
