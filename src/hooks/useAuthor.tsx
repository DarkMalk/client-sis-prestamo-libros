import { useEffect } from 'react'
import { useGlobalState } from '../config/globalState'
import { getAuthorService } from '../services/author/getAuthorService'

export const useAuthor = () => {
  const { author, setAuthor } = useGlobalState()

  useEffect(() => {
    getAuthorService().then(({ data }) => setAuthor(data))
  }, [setAuthor])

  return { author, setAuthor }
}
