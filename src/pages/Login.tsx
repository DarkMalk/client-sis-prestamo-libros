import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import { loginService } from '../services/loginService'
import { toast } from 'sonner'
import { useUser } from '../hooks/useUser'

type PropsFormData = {
  username: string
  password: string
}

const INITIAL_FORM_DATA: PropsFormData = { username: '', password: '' }

export const Login = () => {
  const [formData, setFormData] = useState<PropsFormData>(INITIAL_FORM_DATA)
  const { user, setUser } = useUser()

  if (user) {
    return <Navigate to='/' />
  }

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    try {
      const { data, status } = await loginService(formData)
      if (status === 200) {
        toast.success('successful login')
      }

      localStorage.setItem('user', JSON.stringify(data))

      setUser(data)
    } catch (e) {
      const errorMessage = (e as { response: { data: { message: string } } }).response.data.message
      toast.error(errorMessage)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <>
      <article>
        <header>Insert your credentials for authenticate</header>
        <form id='form-login' onSubmit={onSubmit}>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleInputChange}
            placeholder='Username'
            required
          />
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            placeholder='password'
            required
          />
        </form>
        <footer>
          <button type='submit' form='form-login'>
            Login
          </button>
        </footer>
      </article>
    </>
  )
}
