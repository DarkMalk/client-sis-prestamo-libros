import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

export const Home = () => {
  const { user } = useUser()

  return (
    <>
      <article>
        <header>
          <h1>Welcome to the Library Loan System</h1>
        </header>
        <main>
          <p>Manage your book loans efficiently and easily.</p>
          <ul>
            {!user && (
              <li>
                <Link to='/login'>Log In</Link>
              </li>
            )}
            <li>
              <Link to='/book'>View Book's</Link>
            </li>
          </ul>
        </main>
      </article>
    </>
  )
}
