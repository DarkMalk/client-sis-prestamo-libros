export interface ILoan {
  id: number
  book_name: string
  username: string
  serial: string
  start_date: string
  finish_date: string
  state: 'active' | 'returned' | 'expired'
}
