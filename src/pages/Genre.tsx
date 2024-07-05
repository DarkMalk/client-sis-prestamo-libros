import React, { useState } from 'react'
import { Modal } from '../components/UI/Modal'
import { Table } from '../components/UI/Table'
import { useGenre } from '../hooks/useGenre'
import { useUser } from '../hooks/useUser'
import { postNewGenreService } from '../services/genre/postNewGenreService'
import { toast } from 'sonner'

export const Genre = () => {
  const [formData, setFormData] = useState({ name: '' })
  const [isOpen, setIsOpen] = useState(false)
  const { genre, setGenre } = useGenre()
  const { user } = useUser()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!user) {
      toast.error('You need to be logged in to create a new genre')
      return
    }

    try {
      const { data, status } = await postNewGenreService(formData, user.token)

      if (status === 201) {
        toast.success(`Genre ${data.name} created with success`)
        setFormData({ name: '' })
        setIsOpen(!isOpen)
      }

      setGenre([...genre, data])
    } catch (e) {
      const errorMessage = (e as { response: { data: { message: string } } }).response.data.message
      toast.error(errorMessage)
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <>
      <article>
        <header>{user?.role === 'admin' && <button onClick={() => setIsOpen(!isOpen)}>Add Genre</button>}</header>
        <Table headName={['id', 'name']}>
          {genre.map(({ id, name }) => (
            <tr key={id}>
              <td scope='row'>{id}</td>
              <td>{name}</td>
            </tr>
          ))}
        </Table>
      </article>
      <Modal
        isOpen={isOpen}
        id='form-new-genre'
        title='Create a new genre'
        close={() => setIsOpen(!isOpen)}
        handleSubmit={handleSubmit}
      >
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Name Genre'
          required
        />
      </Modal>
    </>
  )
}
