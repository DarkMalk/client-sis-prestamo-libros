import { create } from 'zustand'
import { IUser, IGenre, IAuthor, ILoan, IFine, IBook, IBookInfo } from '../models'

type globalState = {
  user: IUser | undefined
  setUser: (user: IUser) => void
  removeUser: () => void

  genre: IGenre[]
  setGenre: (genre: IGenre[]) => void

  author: IAuthor[]
  setAuthor: (author: IAuthor[]) => void

  loan: ILoan[]
  setLoan: (loan: ILoan[]) => void

  fine: IFine[]
  setFine: (fine: IFine[]) => void

  book: IBook[]
  setBook: (book: IBook[]) => void

  bookInfo: IBookInfo[]
  setBookInfo: (bookInfo: IBookInfo[]) => void

  users: IUser[]
  setUsers: (users: IUser[]) => void
}

const useGlobalState = create<globalState>(set => ({
  user: undefined,
  genre: [],
  author: [],
  loan: [],
  fine: [],
  book: [],
  bookInfo: [],
  users: [],
  setUser: user => set(prev => ({ ...prev, user })),
  setGenre: genre => set(prev => ({ ...prev, genre })),
  setAuthor: author => set(prev => ({ ...prev, author })),
  setLoan: loan => set(prev => ({ ...prev, loan })),
  setFine: fine => set(prev => ({ ...prev, fine })),
  setBook: book => set(prev => ({ ...prev, book })),
  setBookInfo: bookInfo => set(prev => ({ ...prev, bookInfo })),
  setUsers: users => set(prev => ({ ...prev, users })),
  removeUser: () => set(prev => ({ ...prev, user: undefined }))
}))

export { useGlobalState }
