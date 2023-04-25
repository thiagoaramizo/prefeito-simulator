import { ReactNode } from "react"
import { Tooltip } from "./Tooltip"

interface IconProps {
  children: ReactNode
  name: string
  className?: string
  tooltipPosition?: 'top' | 'center'
}

export const Icon = ({children, name, className, tooltipPosition}: IconProps) => {

  const style = `
    has-tooltip
    bg-cyan-900
    bg-radial-gradient
    text-slate-50
    shadow-md 
    w-10 
    h-10 
    rounded-xl 
    flex items-center justify-center
    hover:scale-110 ` + className

  return (
    <div className={style}>
      {children}
      <Tooltip position={tooltipPosition}>{name}</Tooltip>
      

      
    </div>
  )
}