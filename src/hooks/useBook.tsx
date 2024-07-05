import { useEffect } from 'react'
import { useGlobalState } from '../config/globalState'
import { getBookService } from '../services/book/getBookService'

export const useBook = () => {
  const { book, setBook } = useGlobalState()

  useEffect(() => {
    getBookService().then(({ data }) => setBook(data))
  }, [setBook])

  return { book, setBook }
}
