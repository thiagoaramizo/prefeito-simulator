import { ExpenseInRegionType } from "@/types";
import { Icon } from "./Icon";
import { Money } from "./Money";
import { Indicator } from "./Indicator";
import { useState } from "react";
import { motion } from "framer-motion"
import { X } from "@phosphor-icons/react";
import { createPortal } from "react-dom";


interface CityServiceProps extends ExpenseInRegionType {}

export const RegionService = ({ name, desc, value, icon, supply, mensalExpense: budget, quantity }:CityServiceProps) => {
  
  const IconOfService = icon
  const [isActive, setIsActive] = useState(false)

  const handleActive = () => {
    setIsActive(!isActive)
  }

  const buttonClass = isActive ? 'bg-slate-300' : ''

  return(
    <div>
      <button onClick={handleActive} className="relative">
      <Icon name={name} className={buttonClass}>
        <IconOfService size={32} />
      </Icon>
      <div className="bg-cyan-800 absolute -bottom-1 -right-2 text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
        {quantity}
      </div>
      </button>

    { isActive && createPortal(
      <div className="
      fixed top-0 left-0
      w-screen
      h-screen
      z-50
      backdrop-blur-lg

      flex
      flex-col
      items-center
      justify-center
    ">
      <motion.div
        className="bg-cyan-800 bg-gradient-to-b from-cyan-600 to-cyan-900 text-slate-100 px-6 py-4 block w-11/12 md:w-3/4 lg:w-2/4 rounded-xl drop-shadow-2xl shadow-2xl relative divide-y divide-cyan-900" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >        

          <div className="flex items-center gap-4 justify-between">
            <div className="flex gap-4 items-center ">
              <IconOfService size={72} weight="light" className="text-slate-300 flex items-center justify-center"/>
              <div className="flex flex-col gap-0 text-xs">
                <h2 className="font-bold text-lg">{name}</h2>
                <span>Despesas totais: <Money value={budget*quantity}/>/mês</span>
              </div>
            </div>
            <div className="flex flex-col items-center pr-2">
              <strong className="text-3xl font-black">{quantity}</strong>
              <span className="text-sm -mt-1">Unidade{quantity > 1? 's' : ''}</span>
            </div>
            <button onClick={handleActive} className="flex bg-slate-800 rounded-full text-slate-50 items-center justify-center p-1 absolute -top-2 -left-2 hover:bg-slate-700">
              <X size={16} weight="bold"/>
            </button>
          </div>
          
          <div className="grid grid-cols-3 mt-4 pt-2">
            <Indicator name='Saúde' value={supply.health}/>
            <Indicator name='Lazer' value={supply.leisure}/>
            <Indicator name='Educação' value={supply.education}/>
            <Indicator name='Ambiente' value={supply.environment}/>
            <Indicator name='Segurança' value={supply.safety}/>
            <Indicator name='Mobilidade' value={supply.mobility}/>
          </div>

          { desc && <div className="mt-4 pt-4 mb-4">
            <h3 className="font-bold text-sm">Descrição</h3>
            <p className="text-sm pt-2">{desc}</p>
          </div>}
  
      </motion.div>
    </div>, document.body 
    )}
    </div>
  )
}