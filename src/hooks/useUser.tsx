import { useGlobalState } from '../config/globalState'
import { useEffect } from 'react'
import { IUser } from '../models/user'

export const useUser = () => {
  const { user, setUser, removeUser } = useGlobalState()

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user')
    if (!userLocalStorage) return

    const userToJSON = JSON.parse(userLocalStorage) as IUser
    setUser(userToJSON)
  }, [setUser])

  return { user, setUser, removeUser }
}
