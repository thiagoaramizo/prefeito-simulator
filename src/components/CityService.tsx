import { ExpenseInRegionType, ExpenseType, IndicatorsType, RegionType } from "@/types";
import { Icon } from "./Icon";
import { Money } from "./Money";
import { Indicator } from "./Indicator";
import { useContext, useState } from "react";
import { motion } from "framer-motion"
import { X } from "@phosphor-icons/react";
import { createPortal } from "react-dom";
import { GameContext } from "@/contexts/GameContext";


interface CityServiceProps extends ExpenseType {
  region?: RegionType
  onFinish?: ()=>void
}

export const CityService = ({ name, desc, category, value, icon, supply, mensalExpense, region, onFinish }:CityServiceProps) => {
  
  const { editRegion, subtractBalance, balance } = useContext(GameContext)
  const IconOfService = icon
  const [isActive, setIsActive] = useState(false)

  const handleActive = () => {
    setIsActive(!isActive)
  }

  const handleAddRegion = () => {
    const editedRegion:RegionType = {...region} as RegionType
    const serviceAlredyExists = editedRegion.expense.findIndex( (expense) => expense.name === name )
    console.log( serviceAlredyExists )
    if ( serviceAlredyExists >= 0 )  {
      editedRegion.expense[serviceAlredyExists].quantity += 1
    } else {
      const cityServiceToAdd:ExpenseInRegionType = {
        quantity: 1,
        name: name,
        desc: desc,
        category: category,
        value: value,
        mensalExpense: mensalExpense,
        supply: supply,
        icon: icon
      }
      editedRegion.expense = [
        ...editedRegion.expense,
        cityServiceToAdd
      ]
    }

    const updateIndicators:IndicatorsType = {
      health: editedRegion.expense.reduce( (acumulator, expense) => acumulator + expense.supply.health*expense.quantity, 0),
      leisure: editedRegion.expense.reduce( (acumulator, expense) => acumulator + expense.supply.leisure*expense.quantity, 0),
      education: editedRegion.expense.reduce( (acumulator, expense) => acumulator + expense.supply.education*expense.quantity, 0),
      safety: editedRegion.expense.reduce( (acumulator, expense) => acumulator + expense.supply.safety*expense.quantity, 0),
      environment: editedRegion.expense.reduce( (acumulator, expense) => acumulator + expense.supply.environment*expense.quantity, 0),
      mobility: editedRegion.expense.reduce( (acumulator, expense) => acumulator + expense.supply.mobility*expense.quantity, 0),
    }
    editedRegion.indicators = updateIndicators
    
    editRegion( editedRegion )
    subtractBalance(value)
    setIsActive(false)
    onFinish && onFinish()
  }

  const buttonClass = isActive ? 'bg-slate-300' : ''

  return(
    <div>
      <button onClick={handleActive}>
      <Icon name={name} className={buttonClass}>
        <IconOfService size={32} />
      </Icon>
      </button>

    { isActive && createPortal(
      <div className="
      fixed inset-0
      w-full
      h-full
      z-50
      backdrop-blur-xl

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
                <span>Valor: <Money value={value}/></span>
                <span>Despesa: <Money value={mensalExpense}/>/mês</span>
              </div>
            </div>
            {region ? <button className="bg-cyan-900
  text-slate-50
  text-xs
  font-bold
  rounded
  p-2
  shadow-sm

  flex flex-col
  items-center
  justify-center

  transition duration-200

  disabled:opacity-50 disabled:cursor-not-allowed

  enabled:hover:bg-cyan-500
  enabled:hover:shadow-md
  enabled:hover:scale-105" onClick={handleAddRegion} disabled={value > balance}>Adicionar na região <span className="text-lg"><Money value={value}/></span></button> : ''}
            <button onClick={handleActive} className="flex bg-cyan-900 shadow-sm rounded-full text-slate-50 items-center justify-center p-1 absolute -top-2 -left-2 hover:bg-slate-700">
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
    </div>, 
    document.body  
    )}
    </div>
  )
}