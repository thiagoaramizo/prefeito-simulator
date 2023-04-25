
interface NumberProps{
  value: number
}

export const Number = ({ value }: NumberProps) => {
  return (
    <>
      <span>
        {
          new Intl.NumberFormat('pt-BR', {
          }).format(Math.trunc(value))
        }
      </span>
    </>
  )
}