import { RegionType } from '@/types'
import { Briefcase, Buildings, CaretDoubleDown, CaretDoubleUp, Factory, HouseLine, Icon, MinusCircle, PlusCircle, UsersThree } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { RegionService } from './RegionService'
import Image from 'next/image'
import { useState } from 'react'
import { ServicesList } from './ServicesList'
import { Number } from './Number'
import { RegionIndicator } from './RegionIndicator'
import { Tooltip } from './Tooltip'
import { Money } from './Money'
import { incomeRateByCompanies, incomeRateByPopulation } from '@/gameData/rates'


interface RegionProps {
  region: RegionType
}

export const Region = ({region}: RegionProps) => {
  
  const [isActive, setIsActive] = useState(false)

  const IconOfRegion: Icon = (
    region.type === 'residential' ? HouseLine :
    region.type === 'commercial' ? Buildings : Factory
  )

  const colorOfRegion = (
    region.type === 'residential' ? 'bg-green-600 bg-gradient-to-bl from-green-600 to-green-500 divide-green-500' :
    region.type === 'commercial' ? 'bg-blue-600 bg-gradient-to-bl from-blue-600 to-blue-500 divide-blue-500' : 'bg-yellow-500 bg-gradient-to-bl from-yellow-400 to-yellow-500 divide-yellow-400'
  )

  const expense = region.expense.reduce( (acumulator, expense) => acumulator + expense.mensalExpense*expense.quantity, 0)
  const income = region.population * incomeRateByPopulation + region.companies * incomeRateByCompanies

  const totalServices = region.expense.reduce( (acumulator, expense) => acumulator + (
    expense.supply.education + expense.supply.environment + expense.supply.health + expense.supply.leisure + expense.supply.mobility + expense.supply.safety )
    * expense.quantity, 0 )

  const totalDemand = ( region.demands.education + region.demands.environment + region.demands.health + region.demands.leisure +
    region.demands.mobility + region.demands.safety )

  const tendenciePopulation = totalServices - totalDemand

  const handleActive = () => {
    setIsActive(!isActive)
  }


  return (
    <>
      <motion.div
        className={`block w-full rounded-2xl drop-shadow-md divide-y text-white ` + colorOfRegion} 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{scale: 1.02}}
      > 

        <div className='w-full h-24'>
            <Image src={`/images/${region.type}-zone.jpg`} alt='' width={1080} height={720} className='object-cover w-full h-24 opacity-40 rounded-t-2xl'/>
        </div>       

        <div className='flex items-center justify-between'>
          <div className="p-2 px-4 flex gap-4 items-center ">
            <IconOfRegion size={72} weight="light" className="text-white opacity-70 flex items-center justify-center"/>
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-xl">{region.name}</h2>
              <div className="flex items-center gap-4 text-base font-semibold">
                <div className="flex items-center gap-1 has-tooltip"><UsersThree size={24} /><Number value={region.population} /> {
                  tendenciePopulation > 0 ? <CaretDoubleUp size={16} weight="bold" className='text-green-600' /> : <CaretDoubleDown className='text-red-400' size={16} weight="bold" />
                } <Tooltip>População</Tooltip></div>
                <div className="flex items-center gap-1 has-tooltip"><Briefcase size={24} /><Number value={region.companies} /><Tooltip>Empresas</Tooltip></div>
              </div>
            </div>
          </div>

          <div className='flex flex-col text-xs justify-end text-right px-8'>
            <strong>Receitas: <Money value={income}/></strong>
            <strong>Despesas: <Money value={expense}/></strong>
          </div>
        </div>

        <div className='p-4'>
          <strong className='text-sm'>Satisfação da população</strong>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 ">
            <RegionIndicator name='Saúde' demand={region.demands.health} offer={region.indicators.health - region.demands.health}/>
            <RegionIndicator name='Lazer' demand={region.demands.leisure} offer={region.indicators.leisure - region.demands.leisure}/>
            <RegionIndicator name='Educação' demand={region.demands.education} offer={region.indicators.education - region.demands.education}/>
            <RegionIndicator name='Ambiente' demand={region.demands.environment} offer={region.indicators.environment - region.demands.environment}/>
            <RegionIndicator name='Segurança' demand={region.demands.safety} offer={region.indicators.safety - region.demands.safety}/>
            <RegionIndicator name='Mobilidade' demand={region.demands.mobility} offer={region.indicators.mobility - region.demands.mobility}/>
          </div>
        </div>  
        
        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <strong className='text-sm'>{isActive ? 'Adicione serviços' : 'Serviços da região'}</strong>
            <button className='flex items-center gap-1 text-sm font-semibold' onClick={handleActive}>
              {isActive ? 'Cancelar' : 'Adicionar'}
              {isActive ? <MinusCircle size={32} /> : <PlusCircle size={32} />}
            </button>
          </div>
          {isActive && <ServicesList region={region} onFinish={handleActive}/>}
          {!isActive &&<div className='flex gap-3 flex-wrap mt-2'>
              {region.expense.map( (regionService) => {
                return <RegionService key={regionService.name+region.id} {...regionService}/>
              })}
          </div>}
        </div>

      </motion.div>
    </>
  )
}