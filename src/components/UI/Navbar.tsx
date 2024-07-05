import { Link } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { UserDropdown } from '../UserDropdown'

export const Navbar = () => {
  const { user } = useUser()

  return (
    <>
      <nav className='container'>
        <ul>
          <li>
            <strong>
              <Link to='/'>Prestamo Libros</Link>
            </strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link to='/book'>Book's</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to='/genre'>Genre's</Link>
              </li>
              <li>
                <Link to='/author'>Author's</Link>
              </li>
              <li>
                <Link to='/loan'>Loan's</Link>
              </li>
              <li>
                <Link to='/fine'>Fine's</Link>
              </li>
            </>
          )}
          {!user && (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )}
          {user && user.role !== 'client' && (
            <li>
              <Link to='/signin'>Create Users</Link>
            </li>
          )}
          {user && (
            <li>
              <UserDropdown />
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}
