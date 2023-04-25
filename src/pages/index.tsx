import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/Button'
import { Play } from '@phosphor-icons/react'
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter()

  const handlePlay = () => {
    router.push('/play')
  }


  return (
   <>

    <div className='w-full h-full flex flex-col items-center justify-center gap-8'>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <strong className='block text-4xl font-black text-center'>THIAGO ARAMIZO&#39;S</strong>
        <Image src={'/images/logo-2-big.png'} width={800} height={255} alt="Thiago Aramizo's Sim City"  />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <button className='bg-cyan-800 bg-gradient-to-b from-cyan-800  to-cyan-600 font-bold text-slate-50 text-3xl flex gap-2 p-4 px-6 rounded-xl  transition duration-200 hover:shadow-md enabled:hover:scale-105' onClick={handlePlay}>JOGAR<Play size={32} weight="fill"/> </button>
      </motion.div>
    </div>
   

   </>
  )
}
