import { Navbar } from '../components/UI/Navbar'
import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom'

function Root() {
  return (
    <>
      <Navbar />
      <Toaster />
      <main className='container'>
        <Outlet />
      </main>
    </>
  )
}

export default Root
