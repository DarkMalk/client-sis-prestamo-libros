import { useNavigate } from 'react-router-dom'
import { Table } from '../components/UI/Table'
import { useBook } from '../hooks/useBook'
import { useUser } from '../hooks/useUser'
import { useState } from 'react'
import { Modal } from '../components/UI/Modal'
import { useAuthor } from '../hooks/useAuthor'
import { useGenre } from '../hooks/useGenre'
import { toast } from 'sonner'
import { postNewBookService } from '../services/book/postNewBookService'

type formData = {
  name: string
  author: number
  editorial: string
  isbn: string
  genres: number[]
}

const INITIAL_FORM_DATA = { name: '', author: 0, editorial: '', isbn: '', genres: [] }

export const Book = () => {
  const [formData, setFormData] = useState<formData>(INITIAL_FORM_DATA)
  const [isOpen, setIsOpen] = useState(false)
  const { book, setBook } = useBook()
  const navigate = useNavigate()
  const { user } = useUser()
  const { author } = useAuthor()
  const { genre } = useGenre()

  const handleClick = (id: number) => navigate(`/book/${id}`)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, author, editorial, genres, isbn } = formData

    if (!user) {
      toast.error('You need to be logged in to create a new book')
      return
    }

    try {
      const { data, status } = await postNewBookService({ name, author, editorial, genres, isbn, token: user.token })

      if (status === 201) {
        toast.success(`Book ${data.name} created with success`)
        setFormData(INITIAL_FORM_DATA)
        setIsOpen(!isOpen)
      }

      setBook([...book, data])
    } catch (e) {
      const errorMessage = (e as { response: { data: { message: string } } }).response.data.message
      toast.error(errorMessage)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData({ ...formData, genres: [...formData.genres, parseInt(value)] })
  }

  return (
    <>
      <article className='overflow-auto'>
        {user?.role === 'admin' && (
          <header>
            <button onClick={() => setIsOpen(!isOpen)}>Add Book</button>
          </header>
        )}
        <Table headName={['id', 'name', 'author', 'editorial', 'isbn', "genre's"]}>
          {book.map(({ id, name, author, editorial, isbn, genres }) => (
            <tr style={{ cursor: 'pointer' }} key={id} onClick={() => handleClick(id)}>
              <td scope='row'>{id}</td>
              <td>{name}</td>
              <td>{author}</td>
              <td>{editorial}</td>
              <td>{isbn}</td>
              <td>{genres.join(', ')}</td>
            </tr>
          ))}
        </Table>
      </article>
      <Modal
        isOpen={isOpen}
        close={() => setIsOpen(!isOpen)}
        id='form-new-book'
        title='Create a new book'
        handleSubmit={handleSubmit}
      >
        <input type='text' value={formData.name} onChange={handleChange} name='name' placeholder='Name book' required />
        <select name='author' value={formData.author} onChange={handleChange}>
          <option value='0' disabled>
            Select an author
          </option>
          {author.map(({ id, name }) => (
            <option value={id}>{name}</option>
          ))}
        </select>
        <input
          type='text'
          value={formData.editorial}
          onChange={handleChange}
          placeholder='Editorial'
          name='editorial'
          required
        />
        <input type='text' value={formData.isbn} onChange={handleChange} name='isbn' placeholder='ISBN' required />
        <details className='dropdown'>
          <summary>Select a genre's</summary>
          <ul>
            {genre.map(({ id, name }) => (
              <li>
                <label>
                  <input type='checkbox' value={id} onChange={handleChangeCheckbox} />
                  {name}
                </label>
              </li>
            ))}
          </ul>
        </details>
      </Modal>
    </>
  )
}
