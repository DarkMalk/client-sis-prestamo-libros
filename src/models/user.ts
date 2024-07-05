export interface IUser {
  id: number
  username: string
  email: string
  name: string
  lastname: string
  role: 'admin' | 'librarian' | 'client'
  token: string
}
