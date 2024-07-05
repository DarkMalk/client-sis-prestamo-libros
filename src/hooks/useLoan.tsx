import { useEffect } from 'react'
import { useGlobalState } from '../config/globalState'
import { getLoanService } from '../services/loan/getLoanService'

export const useLoan = () => {
  const { user, loan, setLoan } = useGlobalState()

  useEffect(() => {
    if (!user) return

    getLoanService(user.token).then(({ data }) => setLoan(data))
  }, [user, setLoan])

  return { loan, setLoan }
}
