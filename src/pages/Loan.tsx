import { useEffect, useState } from 'react'
import { Table } from '../components/UI/Table'
import { useLoan } from '../hooks/useLoan'
import { useUser } from '../hooks/useUser'
import { Modal } from '../components/UI/Modal'
import { useUsers } from '../hooks/useUsers'
import { useBook } from '../hooks/useBook'
import { useBookInfo } from '../hooks/useBookInfo'
import { postNewLoanService } from '../services/loan/postNewLoanService'
import { toast } from 'sonner'
import { patchReturnedLoanService } from '../services/loan/patchReturnedLoanService'

const INITIAL_FORM_DATA = {
  id_user: 0,
  id_book: 0,
  id_book_info: 0,
  start_date: '',
  finish_date: ''
}

export const Loan = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [isOpen, setIsOpen] = useState(false)
  const { loan, setLoan } = useLoan()
  const { users } = useUsers()
  const { user } = useUser()
  const { book } = useBook()
  const { bookInfo } = useBookInfo(formData.id_book)

  useEffect(() => {}, [bookInfo, formData.id_book])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)

    try {
      if (!user) return

      const { data, status } = await postNewLoanService(
        {
          id_book: Number(formData.id_book),
          id_user: Number(formData.id_user),
          id_book_info: Number(formData.id_book_info),
          start_date: formData.start_date,
          finish_date: formData.finish_date
        },
        user.token
      )

      if (status === 201) {
        toast.success(`Loan ${data.id} created with success`)
        setFormData(INITIAL_FORM_DATA)
        setIsOpen(!isOpen)
      }

      setLoan([...loan, data])
    } catch (e) {
      const errorMessage = (e as { response: { data: { message: string } } }).response.data.message
      toast.error(errorMessage)
    }
  }

  const returnLoan = async (id: number) => {
    if (!user) return
    try {
      const { data, status } = await patchReturnedLoanService(id, user.token)

      if (status === 200) {
        toast.success(`Loan ${data.id} returned with success`)
        setLoan(loan.map(loan => (loan.id === data.id ? data : loan)))
      }
    } catch (e) {
      const errorMessage = (e as { response: { data: { message: string } } }).response.data.message
      toast.error(errorMessage)
    }
  }

  return (
    <>
      <article className='overflow-auto'>
        {user?.role === 'admin' && (
          <header>
            <button onClick={() => setIsOpen(!isOpen)}>Add Loan</button>
          </header>
        )}
        <Table headName={['id', 'book', 'user', 'serial', 'start', 'finish', 'state', 'tools']}>
          {loan.map(({ id, book_name, username, serial, start_date, finish_date, state }) => (
            <>
              <tr key={id}>
                <td scope='row'>{id}</td>
                <td>{book_name}</td>
                <td>{username}</td>
                <td>{serial}</td>
                <td>{new Date(start_date).toLocaleDateString('es-ES')}</td>
                <td>{new Date(finish_date).toLocaleDateString('es-ES')}</td>
                <td>{state}</td>
                {(user?.role === 'admin' || user?.role === 'librarian') && (
                  <th>
                    <button disabled={state === 'returned'} onClick={() => returnLoan(id)}>
                      Return
                    </button>
                  </th>
                )}
              </tr>
            </>
          ))}
        </Table>
      </article>
      <Modal
        isOpen={isOpen}
        close={() => setIsOpen(!isOpen)}
        id='form-new-loan'
        title='Create a new loan'
        handleSubmit={handleSubmit}
      >
        <select name='id_user' value={formData.id_user} onChange={handleChange} required>
          <option value='0' disabled>
            Select an user
          </option>
          {users.map(({ id, username, name, lastname }) => (
            <option key={id} value={id}>
              {username} - {name} {lastname}
            </option>
          ))}
        </select>
        <select name='id_book' value={formData.id_book} onChange={handleChange} required>
          <option value='0' disabled>
            Select a book
          </option>
          {book.map(({ id, name, editorial }) => (
            <option key={id} value={id}>
              {name} - {editorial}
            </option>
          ))}
        </select>
        <select name='id_book_info' value={formData.id_book_info} onChange={handleChange} required>
          <option value='0' disabled>
            Select a book info
          </option>
          {bookInfo
            .filter(({ disponibility }) => disponibility === 'available')
            .map(({ id, serial, state }) => (
              <option key={id} value={id}>
                Nº Serie: {serial} - State: {state}
              </option>
            ))}
        </select>

        <input
          type='date'
          value={formData.start_date}
          min={new Date().toISOString().split('T')[0]}
          onChange={handleChange}
          name='start_date'
        />
        <input
          type='date'
          value={formData.finish_date}
          min={new Date().toISOString().split('T')[0]}
          onChange={handleChange}
          name='finish_date'
        />
      </Modal>
    </>
  )
}
