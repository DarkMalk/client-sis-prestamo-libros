import axios from 'axios'
import { IUser } from '../models'

type Props = {
  username: string
  email: string
  name: string
  lastname: string
  password: string
  role: string
}

export const registerService = async (formData: Props, token: string) => {
  const { data, status } = await axios.post<IUser>(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return { data, status }
}
