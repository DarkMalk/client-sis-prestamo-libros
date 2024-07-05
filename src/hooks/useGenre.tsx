import { useEffect } from 'react'
import { useGlobalState } from '../config/globalState'
import { getGenreService } from '../services/genre/getGenreService'

export const useGenre = () => {
  const { genre, setGenre } = useGlobalState()

  useEffect(() => {
    getGenreService().then(({ data }) => {
      setGenre(data)
    })
  }, [setGenre])

  return { genre, setGenre }
}
