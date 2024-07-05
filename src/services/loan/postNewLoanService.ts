import axios from 'axios'
import { ILoan } from '../../models'

type Props = {
  id_user: number
  id_book: number
  id_book_info: number
  start_date: string
  finish_date: string
}

export const postNewLoanService = async (formData: Props, token: string) => {
  const { data, status } = await axios.post<ILoan>(`${import.meta.env.VITE_BACKEND_URL}/api/loan`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return { data, status }
}
