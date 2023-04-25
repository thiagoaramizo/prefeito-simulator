export const incomeRateByPopulation = 5
export const incomeRateByCompanies = 65
export const minPopulationAffectStatus = 10
export const regionPrice = [1000, 3000, 10000, 30000, 100000, 500000, 1000000] as const
export const increasesByType = {
  residential: {
    population: 0.1,
    companies: 0.05
  },
  commercial: {
    population: 0.05,
    companies: 0.1
  },
  industrial: {
    population: 0,
    companies: 0.15
  },
}