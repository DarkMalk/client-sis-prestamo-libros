import { useState } from 'react'
import { Modal } from '../components/UI/Modal'
import { Table } from '../components/UI/Table'
import { useAuthor } from '../hooks/useAuthor'
import { toast } from 'sonner'
import { useUser } from '../hooks/useUser'
import { postNewAuthorService } from '../services/author/postNewAuthorService'

export const Author = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', nationality: '' })
  const { author, setAuthor } = useAuthor()
  const { user } = useUser()

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (!user) {
      toast.error('You need to be logged in to create a new genre')
      return
    }

    try {
      const { data, status } = await postNewAuthorService(formData, user.token)

      if (status === 201) {
        toast.success(`Author ${data.name} created with success`)
        setFormData({ name: '', nationality: '' })
        setIsOpen(!isOpen)
      }

      setAuthor([...author, data])
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
        {user?.role === 'admin' && (
          <header>
            <button onClick={() => setIsOpen(!isOpen)}>Add Author</button>
          </header>
        )}
        <Table headName={['id', 'name', 'nationality']}>
          {author.map(({ id, name, nationality }) => (
            <tr key={id}>
              <td scope='row'>{id}</td>
              <td>{name}</td>
              <td>{nationality}</td>
            </tr>
          ))}
        </Table>
      </article>
      <Modal
        isOpen={isOpen}
        id='form-new-genre'
        title='Create a new Author'
        close={() => setIsOpen(!isOpen)}
        handleSubmit={handleSubmit}
      >
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Name Author'
          required
        />
        <input
          type='text'
          name='nationality'
          value={formData.nationality}
          onChange={handleChange}
          placeholder='Nationality of the author'
          required
        />
      </Modal>
    </>
  )
}
