import { SmileySad, Smiley } from "@phosphor-icons/react"

interface IndicatorProps {
  demand: number
  offer: number
  name: string
}


export const RegionIndicator = ({name, offer, demand }: IndicatorProps) => {

  const indicatorSize = (Math.abs(offer) * 50 / demand)
  const negativeIndicator = offer < 0 ? indicatorSize : 0
  const positiveIndicator = offer >= 0 ? indicatorSize : 0
  
  
  return (
    <div className="flex flex-col items-center my-2">
      <strong className="text-xs leading-6 text-center">{name}</strong>


      <div className="flex gap-0 items-center">
        <SmileySad size={16} weight="bold" className="opacity-60 invisible lg:visible"/>

        <div className="flex">
          <div className={'flex justify-end h-3 bg-black bg-opacity-10 border border-opacity-black rounded-l overflow-hidden'} style={{width: 50}}>
            <div className="block bg-red-500 h-3" style={{width: negativeIndicator}}></div>
          </div>
          <div className={'flex h-3 bg-black bg-opacity-10 border border-opacity-black rounded-r overflow-hidden'} style={{width: 50}}>
            <div className="block bg-green-500 h-3" style={{width: positiveIndicator}}></div>
          </div>
        </div>

        <Smiley size={16} weight="bold" className="opacity-60 invisible lg:visible"/>
      </div>
     
    </div>
  )
}