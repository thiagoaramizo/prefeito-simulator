import { Bank, Briefcase, CalendarBlank, UsersThree, Play } from '@phosphor-icons/react'
import Image from 'next/image'
import { Money } from './Money'
import { Number } from './Number'
import { useContext, useState } from 'react'
import { GameContext } from '@/contexts/GameContext'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { Music } from './Music'

export const Header = () => {

  const { balance, regions, round, nextRound } = useContext(GameContext)
  const population = regions.reduce( (acumulator, region) => acumulator + region.population, 0)
  const companies = regions.reduce( (acumulator, region) => acumulator + region.companies, 0)
  const [isActive, setIsActive] = useState(false)

  const handleNextRound = async () => {
    setIsActive(true)
    const timer = await new Promise((r) => {setTimeout(r, 1300)})
    nextRound()
    setIsActive(false)
  }

  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-header items-center gap-6 lg:gap-2 relative'>
      
      <div className='h-20 flex flex-col items-center justify-center w-fit'>
        <Image src={'/images/logo-2.png'} width={250} height={75} alt="Thiago Aramizo's Sim City" className='saturate-0 transition-all duration-500 w-48 hover:saturate-100 md:w-52 lg:w-56'/>
      </div>

      <div className='bg-cyan-800 bg-gradient-to-b from-cyan-600 to-cyan-900 text-slate-100 w-full flex rounded-2xl shadow-lg items-center justify-between overflow-hidden'>

        <div className='flex'>
          <div className='border-r border-cyan-900 px-6 py-4 h-20'>
            <div className='flex items-center gap-2'>
              <UsersThree size={42}/>
              <div className='flex flex-col items-start gap-0 text-lg font-semibold'>
                <strong className='text-xs'>População</strong>
                <span className='font-extrabold'><Number value={population} /></span>
              </div>
            </div>
          </div>

          <div className='border-r border-cyan-900 px-6 py-4 h-20'>
            <div className='flex items-center gap-2'>
              <Briefcase size={42} />
              <div className='flex flex-col items-start gap-0 text-lg font-semibold'>
                <strong className='text-xs'>Empresas</strong>
                <span className='font-extrabold'><Number value={companies} /></span>
              </div>
            </div>
          </div>

          <div className='border-r border-cyan-900 px-6 py-4 h-20'>
            <div className='flex items-center gap-2'>
              <Bank size={42} />
              <div className='flex flex-col items-start gap-0 text-lg font-semibold'>
                <strong className='text-xs'>Orçamento</strong>
                <span className='font-extrabold'><Money value={balance} /></span>
              </div>
            </div>
          </div>


          <Music />

        </div>

        

        <div className='h-20 flex absolute top-0 right-0 bg-gradient-to-b from-cyan-600 to-cyan-900 rounded-2xl overflow-hidden lg:relative lg:top-0 transition-all duration-500'>
          <div className='px-6 py-4'>
            <div className='flex items-center gap-2'>
              <CalendarBlank size={42} />
              <div className='flex flex-col items-center gap-0 text-lg font-semibold'>
                <strong className='text-xs'>Mês</strong>
                <span className='text-2xl font-black'><Number value={round} /></span>
              </div>
            </div>
          </div>

          <motion.button
            transition={{ type: "spring", stiffness: 400, damping: 10, mass: 1, delay: 0.1 }}
            whileHover={{scale: regions.length <= 0 ? 1 : 1.05}} 
            onClick={handleNextRound}  
            className='bg-red-600 bg-gradient-to-b from-red-600 to-red-500 px-8 font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={regions.length <= 0}
          >
            Próximo mês <Play size={20} weight="fill" />
          </motion.button>
        </div>
        
      </div>


    { isActive && createPortal(
      <div className="
        fixed top-0 left-0
        w-screen
        h-screen
        z-50
        backdrop-blur-xl

        flex
        flex-col
        items-center
        justify-center
      ">
        <motion.div
          className="bg-cyan-800 bg-gradient-to-b from-cyan-600 to-cyan-900 text-slate-100 p-12 block w-11/12 md:w-3/4 lg:w-2/5 rounded-2xl drop-shadow-2xl" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >        

            <CalendarBlank size={100} weight="light" className="mx-auto"/>
            <div className='w-full h-4 rounded-full my-4 bg-slate-500'>
              <motion.div
              className='w-full h-4 rounded-full my-4 bg-red-600'
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              ></motion.div>
            </div>
            <h1 className="text-2xl font-bold text-center">Avançando para o {round+1}º mês</h1>
            
    
        </motion.div>
      </div>, document.body 
    )}

    </div>
  )
}