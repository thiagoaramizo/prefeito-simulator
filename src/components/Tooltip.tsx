import { ReactNode } from "react"

interface TooltipProps {
  children: ReactNode
  position?: 'top' | 'center' 
}

export const Tooltip = ({children, position='top'}:TooltipProps) => {
  
  const stylePosition = position === 'top'? '-mt-16 ' : ''

  return(
    <span 
      className={`
      tooltip
      ml-auto 
      rounded shadow-lg px-2 py-1 bg-cyan-900 bg-opacity-90 
      text-slate-100 text-xs
      w-fit
      whitespace-nowrap  
      `
      +
      stylePosition }
    >
      {children}
    </span>
  )
}