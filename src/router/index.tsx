import { createBrowserRouter } from 'react-router-dom'
import { Root, Login, Genre, Author, Loan, Fine, Book, BookInfo, SignIn, Home } from '../pages'
import { Protected } from '../components/Protected'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signin',
        element: (
          <Protected roles={['admin', 'librarian']}>
            <SignIn />
          </Protected>
        )
      },
      {
        path: '/genre',
        element: <Genre />
      },
      {
        path: '/author',
        element: <Author />
      },
      {
        path: '/loan',
        element: (
          <Protected roles={['admin', 'librarian', 'client']}>
            <Loan />
          </Protected>
        )
      },
      {
        path: '/fine',
        element: (
          <Protected roles={['admin', 'librarian', 'client']}>
            <Fine />
          </Protected>
        )
      },
      {
        path: '/book',
        element: <Book />
      },
      {
        path: '/book/:id',
        element: <BookInfo />
      }
    ]
  }
])

export { router }
