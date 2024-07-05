import axios from 'axios'

export const pathPaidFineService = async (id: number, token: string) => {
  const { data, status } = await axios.patch(
    `${import.meta.env.VITE_BACKEND_URL}/api/fine/paid/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )

  return { data, status }
}
