import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  headName?: string[]
}

export const Table = ({ children, headName }: Props) => {
  return (
    <>
      <table className='striped'>
        {headName && (
          <thead>
            <tr>
              {headName.map((value, index) => (
                <th scope='col' key={index}>
                  {value}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>{children}</tbody>
      </table>
    </>
  )
}
