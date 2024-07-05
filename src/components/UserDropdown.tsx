import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

export const UserDropdown = () => {
  const { user, removeUser } = useUser()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('user')
    removeUser()
    navigate('/')
  }

  if (!user) return

  return (
    <>
      <details className='dropdown'>
        <summary>{user.username}</summary>
        <ul>
          <li>
            <a href='#' onClick={() => logout()}>
              LogOut
            </a>
          </li>
        </ul>
      </details>
    </>
  )
}
