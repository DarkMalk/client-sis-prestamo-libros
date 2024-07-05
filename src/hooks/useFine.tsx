import { useEffect } from 'react'
import { useGlobalState } from '../config/globalState'
import { getFineService } from '../services/fine/getFineService'

export const useFine = () => {
  const { user, fine, setFine } = useGlobalState()

  useEffect(() => {
    if (!user) return

    getFineService(user.token).then(({ data }) => setFine(data))
  }, [user, setFine])

  return { fine, setFine }
}
