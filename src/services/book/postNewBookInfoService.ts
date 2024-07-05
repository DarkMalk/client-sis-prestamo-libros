import axios from 'axios'

type Props = {
  serial: string
  state: string
  disponibility: string
  desc_state: string
}

export const postNewBookInfoService = async (formData: Props, id: string, token: string) => {
  const { data, status } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/book/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return { data, status }
}
