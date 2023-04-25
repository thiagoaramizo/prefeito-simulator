import { RegionType } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export const addRegionAction = ( type: 'residential' | 'commercial' | 'industrial', citySize: number ) => {
  const newRegion: RegionType = {
    id: uuidv4(),
    name: `Bairro ${citySize + 1}`,
    type: type,
    population: 0,
    companies: 0,
    indicators: {
      education: 0,
      environment: 0,
      health: 0,
      leisure: 0,
      safety: 0,
      mobility: 0,
    },
    demands: {
      education: 10,
      environment: 10,
      health: 10,
      leisure: 10,
      safety: 10,
      mobility: 10
    },
    expense: [
    ],
    revenue: []
  }

  return newRegion
}