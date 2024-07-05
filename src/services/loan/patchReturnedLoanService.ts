import axios from 'axios'
import { ILoan } from '../../models'

export const patchReturnedLoanService = async (id: number, token: string) => {
  const { data, status } = await axios.patch<ILoan>(
    `${import.meta.env.VITE_BACKEND_URL}/api/loan/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return { data, status }
}
