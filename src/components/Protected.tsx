import { Navigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

type Props = {
  children: React.ReactNode
  roles: string[]
}

export const Protected = ({ children, roles }: Props) => {
  const { user } = useUser()

  if (!user) {
    return <Navigate to='/login' />
  }

  if (!roles.includes(user.role)) {
    return <Navigate to='/' />
  }

  return <>{children}</>
}
