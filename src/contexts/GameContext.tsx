import { CityType, RegionType } from '@/types'
import { createContext, ReactNode, useReducer } from 'react'
import { nextRoundAction } from './actions/nextRoundAction'
import { addRegionAction } from './actions/addRegionAction'

interface contextProviderProps {
  children: ReactNode
}

interface ActionCityType {
  type: string,
  payload: any
}


export const GameContext = createContext({} as CityType)

export function GameContextProvider({ children }: contextProviderProps) {

  const addRegion = ( typeOfRegion: 'residential' | 'commercial' | 'industrial' ) => {
    dispatch({
      type: 'addRegion',
      payload: {
        typeOfRegion: typeOfRegion
      }
    })
  }

  const editRegion = ( region: RegionType ) => {
    dispatch({
      type: 'editRegion',
      payload: {
        region: region
      }
    })
  }

  const addBalance = ( value: number ) => {
    dispatch({
      type: 'addBalance',
      payload: {
        value: value
      }
    })
  }

  const subtractBalance = ( value: number  ) => {
    dispatch({
      type: 'subtractBalance',
      payload: {
        value: value
      }
    })
  }

  const nextRound = () => {
    dispatch({
      type: 'nextRound',
      payload: {
      }
    })
  }

  const restart = () => {
    dispatch({
      type: 'restart',
      payload: {
      }
    })
  }

  const [cityState, dispatch] = useReducer(
    
    (state: CityType, action: ActionCityType) => {
      
      if (action.type === 'addRegion') {  
        const typeOfRegion =  action.payload.typeOfRegion as 'residential' | 'commercial' | 'industrial'
        const newRegion = addRegionAction( typeOfRegion, state.regions.length )          
        return {
          ...state,
          regions: [ newRegion, ...state.regions ],
        }
      } 

      else if (action.type === 'editRegion') { 
        const editedRegion =  action.payload.region as RegionType
        const regions = [...state.regions]
        //@ts-ignore
        const newRegions =  regions.map<RegionType>( (region) => {
          if (  region.id === editedRegion.id ){
            return editedRegion
          } else {
            return region
          }
        } )
        return {
          ...state,
          regions: newRegions,
        }
      }

      else if (action.type === 'addBalance') { 
        const addValue =  action.payload.value as number
        const oldBalance = state.balance
        //@ts-ignore
        const newBalance = oldBalance + addValue
        return {
          ...state,
          balance: newBalance,
        }
      }

      else if (action.type === 'subtractBalance') { 
        const subtractValue =  action.payload.value as number
        const oldBalance = state.balance
        //@ts-ignore
        const newBalance = oldBalance - subtractValue
        return {
          ...state,
          balance: newBalance,
        }
      }

      else if (action.type === 'nextRound') { 
        return {
          ...nextRoundAction( state )
        }
      }

      else if (action.type === 'restart') { 
        return {
          regions: [],
          balance: 10000,
          round: 1,
          addRegion,
          editRegion,
          addBalance,
          subtractBalance,
          nextRound,
          restart,
        }
      }
      
      else return state
    },

    //Estado padrão inicial
    {
      regions: [],
      balance: 10000,
      round: 1,
      addRegion,
      editRegion,
      addBalance,
      subtractBalance,
      nextRound,
      restart,
    } as CityType
  )

  return (
    <GameContext.Provider value={ { ...cityState } }>
      {children}
    </GameContext.Provider>
  )
}