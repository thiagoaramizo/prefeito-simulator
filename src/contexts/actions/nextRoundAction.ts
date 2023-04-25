import { incomeRateByCompanies, incomeRateByPopulation, increasesByType, minPopulationAffectStatus } from '@/gameData/rates'
import { IndicatorsType } from '@/types'
import {CityType, RegionType} from '@/types'

function calcExpensesOfRegions(regions: RegionType[]) {
  let totalExpanses = 0
  regions.map( (region) => {
    region.expense.map( (service) => {
      totalExpanses = totalExpanses + service.mensalExpense * service.quantity
    })
  })
  console.log(totalExpanses)
  return totalExpanses
}

function calcIncomeOfRegions(regions: RegionType[]) {
  let totalIncomes = 0
  regions.map( (region) => {
    totalIncomes = totalIncomes + region.population*incomeRateByPopulation + region.companies*incomeRateByCompanies
  })
  return totalIncomes
}

function updateRegions(regions: RegionType[]) {
  
  const updateRegions: RegionType[] = regions.map( (region ) => {
      
    const updateRegion = {
        ...region,
        indicators: {...region.indicators},
        demands: {...region.demands},
      } as RegionType

    const calcIncreaseByQuality = () => {
      const demands = updateRegion.demands
      const offers = updateRegion.indicators
      let rate = offers.education - demands.education
      rate += offers.environment - demands.environment
      rate += offers.health - demands.health
      rate += offers.leisure - demands.leisure
      rate += offers.mobility - demands.mobility
      rate += offers.safety - demands.safety
      return rate/((region.population > 0 ? region.population : 10)*0.95)
    }
    const increaseByQuality = calcIncreaseByQuality()
    console.log( increaseByQuality )

    // Updates by type
    if( updateRegion.type === 'residential' ){

      //Update population
      if( updateRegion.population <= 0 ) {
        updateRegion.population = 12
      } else {
        if( increaseByQuality > 0) {
          updateRegion.population = updateRegion.population * (1 + (increasesByType.residential.population + increaseByQuality) )
        } else {
          updateRegion.population = updateRegion.population * (1+increaseByQuality) 
        }
      }

      //Update companies
      if( updateRegion.companies <= 0 ) {
        updateRegion.companies = Math.trunc(updateRegion.population/10)
      } else {
        if( increaseByQuality > 0) {
          updateRegion.companies = updateRegion.companies * (1 + (increasesByType.residential.companies + increaseByQuality) ) 
        }else {
          updateRegion.companies = updateRegion.companies * (1+increaseByQuality)
        }
      }

      //Update demands
      if( updateRegion.population > minPopulationAffectStatus ){
        const updateDemands:IndicatorsType = {
          health: Math.trunc(updateRegion.population * 0.2),
          leisure: Math.trunc(updateRegion.population * 0.3),
          education: Math.trunc(updateRegion.population * 0.2),
          safety: Math.trunc(updateRegion.population * 0.1),
          environment: Math.trunc(updateRegion.population * 0.1),
          mobility: Math.trunc(updateRegion.population * 0.1)
        }
        updateRegion.demands = updateDemands
      }      
    } 
    if( updateRegion.type === 'commercial' ){

      //Update population
      if( updateRegion.population <= 0 ) {
        updateRegion.population = 10
      } else {
        if( increaseByQuality > 0) {
          updateRegion.population = Math.trunc(updateRegion.population * (1 + (increasesByType.commercial.population + increaseByQuality) ) )
        } else {
          updateRegion.population = updateRegion.population * (1+increaseByQuality)
        }
      }

      //Update companies
      if( updateRegion.companies <= 0 ) {
        updateRegion.companies = Math.trunc(updateRegion.population/10)
      } else {
        if( increaseByQuality > 0) {
          updateRegion.companies = Math.trunc(updateRegion.companies * (1 + (increasesByType.commercial.companies + increaseByQuality) ) )
        } else {
          updateRegion.companies = updateRegion.companies * (1+increaseByQuality)
        }
      }

      //Update demands
      if( updateRegion.population > minPopulationAffectStatus ){
        const updateDemands:IndicatorsType = {
          health: Math.trunc(updateRegion.population * 0.1),
          leisure: Math.trunc(updateRegion.population * 0.1),
          education: Math.trunc(updateRegion.population * 0.1),
          safety: Math.trunc(updateRegion.population * 0.3),
          environment: Math.trunc(updateRegion.population * 0.3),
          mobility: Math.trunc(updateRegion.population * 0.3)
        }
        updateRegion.demands = updateDemands
      }      
    }
    if( updateRegion.type === 'industrial' ){

      //Update population
      if( updateRegion.population <= 0 ) {
        updateRegion.population = 10
      } else {
        if( increaseByQuality > 0) {
          updateRegion.population = Math.trunc(updateRegion.population * (1 + (increasesByType.industrial.population + increaseByQuality) ) )
        } else {
          updateRegion.population = updateRegion.population * (1+increaseByQuality)
        }
      }

      //Update companies
      if( updateRegion.companies <= 0 ) {
        updateRegion.companies = Math.trunc(updateRegion.population/10)
      } else {
        if( increaseByQuality > 0) {
          updateRegion.companies = Math.trunc(updateRegion.companies * (1 + (increasesByType.industrial.companies + increaseByQuality) ) )
        } else {
          updateRegion.companies = updateRegion.companies * (1+increaseByQuality)
        }
      }

      //Update demands
      if( updateRegion.population > minPopulationAffectStatus ){
        const updateDemands:IndicatorsType = {
          health: Math.trunc(updateRegion.population * 0.1),
          leisure: Math.trunc(updateRegion.population * 0.1),
          education: Math.trunc(updateRegion.population * 0.1),
          safety: Math.trunc(updateRegion.population * 0.4),
          environment: Math.trunc(updateRegion.population * 0.1),
          mobility: Math.trunc(updateRegion.population * 0.4)
        }
        updateRegion.demands = updateDemands   
      }   
    }
    
    //Check population and companies negative
    updateRegion.population = updateRegion.population < 0 ? 0 : updateRegion.population
    updateRegion.companies = updateRegion.companies < 0 ? 0 : updateRegion.companies
    
    //Check Max companies
    if( updateRegion.companies > updateRegion.population ) { 
      updateRegion.companies = updateRegion.population*0.97
    }

    //General updates
    //Update indicators
    const updateIndicators:IndicatorsType = {
      health: region.expense.reduce( (acumulator, expense) => acumulator + expense.supply.health*expense.quantity, 0),
      leisure: region.expense.reduce( (acumulator, expense) => acumulator + expense.supply.leisure*expense.quantity, 0),
      education: region.expense.reduce( (acumulator, expense) => acumulator + expense.supply.education*expense.quantity, 0),
      safety: region.expense.reduce( (acumulator, expense) => acumulator + expense.supply.safety*expense.quantity, 0),
      environment: region.expense.reduce( (acumulator, expense) => acumulator + expense.supply.environment*expense.quantity, 0),
      mobility: region.expense.reduce( (acumulator, expense) => acumulator + expense.supply.mobility*expense.quantity, 0),
    }
    updateRegion.indicators = updateIndicators
    
    return updateRegion
  })
  
  return updateRegions
}

export function nextRoundAction( city: CityType ){
  const round = city.round + 1
  const balance = city.balance - calcExpensesOfRegions( city.regions ) + calcIncomeOfRegions( city.regions )
  const regions = updateRegions( city.regions )
  

  return {
    ...city,
    regions,
    balance, 
    round
  } as CityType
}