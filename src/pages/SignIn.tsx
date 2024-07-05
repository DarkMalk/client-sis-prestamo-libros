import { useState } from 'react'
import { registerService } from '../services/registerService'
import { useUser } from '../hooks/useUser'
import { toast } from 'sonner'
import { Navigate } from 'react-router-dom'

const INITIAL_VALUE = {
  username: '',
  email: '',
  name: '',
  lastname: '',
  password: '',
  role: ''
}

export const SignIn = () => {
  const { user } = useUser()
  const [formData, setFormData] = useState(INITIAL_VALUE)

  if (!user) {
    return <Navigate to='/login' />
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { data, status } = await registerService(formData, user.token)
      if (status === 201) {
        toast.success('User created successfully')
      }

      console.log(data)
    } catch (e) {
      const errorMessage = (e as { response: { data: { message: string } } }).response.data.message
      toast.error(errorMessage)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <>
      <article>
        <header>Insert data for create a new user</header>
        <form id='form-register' onSubmit={handleSubmit}>
          <input
            type='text'
            onChange={handleChange}
            value={formData.username}
            name='username'
            placeholder='Username'
            required
          />
          <input
            type='email'
            onChange={handleChange}
            value={formData.email}
            name='email'
            placeholder='Email'
            required
          />
          <input type='text' onChange={handleChange} value={formData.name} name='name' placeholder='Name' required />
          <input
            type='text'
            onChange={handleChange}
            value={formData.lastname}
            name='lastname'
            placeholder='LastName'
            required
          />
          <input
            type='password'
            onChange={handleChange}
            value={formData.password}
            name='password'
            placeholder='Password'
            required
          />
          <select name='role' onChange={handleChange} value={formData.role} required>
            <option value=''>Select one role</option>
            <option value='admin'>Admin</option>
            <option value='librarian'>Librarian</option>
            <option value='client'>Client</option>
          </select>
        </form>
        <footer>
          <button type='submit' form='form-register'>
            Send
          </button>
        </footer>
      </article>
    </>
  )
}
