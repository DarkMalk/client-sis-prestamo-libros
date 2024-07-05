import { IUser } from '../models/user'
import axios from 'axios'

type Props = {
  username: string
  password: string
}

export const loginService = async ({ username, password }: Props) => {
  const { status, data } = await axios.post<IUser>(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
    username,
    password
  })
  return { status, data }
}
