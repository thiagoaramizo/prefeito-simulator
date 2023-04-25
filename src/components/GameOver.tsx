import { GameContext } from "@/contexts/GameContext"
import { useContext } from "react"
import { Button } from "./Button"
import { ReceiptX } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"

export const GameOver = () =>{
  
  const router = useRouter()
  const { balance, restart } = useContext(GameContext)
  
  const handleRestart = () => {
    router.push('/')
    restart()
  }

  if( balance < -10000 ) {
    return (
      <div className="
        fixed inset-0
        w-full
        h-full
        z-50
        backdrop-blur-sm

        flex
        flex-col
        items-center
        justify-center
      ">
        <motion.div 
          className="
            w-1/3
            min-w-fit
            p-16
            rounded-xl
            drop-shadow-2xl		
            
            bg-slate-900
            text-slate-50

            flex
            flex-col
            gap-4
            text-center
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ReceiptX size={100} weight="light" className="text-slate-500 mx-auto"/>
          <h1 className="text-4xl font-bold">Você faliu!</h1>
          <p>Tente novamente em uma nova partida...</p>
          <Button onClick={handleRestart} className="px-16 mx-auto mt-4">Reiniciar jogo</Button>
        </motion.div>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}