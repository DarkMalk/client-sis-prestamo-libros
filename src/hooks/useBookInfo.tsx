import { useEffect } from 'react'
import { useGlobalState } from '../config/globalState'
import { getBookInfoService } from '../services/book/getBookInfoService'
import { toast } from 'sonner'

export const useBookInfo = (id: number) => {
  const { bookInfo, setBookInfo } = useGlobalState()

  useEffect(() => {
    getBookInfoService(id)
      .then(({ data }) => setBookInfo(data))
      .catch(e => toast.error(e.response.data.message))
  }, [id, setBookInfo])

  return { bookInfo, setBookInfo }
}
