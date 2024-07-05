export interface IBookInfo {
  id: number
  name: string
  serial: string
  state: 'good' | 'bad' | 'details'
  desc_state: string
  disponibility: 'available' | 'taken'
}
