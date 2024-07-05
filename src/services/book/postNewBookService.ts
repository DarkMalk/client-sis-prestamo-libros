import axios from 'axios'

export const postNewBookService = async ({
  name,
  author,
  editorial,
  genres,
  isbn,
  token
}: {
  name: string
  author: number
  editorial: string
  genres: number[]
  isbn: string
  token: string
}) => {
  const { data, status } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/book`,
    { name, author, editorial, genres, isbn },
    { headers: { Authorization: `Bearer ${token}` } }
  )

  return { data, status }
}
