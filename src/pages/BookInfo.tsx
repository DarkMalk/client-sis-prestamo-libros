import { Navigate, useParams } from 'react-router-dom'
import { useBookInfo } from '../hooks/useBookInfo'
import { Table } from '../components/UI/Table'
import { useUser } from '../hooks/useUser'
import { Modal } from '../components/UI/Modal'
import { useState } from 'react'
import { toast } from 'sonner'
import { postNewBookInfoService } from '../services/book/postNewBookInfoService'

const INITIAL_FORM_DATA = {
  serial: '',
  state: '',
  desc_state: '',
  disponibility: 'available'
}

export const BookInfo = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [isOpen, setIsOpen] = useState(false)
  const { id } = useParams()
  const { user } = useUser()

  if (!id) {
    return <Navigate to='/book' />
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (!user) {
      toast.error('You need to be logged in to create a new book info')
      return
    }

    try {
      const { data, status } = await postNewBookInfoService(formData, id, user.token)

      if (status === 201) {
        toast.success(`Book info ${data.serial} created with success`)
      }

      setFormData(INITIAL_FORM_DATA)
      setIsOpen(!isOpen)

      setBookInfo([...bookInfo, data])
    } catch (e) {
      const errorMessage = (e as { response: { data: { message: string } } }).response.data.message
      toast.error(errorMessage)
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { bookInfo, setBookInfo } = useBookInfo(parseInt(id))
  return (
    <>
      <article className='overflow-auto'>
        {user?.role === 'admin' && (
          <header>
            <button onClick={() => setIsOpen(!isOpen)}>Add Book Info</button>
          </header>
        )}
        <Table headName={['id', 'name', 'serial', 'state', 'description', 'disponibility']}>
          {bookInfo &&
            bookInfo.map(({ id, name, serial, state, desc_state, disponibility }) => (
              <tr key={id}>
                <td scope='row'>{id}</td>
                <td>{name}</td>
                <td>{serial}</td>
                <td>{state}</td>
                <td>{desc_state}</td>
                <td>{disponibility}</td>
              </tr>
            ))}
        </Table>
      </article>
      <Modal
        isOpen={isOpen}
        close={() => setIsOpen(!isOpen)}
        id='form-new-book-info'
        title='Create a new book info'
        handleSubmit={handleSubmit}
      >
        <input type='text' name='serial' onChange={handleChange} placeholder='Serial' required />
        <select name='state' onChange={handleChange} required>
          <option value='' disabled>
            Select one state
          </option>
          <option value='good'>Good</option>
          <option value='details'>Details</option>
          <option value='bad'>Bad</option>
        </select>
        <textarea name='desc_state' onChange={handleChange} placeholder='Description' />
      </Modal>
    </>
  )
}
