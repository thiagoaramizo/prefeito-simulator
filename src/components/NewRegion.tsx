import { GameContext } from '@/contexts/GameContext'
import { Buildings, Factory, HouseLine, PlusCircle, X } from '@phosphor-icons/react'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { Button } from './Button'
import { Money } from './Money'
import { motion } from "framer-motion"
import { regionPrice } from '@/gameData/rates'



export const NewRegion = () => {

  const {regions, addRegion, subtractBalance, balance} = useContext(GameContext)
  const [isActive, setIsActive] = useState(false)

  const valueToCreateRegion = regions.length < 7 ? regionPrice[regions.length] : regionPrice[6]*regions.length

  const handleActive = () => {
    setIsActive(!isActive)
  }

  const handleCreateRegion = ( typeOfRegion: 'residential' | 'commercial' | 'industrial' ) => {
    setIsActive(!isActive)
    addRegion( typeOfRegion )
    subtractBalance( valueToCreateRegion )
  }

  return (
    <>
      <div
        className={`block w-full min-h-96 rounded-2xl drop-shadow-md`} 
      > 
      { !isActive ? 
        <button className='flex flex-col w-full h-96 items-center justify-center cursor-pointer bg-slate-200 rounded-2xl opacity-50 transition-all duration-300 hover:opacity-100' onClick={handleActive}>
          <PlusCircle size={100} weight="light" className="mx-auto"/>
          <strong>Novo loteamento</strong>
        </button>
      :
        <div className='bg-slate-200 rounded-2xl'>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }} 
        className='px-8 py-12 flex flex-col items-center justify-center gap-6 relative'>
          <div className='flex flex-col items-center gap-2 border-slate-300 border p-4 rounded-md'>
            <Image src={'/images/logo-escavator.png'} alt='' width={100} height={98}/>
            <p className='text-center text-sm'>Olá Sr.(a) Prefeito(a)! Nós somos a Excavator, ganhamos a licitação e somos a empresa responsável pelos loteamentos para a cidade.</p>
            <p className='text-center text-sm'>Podemos criar novos loteamentos residenciais, comerciais ou industriais.</p>
            
          </div>
          <div className='mb-9'>
          <strong className='block text-center text-sm mb-4'>Escolha que tipo de loteamento devemos criar?</strong>
            <div className='flex gap-2'>
              <Button disabled={valueToCreateRegion > balance} className='bg-gradient-to-b from-green-600 to-green-500 gap-2 disabled:opacity-50 disabled:cursor-not-allowed' onClick={()=>handleCreateRegion('residential')}><HouseLine size={24}/> <Money value={valueToCreateRegion}/></Button>
              <Button disabled={valueToCreateRegion > balance} className='bg-gradient-to-b from-blue-600 to-blue-500 gap-2 disabled:opacity-50 disabled:cursor-not-allowed' onClick={()=>handleCreateRegion('commercial')}><Buildings size={24}/> <Money value={valueToCreateRegion}/></Button>
              <Button disabled={valueToCreateRegion > balance} className='bg-gradient-to-b from-yellow-500 to-yellow-400 gap-2 disabled:opacity-50 disabled:cursor-not-allowed' onClick={()=>handleCreateRegion('industrial')}><Factory size={24}/> <Money value={valueToCreateRegion}/></Button>
            </div>
          </div>
          <button onClick={handleActive} className="flex bg-slate-800 rounded-full text-slate-50 items-center justify-center p-1 absolute -top-2 -right-2 hover:bg-slate-700">
              <X size={16} />
          </button>
        </motion.div>
        </div>
      }
        
      </div>
    </>
  )
}