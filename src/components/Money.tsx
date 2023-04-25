
interface MoneyProps{
  value: number
}

export const Money = ({ value }: MoneyProps) => {
  let formatValue = value
  const fracion = value > 1000000 ? 1 : 0

  if( value > 1000000 ) {
    formatValue = value / 1000000
  }

  return (
    <>
      <span>
        C$ {
          new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: fracion,
            maximumFractionDigits: fracion
          }).format(formatValue)
          }
          { value > 1000000 && ' Mi'}
      </span>
    </>
  )
}