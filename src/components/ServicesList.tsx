import { CityService } from '@/components/CityService'
import { cityServices } from '@/gameData/cityServices'
import { RegionType } from '@/types'

interface ServicesListProps {
  region: RegionType,
  onFinish: ()=>void
}

export const ServicesList = ({region, onFinish}:ServicesListProps) => {

  const categories = [
    'Lazer',
    'Educação',
    'Saúde',
    'Ambiente',
    'Segurança',
    'Mobilidade'
  ]

  const sortCityServices = cityServices.sort((a,b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0))

  return (
    <div className='bg-cyan-800 bg-gradient-to-bl from-cyan-800 from-10% via-cyan-700 via-50% to-cyan-800 to-90% p-6 flex flex-col gap-3 rounded-xl mt-4 shadow-lg'>
      
      {categories.map( (category) => {
        return (
          <div key={category}>
            <h2 className='font-bold text-sm mb-1'>{category}</h2>
            <div className='flex gap-3 flex-wrap'>
              {sortCityServices.map( (cityService) => {
                if( cityService.category.includes(category) ) {
                  return <CityService key={cityService.name} {...cityService} region={region} onFinish={onFinish}/>
                }
              })}
            </div>
          </div>
        )
      } )}
      
    </div>
  )
}