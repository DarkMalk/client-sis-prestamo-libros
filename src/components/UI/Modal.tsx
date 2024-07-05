type Props = {
  isOpen: boolean
  title: string
  children: React.ReactNode
  id: string
  close: () => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const Modal = ({ isOpen, title, children, id, close, handleSubmit }: Props) => {
  return (
    <>
      <dialog open={isOpen}>
        <article>
          <header>{title}</header>
          <form id={id} onSubmit={handleSubmit}>
            {children}
          </form>
          <footer>
            <button className='secondary' onClick={close}>
              Cancel
            </button>
            <button form={id}>Confirm</button>
          </footer>
        </article>
      </dialog>
    </>
  )
}
