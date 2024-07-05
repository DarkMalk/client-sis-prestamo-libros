import { useEffect } from 'react'
import { useUser } from './useUser'
import { useGlobalState } from '../config/globalState'
import { getUsersService } from '../services/getUsersService'

export const useUsers = () => {
  const { user } = useUser()
  const { users, setUsers } = useGlobalState()

  useEffect(() => {
    if (!user) return
    getUsersService(user.token)
      .then(({ data }) => setUsers(data))
      .catch(err => console.error(err))
  }, [setUsers, user])

  return { users, setUsers }
}
