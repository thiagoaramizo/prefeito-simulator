import { ReactNode } from "react"


interface ButtonProps {
  children: ReactNode
  onClick?: ()=>void
  disabled?: boolean
  className?: string
}

export const Button = ( { children, className, onClick, disabled=false }: ButtonProps ) => {
  const style = `
  bg-cyan-600
  text-slate-50
  text-sm
  font-bold
  rounded
  p-2

  flex
  items-center
  justify-center

  transition duration-200

  disabled:opacity-50 disabled:cursor-not-allowed

  enabled:hover:bg-cyan-500
  enabled:hover:scale-105
`
  
  
  return (
    <button 
      className={style + className}
      disabled={disabled} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}