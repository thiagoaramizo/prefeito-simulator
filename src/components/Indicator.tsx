import { SmileySad, Smiley } from "@phosphor-icons/react"

interface IndicatorProps {
  total?: number
  value: number
  name: string
}


export const Indicator = ({name, value, total=100 }: IndicatorProps) => {

  const indicatorSize = (
    value > 0 ? value/total*100 : 
    value < 0 ? value/total*-100 : 0
  )
  const indicatorStyle = (
    value > 0 ? 'bg-green-500 left-1/2': 
    value < 0 ? 'bg-red-500 right-1/2' : 'border-l-2 border-yellow-600 right-1/2'
  )
  
  return (
    <div className="flex flex-col items-center my-2">
      <strong className="text-xs leading-6 text-center">{name}</strong>
      <div className="flex gap-1 items-center">
        <SmileySad size={16} weight="bold" className="opacity-60 invisible lg:visible"/>
        <div className={'block h-3 bg-black bg-opacity-10 border border-opacity-black relative rounded overflow-hidden'} style={{width: 100}}>
          <div
            className={`
            block
            h-3
            absolute
            
            ${indicatorStyle}
            `}
            style={{
              width: `${Math.abs(indicatorSize) / 2}%`
            }}
          ></div>
        </div>
        <Smiley size={16} weight="bold" className="opacity-60 invisible lg:visible"/>
      </div>
     
    </div>
  )
}