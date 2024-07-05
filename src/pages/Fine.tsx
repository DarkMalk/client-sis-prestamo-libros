import { toast } from 'sonner'
import { Table } from '../components/UI/Table'
import { useFine } from '../hooks/useFine'
import { useUser } from '../hooks/useUser'
import { pathPaidFineService } from '../services/fine/patchPaidFineService'

export const Fine = () => {
  const { fine, setFine } = useFine()
  const { user } = useUser()

  const paidFine = async (id: number) => {
    if (!user) return

    try {
      const { data, status } = await pathPaidFineService(id, user.role)

      if (status === 200) {
        toast.success(`Fine ${data.id} paid with success`)
        setFine(fine.map(fine => (fine.id === data.id ? data : fine)))
      }
    } catch (e) {
      const errorMessage = (e as { response: { data: { message: string } } }).response.data.message
      toast.error(errorMessage)
    }
    console.log(id)
  }

  return (
    <>
      <article>
        <Table headName={['id', 'value', 'user', 'email', 'state', 'tools']}>
          {fine.map(({ id, value, username, email, state }) => (
            <tr key={id}>
              <td scope='row'>{id}</td>
              <td>{value}</td>
              <td>{username}</td>
              <td>{email}</td>
              <td>{state}</td>
              {(user?.role === 'admin' || user?.role === 'librarian') && (
                <th>
                  <button disabled={state === 'paid'} onClick={() => paidFine(id)}>
                    Return
                  </button>
                </th>
              )}
            </tr>
          ))}
        </Table>
      </article>
    </>
  )
}
